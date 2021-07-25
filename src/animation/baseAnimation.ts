import * as PIXI from "pixi.js";
import {
  SS6Project,
  SS6Player,
} from "@/lib/ss6player-for-web/ss6player-pixi/dist/ss6player-pixi";
import { AppConfig } from "@/config/appConfig";
import { GetRandomNumber } from "@/utils";
import { AnimationData, AnimationFlow, TalkData } from "./types";

/**
 * アニメーションクラスのベースとなるクラス。
 * 全てのアニメーションクラスは、このクラスを継承する。
 */
export class BaseAnimation {
  /**
   * Pixi.jsアプリケーション。
   */
  public pixiApp: PIXI.Application | null;
  /**
   * アニメーション表示領域のセレクタ(ID)。
   */
  public animationSelectorId: string;
  /**
   * トーク表示領域のセレクタ(ID)。
   */
  public talkSelectorId: string;
  /**
   * SS6プロジェクト。
   */
  public ss6Project: SS6Project;
  /**
   * SS6プレイヤー。
   */
  private ss6Player: SS6Player | null;

  /**
   * ループ再生用の全アニメーションフロー。
   */
  private roopAnimationFlowList: AnimationFlow[];
  /**
   * アニメーションフローのキュー。
   * クリックや会話等の割り込みイベントが発生しない限り、下記配列内のアニメーションセットがループ再生される。
   */
  private animationFlowQueue: AnimationFlow[];
  /**
   * 現在再生中のアニメーションフロー。
   */
  private nowPlayAnimationFlow: AnimationFlow;

  /**
   * コンストラクタ。
   * @param animationSelectorId アニメーション表示領域のセレクタ(ID)。
   * @param talkSelectorId トーク表示領域のセレクタ(ID)。
   * @param ssfbFilePath ssfbファイルパス
   * @param roopAnimationFlowList ループ再生用の全アニメーションフロー。
   */
  constructor(
    animationSelectorId: string,
    talkSelectorId: string,
    ssfbFilePath: string,
    roopAnimationFlowList: AnimationFlow[]
  ) {
    // Pixi.jsアプリケーションの初期化
    this.pixiApp = new PIXI.Application({
      width: AppConfig.animation.widthSize * AppConfig.animation.scale,
      height: AppConfig.animation.heightSize * AppConfig.animation.scale,
      transparent: true,
    });
    // 指定されたセレクターにPixi.jsアプリケーションを入れ込む
    this.animationSelectorId = animationSelectorId;
    document
      .getElementById(this.animationSelectorId)
      ?.appendChild(this.pixiApp.view);
    // トーク表示領域のセレクタ情報を保持
    this.talkSelectorId = talkSelectorId;

    // アニメーションフローキューの初期登録
    this.animationFlowQueue = JSON.parse(JSON.stringify(roopAnimationFlowList));
    // 現在再生中のアニメーションフローをセット
    this.nowPlayAnimationFlow =
      this.animationFlowQueue.shift() as AnimationFlow;
    // とりあえずSS6Playerに初期登録
    this.ss6Player = null;
    // ループ再生用のアニメーションセットを記憶
    this.roopAnimationFlowList = roopAnimationFlowList;

    // セットアップ完了後は、初期処理を流す
    const onComplete = () => {
      this.init();
    };
    // SS6Project生成
    this.ss6Project = new SS6Project(ssfbFilePath, onComplete);
  }

  /**
   * データ構築後の、アニメーションフロー再生の初期処理。
   */
  private init() {
    // 現在再生中のアニメーションフローから情報取得
    const playAnimeSet = this.nowPlayAnimationFlow.data.shift();

    // SS6プレイヤーの初期生成を行う
    this.initSs6Player(playAnimeSet?.animation as AnimationData);
    // 会話内容の表示
    this.talkSetup(playAnimeSet?.talk);

    // アニメーション再生開始
    this.ss6Player?.Play();
  }

  /**
   * 初回のアニメーションデータ再生後の処理。
   */
  private playNextAnimationSet() {
    // 現在再生中のアニメーションフローから情報取得
    const playAnimeSet = this.nowPlayAnimationFlow.data.shift();

    // アニメーションセットがない=アニメーションフロー内の全ての内容を再生し終わった:
    if (!playAnimeSet) {
      // 一旦現在再生されているアニメーションを停止
      this.ss6Player?.Stop();
      // 新たにアニメーションフローキューに次のアニメーションフローを登録
      // ※ランダムで生成されたインデックス番号のアニメーションフローがキューに入る
      const pushIndex = GetRandomNumber(0, this.roopAnimationFlowList.length);
      this.animationFlowQueue.push(
        JSON.parse(JSON.stringify(this.roopAnimationFlowList[pushIndex]))
      );

      // 現在再生中のアニメーションフローを次のものに変更
      this.nowPlayAnimationFlow =
        this.animationFlowQueue.shift() as AnimationFlow;
      // 次の処理へ;
      this.playNextAnimationSet();
      // 処理を終了
      return;
    }

    // アニメーション再生を変更
    this.playSs6Player(playAnimeSet?.animation as AnimationData);
    // 会話内容の表示
    this.talkSetup(playAnimeSet?.talk as TalkData);

    // アニメーション再生開始
    this.ss6Player?.Play();
  }

  /**
   * SS6プレイヤーの初期生成を行い、アニメーションを再生する。
   * @param animeData 再生するアニメーションデータ。
   */
  private initSs6Player(animeData: AnimationData) {
    // SS6Playerを生成
    this.ss6Player = new SS6Player(
      this.ss6Project,
      animeData.animePackName,
      animeData.animeName
    );
    // アニメーション表示位置を指定
    this.ss6Player.position = new PIXI.ObservablePoint(
      () => {
        return {};
      },
      1,
      // 画面端より少し左側に配置
      (AppConfig.animation.widthSize * AppConfig.animation.scale) / 2,
      // 最下部に合わせる形で配置(画面高さ - そのキャラの幅/2)
      (AppConfig.animation.heightSize * AppConfig.animation.scale) / 2
    );
    // アニメーションを縮小
    this.ss6Player.scale = new PIXI.ObservablePoint(
      () => {
        return {};
      },
      1,
      AppConfig.animation.scale,
      AppConfig.animation.scale
    );
    // Pixi.jsアプリケーションに登録
    this.pixiApp?.stage.addChild(this.ss6Player);

    // 再生時のフレームレート設定
    this.ss6Player.SetAnimationFramerate(AppConfig.animation.flameRate, true);
    // 再生速度(SS設定値への乗率、負設定で逆再生)とフレームスキップの可否(初期値はfalse)を設定
    // フレームスキップ： trueで処理落ちでフレームスキップ、falseで処理落ちでもフレームスキップしない
    this.ss6Player.SetAnimationSpeed(animeData.playSpeed, true);
    // 始点フレーム番号、終点フレーム番号、ループ回数（0以下で無限ループ）
    // 同時に初期フレームを始点（再生速度がマイナスの場合は終点）フレーム番号に設定
    this.ss6Player.SetAnimationSection(0, animeData.endFrame, 1);

    // アニメーション再生終了後にコールバック
    this.ss6Player.SetPlayEndCallback(() => {
      this.playNextAnimationSet();
    });
  }

  /**
   * アニメーションを再生する。
   * ※SS6Playerの初期構築が行われた後に、アニメーション内容を変更したい際に本処理を用いる。
   * @param animeData 再生するアニメーションデータ。
   */
  private playSs6Player(animeData: AnimationData): void {
    // 再生するアニメーションを変更
    this.ss6Player?.Setup(
      animeData.animePackName as string,
      animeData.animeName as string
    );

    // 再生速度(SS設定値への乗率、負設定で逆再生)とフレームスキップの可否(初期値はfalse)を設定
    // フレームスキップ： trueで処理落ちでフレームスキップ、falseで処理落ちでもフレームスキップしない
    this.ss6Player?.SetAnimationSpeed(animeData.playSpeed, true);
    // 始点フレーム番号、終点フレーム番号、ループ回数（0以下で無限ループ）
    // 同時に初期フレームを始点（再生速度がマイナスの場合は終点）フレーム番号に設定
    this.ss6Player?.SetAnimationSection(0, animeData.endFrame, 1);

    // アニメーション再生終了後にコールバック
    this.ss6Player?.SetPlayEndCallback(() => {
      this.playNextAnimationSet();
    });
  }

  /**
   * トーク内容の表示を行う。
   * @param talkData 表示するトークデータ。
   */
  private talkSetup(talkData: TalkData | undefined) {
    const talkElement = document.getElementById(this.talkSelectorId);
    // もしトーク内容の表示領域がなければ何もしない
    if (!talkElement) return;
    // トークデータが空ならトーク表示領域を非表示にして処理終了
    if (!talkData) {
      talkElement.style.opacity = "0";
      return;
    }

    // 会話領域を表示
    talkElement.style.opacity = "0.5";
    // 会話内容を入れ込む
    talkElement.innerText = talkData.contents;
  }

  /**
   * 割り込みで指定されたアニメーションを再生する。
   * 指定されたアニメーション再生終了後は、アニメーションキューに登録されているアニメーションを再生する。
   * @param playAnimeData: アニメーションデータ。
   */
  // public interruptPlayAnimation(playAnimeData: AnimationSet): void {
  //   // 一旦現在再生されているアニメーションを停止
  //   this.ss6Player?.Stop();

  //   // 再生するアニメーションを変更
  //   this.ss6Player?.Setup(playAnimeData.animePackName, playAnimeData.animeName);

  //   // 再生速度(SS設定値への乗率、負設定で逆再生)とフレームスキップの可否(初期値はfalse)を設定
  //   // フレームスキップ： trueで処理落ちでフレームスキップ、falseで処理落ちでもフレームスキップしない
  //   this.ss6Player?.SetAnimationSpeed(playAnimeData.playSpeed, true);
  //   // 始点フレーム番号、終点フレーム番号、ループ回数（0以下で無限ループ）
  //   // 同時に初期フレームを始点（再生速度がマイナスの場合は終点）フレーム番号に設定
  //   this.ss6Player?.SetAnimationSection(0, playAnimeData.endFrame, 1);

  //   // アニメーション再生終了後にコールバック
  //   this.ss6Player?.SetPlayEndCallback(() => {
  //     this.playNextQueueAnimation();
  //   });

  //   // 再生開始
  //   this.ss6Player?.Play();
  // }

  /**
   * Pixi.jsアプリケーションを解放(消去)する。
   */
  public animationDestroy(): void {
    // Pixi.jsアプリケーションが存在すれば、destroy
    if (this.pixiApp) {
      this.pixiApp.destroy();
    }
    this.pixiApp = null;

    // Pixi.jsアプリケーション表示用のElementも削除
    const target = document.getElementById(this.animationSelectorId);
    while (target?.firstChild) {
      target.removeChild(target.firstChild);
    }
  }
}