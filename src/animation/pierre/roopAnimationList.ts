import { AnimationFlow } from "@/animation/types";
import { pierreAnimationList } from "./animationList";

/**
 * ループ再生用の全アニメーションフロー。
 */
export const pierreRoopAnimationList: AnimationFlow[] = [
  {
    data: [
      {
        animation: {
          ...pierreAnimationList.rest1,
          roopCount: 3,
        },
      },
    ],
  },
  {
    data: [
      {
        animation: {
          ...pierreAnimationList.rest2_eyeclose_start,
          roopCount: 1,
        },
      },
      {
        animation: {
          ...pierreAnimationList.rest2_eyeclose_between,
          roopCount: 5,
        },
      },
      {
        animation: {
          ...pierreAnimationList.rest2_eyeclose_end,
          roopCount: 1,
        },
      },
    ],
  },
];
