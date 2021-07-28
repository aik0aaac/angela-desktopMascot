import { BaseAnimation } from "../baseAnimation";
import { angelaRoopAnimationList } from "./roopAnimationList";

/**
 * アンジェラ様のアニメーションクラス。
 */
export class AngelaAnimation extends BaseAnimation {
  /**
   * コンストラクタ。
   * @param animationSelectorId アニメーション表示領域のセレクタ(ID)。
   * @param talkSelectorId トーク表示領域のセレクタ(ID)。
   * @param talkTopicSelectorId トーク見出し領域のセレクタ(ID)。
   */
  constructor(
    animationSelectorId: string,
    talkSelectorId: string,
    talkTopicSelectorId: string
  ) {
    super(
      animationSelectorId,
      talkSelectorId,
      talkTopicSelectorId,
      "/animation/angela/angela.ssfb",
      angelaRoopAnimationList
    );
  }
}
