import { BaseAnimation } from "./baseAnimation";
import { AnimationFlow } from "./types";

/**
 * アンジェラ様で再生可能なアニメーションのリスト。
 * ※ループ再生数は入っていないため、各アニメーションデータ内部で指定可能。
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
        animation: {
          ...angelaPlayAnimeDataList.rest1,
          roopCount: 3,
        },
      },
    ],
  },
  {
    data: [
      {
        animation: {
          ...angelaPlayAnimeDataList.rest2,
          roopCount: 2,
        },
      },
    ],
  },
  {
    data: [
      {
        animation: {
          ...angelaPlayAnimeDataList.move,
          roopCount: 5,
        },
      },
    ],
  },
];

export const angelaTalkData = {
  // ネズミ
  rats: {
    data: [
      {
        animation: {
          ...angelaPlayAnimeDataList.move,
          roopCount: 5,
        },
        talk: {
          contents:
            "「ネズミ」ね…程度の低い連中というのは振る舞いを見ても分かったわ。",
        },
      },
    ],
  },
};

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
