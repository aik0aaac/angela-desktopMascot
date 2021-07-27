import { AnimationFlow } from "@/animation/types";
import { angelaAnimationList } from "./animationList";

/**
 * アンジェラ様のループ再生用の全アニメーションフロー。
 */
export const angelaRoopAnimationList: AnimationFlow[] = [
  {
    data: [
      {
        animation: {
          ...angelaAnimationList.rest1,
          roopCount: 3,
        },
      },
    ],
  },
  {
    data: [
      {
        animation: {
          ...angelaAnimationList.rest2,
          roopCount: 2,
        },
      },
    ],
  },
  {
    data: [
      {
        animation: {
          ...angelaAnimationList.move,
          roopCount: 5,
        },
      },
    ],
  },
];
