import * as PIXI from "pixi.js";
import {
  SS6Project,
  SS6Player,
} from "@/lib/ss6player-for-web/ss6player-pixi/dist/ss6player-pixi";
import { AppConfig } from "@/config/appConfig";

let app: PIXI.Application;

export function animationPlay(): void {
  // Initialize PIXI Application
  // （通常のPIXI.jsアプリケーションの初期化手順）
  app = new PIXI.Application({
    width: AppConfig.windowScreenWidth,
    height: AppConfig.windowScreenHeight,
    backgroundColor: 0x606060,
    // transparent: true,
  });
  document.body.appendChild(app.view);

  // Initialize SS6 Project (json file path)
  // ssbpをコンバートしたjsonファイルを指定
  const ssfbFile = "/animation/SampleProject/SampleProject.ssfb";

  const onComplete = function () {
    playAnimation();
  };
  const mySS6Project = new SS6Project(ssfbFile, onComplete);

  const playAnimation = function () {
    const mySS6Player = new SS6Player(mySS6Project, "Sample", "anime_1");
    // mySS6Player.Setup();

    // mySS6Player.position = new PIXI.Point(320, 480);
    // mySS6Player.scale = new PIXI.Point(0.5, 0.5);
    app.stage.addChild(mySS6Player);

    // [任意]ユーザーデータコールバック
    // ※Play前に設定しないと開始フレームのデータが漏れるので注意
    mySS6Player.SetUserDataCalback(function () {
      console.log("ユーザーデータコールバック");
    });

    // [任意]再生速度(SS設定値への乗率、負設定で逆再生)とフレームスキップの可否(初期値はfalse)を設定
    // フレームスキップ：trueで処理落ちでフレームスキップ、falseで処理落ちでもフレームスキップしない
    mySS6Player.SetAnimationSpeed(-1, true);

    // [任意]始点フレーム番号、終点フレーム番号、ループ回数（0以下で無限ループ）
    // 同時に初期フレームを始点（再生速度がマイナスの場合は終点）フレーム番号に設定
    mySS6Player.SetAnimationSection(0, 10, -1);

    // 再生開始
    mySS6Player.Play();
  };
}
