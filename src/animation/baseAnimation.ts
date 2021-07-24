import * as PIXI from "pixi.js";
import {
  SS6Project,
  SS6Player,
} from "@/lib/ss6player-for-web/ss6player-pixi/dist/ss6player-pixi";
import { AppConfig } from "@/config/appConfig";
import { GetRandomNumber } from "@/utils";

/**
 * 再生するアニメーション情報のinterface。
 * アニメーションを再生する際に必要な情報が詰まっている。
 */
export interface PlayAnimationData {
  /**
   * アニメーションパッケージ(.ssaeファイル)名。
   */
  animePackName: string;
  /**
   * アニメーション名。
   */
  animeName: string;
  /**
   * そのアニメーションの再生倍率。
   */
  playSpeed: number;
  /**
   * そのアニメーションの終点フレーム。
   */
  endFrame: number;
}

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
   * Pixi.jsアプリケーション表示領域のセレクタ(ID)。
   */
  public selectorId: string;
  /**
   * SS6プロジェクト。
   */
  public ss6Project: SS6Project;
  /**
   * SS6プレイヤー。
   */
  private ss6Player: SS6Player | null;
  /**
   * アニメーションデータのキュー。
   * クリックや会話等の割り込みイベントが発生しない限り、下記配列内のアニメーションがループ再生される。
   */
  private animationQueue: PlayAnimationData[];
  /**
   * ループ再生用の全アニメーションデータ。
   */
  private roopAnimationDataList: PlayAnimationData[];

  /**
   * コンストラクタ。
   * @param selectorId アニメーション表示領域のセレクタ(ID)。
   * @param ssfbFilePath ssfbファイルパス
   * @param roopAnimationDataList ループ再生用の全アニメーションデータ。
   */
  constructor(
    selectorId: string,
    ssfbFilePath: string,
    roopAnimationDataList: PlayAnimationData[]
  ) {
    // Pixi.jsアプリケーションの初期化
    this.pixiApp = new PIXI.Application({
      width: AppConfig.windowScreenWidth,
      height: AppConfig.windowScreenHeight,
      transparent: true,
    });
    // 指定されたセレクターにPixi.jsアプリケーションを登録
    this.selectorId = selectorId;
    document.getElementById(this.selectorId)?.appendChild(this.pixiApp.view);

    // アニメーションキューの初期登録
    this.animationQueue = [...roopAnimationDataList];
    // とりあえずSS6Playerに初期登録
    this.ss6Player = null;
    // ループ再生用のアニメーションデータを記憶
    this.roopAnimationDataList = roopAnimationDataList;

    // セットアップ完了後は、初期アニメーションを流す
    const onComplete = () => {
      this.initSs6Player();
    };
    // SS6Project生成
    this.ss6Project = new SS6Project(ssfbFilePath, onComplete);
  }

  /**
   * SS6プレイヤーの初期生成を行い、アニメーションを再生する。
   */
  private initSs6Player() {
    // アニメーションキューから情報取得
    const playAnimeData = this.animationQueue.shift();
    // SS6Playerを生成
    this.ss6Player = new SS6Player(
      this.ss6Project,
      playAnimeData?.animePackName,
      playAnimeData?.animeName
    );
    // アニメーション表示位置を指定
    this.ss6Player.position = new PIXI.ObservablePoint(
      () => {
        return {};
      },
      1,
      // 画面端より少し左側に配置
      AppConfig.windowScreenWidth -
        (AppConfig.animation.widthSize * AppConfig.animation.scale) / 3,
      // 最下部に合わせる形で配置(画面高さ - そのキャラの幅/2)
      AppConfig.windowScreenHeight -
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
    this.ss6Player.SetAnimationSpeed(playAnimeData?.playSpeed as number, true);
    // 始点フレーム番号、終点フレーム番号、ループ回数（0以下で無限ループ）
    // 同時に初期フレームを始点（再生速度がマイナスの場合は終点）フレーム番号に設定
    this.ss6Player.SetAnimationSection(0, playAnimeData?.endFrame, 1);

    // アニメーション再生終了後にコールバック
    this.ss6Player.SetPlayEndCallback(() => {
      this.playNextQueueAnimation();
    });

    // 再生開始
    this.ss6Player.Play();
  }

  /**
   * アニメーションキューに格納されている次のアニメーションを再生する。
   */
  private playNextQueueAnimation(): void {
    // アニメーションキューから情報取得
    const playAnimeData = this.animationQueue.shift();
    // 再生するアニメーションを変更
    this.ss6Player?.Setup(
      playAnimeData?.animePackName as string,
      playAnimeData?.animeName as string
    );

    // 取得した分、アニメーションキューに次のアニメーションデータを登録
    // ※ランダムで生成されたインデックス番号のアニメーションデータがキューに入る
    const pushIndex = GetRandomNumber(0, this.roopAnimationDataList.length);
    this.animationQueue.push(this.roopAnimationDataList[pushIndex]);

    // 再生速度(SS設定値への乗率、負設定で逆再生)とフレームスキップの可否(初期値はfalse)を設定
    // フレームスキップ： trueで処理落ちでフレームスキップ、falseで処理落ちでもフレームスキップしない
    this.ss6Player?.SetAnimationSpeed(playAnimeData?.playSpeed as number, true);
    // 始点フレーム番号、終点フレーム番号、ループ回数（0以下で無限ループ）
    // 同時に初期フレームを始点（再生速度がマイナスの場合は終点）フレーム番号に設定
    this.ss6Player?.SetAnimationSection(0, playAnimeData?.endFrame, 1);

    // アニメーション再生終了後にコールバック
    this.ss6Player?.SetPlayEndCallback(() => {
      this.playNextQueueAnimation();
    });

    // 再生開始
    this.ss6Player?.Play();
  }

  /**
   * 割り込みで指定されたアニメーションを再生する。
   * 指定されたアニメーション再生終了後は、アニメーションキューに登録されているアニメーションを再生する。
   * @param playAnimeData: アニメーションデータ。
   */
  public interruptPlayAnimation(playAnimeData: PlayAnimationData): void {
    // 一旦現在再生されているアニメーションを停止
    this.ss6Player?.Stop();

    // 再生するアニメーションを変更
    this.ss6Player?.Setup(playAnimeData.animePackName, playAnimeData.animeName);

    // 再生速度(SS設定値への乗率、負設定で逆再生)とフレームスキップの可否(初期値はfalse)を設定
    // フレームスキップ： trueで処理落ちでフレームスキップ、falseで処理落ちでもフレームスキップしない
    this.ss6Player?.SetAnimationSpeed(playAnimeData.playSpeed, true);
    // 始点フレーム番号、終点フレーム番号、ループ回数（0以下で無限ループ）
    // 同時に初期フレームを始点（再生速度がマイナスの場合は終点）フレーム番号に設定
    this.ss6Player?.SetAnimationSection(0, playAnimeData.endFrame, 1);

    // アニメーション再生終了後にコールバック
    this.ss6Player?.SetPlayEndCallback(() => {
      this.playNextQueueAnimation();
    });

    // 再生開始
    this.ss6Player?.Play();
  }

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
    const target = document.getElementById(this.selectorId);
    while (target?.firstChild) {
      target.removeChild(target.firstChild);
    }
  }
}
