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
   */
  constructor(animationSelectorId: string, talkSelectorId: string) {
    super(
      animationSelectorId,
      talkSelectorId,
      "/animation/angela/angela.ssfb",
      angelaRoopAnimationList
    );
  }
}
