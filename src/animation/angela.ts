import * as PIXI from "pixi.js";
import {
  SS6Project,
  SS6Player,
} from "@/lib/ss6player-for-web/ss6player-pixi/dist/ss6player-pixi";
import { AppConfig } from "@/config/appConfig";
import { BaseAnimation, PlayAnimationData } from "./baseAnimation";

/**
 * アンジェラ様で再生可能なアニメーションのリスト。
 */
export const angelaPlayAnimeDataList = {
  rest1: {
    animePackName: "base",
    animeName: "rest_1",
    playSpeed: 0.6,
    endFrame: 40,
  },
  rest2: {
    animePackName: "base",
    animeName: "rest_2",
    playSpeed: 0.6,
    endFrame: 40,
  },
  move: {
    animePackName: "base",
    animeName: "move",
    playSpeed: 1,
    endFrame: 40,
  },
};

/**
 * アンジェラ様のアニメーションクラス。
 */
export class AngelaAnimation extends BaseAnimation {
  /**
   * コンストラクタ。
   * @param selectorId アニメーション表示領域のセレクタ(ID)。
   */
  constructor(selectorId: string) {
    super(
      selectorId,
      "/animation/angela/angela.ssfb",
      angelaPlayAnimeDataList.rest1
    );
  }
}
