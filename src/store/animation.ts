import { InjectionKey, reactive } from "vue";
import { AngelaAnimation } from "@/animation/angela";
import { angelaTalkData } from "@/animation/angela/talkData";
import {
  chapterDefinitionList,
  chapterType,
  defaultChapter,
} from "@/definition/chapter";
import { GetRandomNumber } from "@/utils";

interface IAnimationState {
  /**
   * アニメーション再生インスタンス。
   * 初期値はNull。
   */
  instance: AngelaAnimation | null;
  /**
   * 現在のストーリー進行度。
   */
  chapter: chapterType;
}

interface IUseAnimation {
  /**
   * アニメーション再生インスタンスの初期化処理を行う。
   */
  init: () => void;
  /**
   * アニメーション再生インスタンスの削除処理を行う。
   */
  destroy: () => void;
  /**
   * 会話ボタンクリック時の処理。
   */
  talk: () => void;
  /**
   * 現在のストーリー進行度を取得。
   */
  getChapter: () => chapterType;
  /**
   * 現在のストーリー進行度を変更。
   */
  changeChapter: (chapter: chapterType) => void;
}

/**
 * アニメーション再生インスタンスの状態管理を行う。
 */
export const useAnimationStore = (): IUseAnimation => {
  // 状態
  const state = reactive<IAnimationState>({
    instance: null,
    chapter: defaultChapter,
  });

  // アニメーション再生インスタンスの初期化処理を行う。
  const init = () => {
    state.instance = new AngelaAnimation("animation-area", "talk-area");
  };
  // アニメーション再生インスタンスの削除処理を行う。
  const destroy = () => {
    state.instance?.animationDestroy();
  };

  // 会話ボタンクリック時の処理。
  const talk = () => {
    // 現在再生されているアニメーションフローを変更
    // 現在のストーリー進行度の中から、ランダムな会話が選定される
    switch (state.chapter) {
      case chapterDefinitionList[0]: {
        const index = GetRandomNumber(0, angelaTalkData.canard.length);
        state.instance?.interruptPlayAnimation(angelaTalkData.canard[index]);
        break;
      }
      case chapterDefinitionList[1]: {
        const index = GetRandomNumber(0, angelaTalkData.urbanMyth.length);
        state.instance?.interruptPlayAnimation(angelaTalkData.urbanMyth[index]);
        break;
      }
      default: {
        break;
      }
    }
  };

  // 現在のストーリー進行度を取得。
  const getChapter = (): chapterType => {
    return state.chapter;
  };
  // 現在のストーリー進行度を変更。
  const changeChapter = (chapter: chapterType) => {
    state.chapter = chapter;
  };

  return {
    init,
    destroy,
    talk,
    getChapter,
    changeChapter,
  };
};

// ステートの型を登録し、外部でもIUseAnimationを参照し、型を効かせる
export type AnimationStore = ReturnType<typeof useAnimationStore>;
// provideに登録させるinjectキーを固定化
// グローバルStoreなので、injectキーは固定化させる
export const AnimationStoreKey: InjectionKey<AnimationStore> =
  Symbol("AnimationStore");
