import * as PIXI from "pixi.js";
import {
  SS6Project,
  SS6Player,
} from "@/lib/ss6player-for-web/ss6player-pixi/dist/ss6player-pixi";
import { AppConfig } from "@/config/appConfig";

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
   * コンストラクタ。
   * @param selectorId アニメーション表示領域のセレクタ(ID)。
   * @param ssfbFilePath ssfbファイルパス
   * @param PlayAnimationData 初期表示時に流すアニメーションデータ。
   */
  constructor(
    selectorId: string,
    ssfbFilePath: string,
    initPlayAnimeData: PlayAnimationData
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

    // セットアップ完了後は、初期アニメーションを流す
    const onComplete = () => {
      this.playAnimation(initPlayAnimeData);
    };
    // SS6Project生成
    this.ss6Project = new SS6Project(ssfbFilePath, onComplete);
  }

  /**
   * アニメーションを再生する。
   * @param playAnimeData: アニメーションデータ。
   */
  public playAnimation(playAnimeData: PlayAnimationData): void {
    // SS6Playerを生成
    const mySS6Player = new SS6Player(
      this.ss6Project,
      playAnimeData.animePackName,
      playAnimeData.animeName
    );
    // アニメーション表示位置を指定
    mySS6Player.position = new PIXI.ObservablePoint(
      () => {
        return {};
      },
      1,
      AppConfig.windowScreenWidth / 2,
      AppConfig.windowScreenHeight / 2
    );
    // アニメーションを縮小
    mySS6Player.scale = new PIXI.ObservablePoint(
      () => {
        return {};
      },
      1,
      0.4,
      0.4
    );
    this.pixiApp?.stage.removeChildren();
    this.pixiApp?.stage.addChild(mySS6Player);

    // ユーザーデータコールバック
    // ※Play前に設定しないと開始フレームのデータが漏れるので注意
    mySS6Player.SetUserDataCalback(function () {
      // console.log("ユーザーデータコールバック");
    });

    // 再生速度(SS設定値への乗率、負設定で逆再生)とフレームスキップの可否(初期値はfalse)を設定
    // フレームスキップ： trueで処理落ちでフレームスキップ、falseで処理落ちでもフレームスキップしない
    mySS6Player.SetAnimationSpeed(playAnimeData.playSpeed, true);

    // 始点フレーム番号、終点フレーム番号、ループ回数（0以下で無限ループ）
    // 同時に初期フレームを始点（再生速度がマイナスの場合は終点）フレーム番号に設定
    mySS6Player.SetAnimationSection(0, playAnimeData.endFrame, -1);

    // 再生開始
    mySS6Player.Play();
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
