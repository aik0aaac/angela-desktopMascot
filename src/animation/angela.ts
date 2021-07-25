import { BaseAnimation } from "./baseAnimation";
import { AnimationFlow } from "./types";

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
 * アンジェラ様のループ再生用の全アニメーションフロー
 */
export const angelaRoopAnimationFlowList: AnimationFlow[] = [
  {
    data: [
      {
        animation: angelaPlayAnimeDataList.rest1,
        talk: {
          contents: "どうしたの?",
        },
      },
    ],
  },
  {
    data: [
      {
        animation: angelaPlayAnimeDataList.rest2,
      },
    ],
  },
  {
    data: [
      {
        animation: angelaPlayAnimeDataList.move,
      },
    ],
  },
];

/**
 * アンジェラ様のアニメーションクラス。
 */
export class AngelaAnimation extends BaseAnimation {
  /**
   * コンストラクタ。
   * @param animationSelectorId アニメーション表示領域のセレクタ(ID)。
   * @param talkSelectorId トーク表示領域のセレクタ(ID)。
   */
  constructor(animationSelectorId: string, talkSelectorId: string) {
    super(
      animationSelectorId,
      talkSelectorId,
      "/animation/angela/angela.ssfb",
      angelaRoopAnimationFlowList
    );
  }
}
