/**
 * データ構造の説明:
 * - AnimationFlow: 再生するアニメーションフロー
 * - AnimationSet: 再生するアニメーションセット
 * - AnimationData: 再生するアニメーションデータ
 * - TalkData: 再生するトークデータ
 *
 * 例: とある会話データだと…。
 * ```
 * AnimationFlow = {
 *   data: [
 *    {
 *      animation: {
 *        animePackName: "talk",
 *        animeName: "default",
 *        playSpeed: 0.6,
 *        endFlame: 40,
 *        roopCount: 2, // 存在しなければ1回ループするのみ
 *      },
 *      talk: {
 *        topic: "話題にする事柄が入ります。(例: 街灯事務所)"
 *        contents: "初回の会話内容が入ります。"
 *      }
 *    },
 *    {
 *      animation: {
 *        animePackName: "talk",
 *        animeName: "sad",
 *        playSpeed: 0.6,
 *        endFlame: 40,
 *      },
 *      talk: {
 *        contents: "二回目の会話内容が入ります。"
 *      }
 *    }
 *   ]
 * }
 * ```
 */

/**
 * 再生するアニメーションフローのinterface。
 */
export interface AnimationFlow {
  data: AnimationSet[];
}

/**
 * 再生するアニメーションセットのinterface。
 * アニメーションを再生する際に必要な情報が詰まっている。
 */
export interface AnimationSet {
  /**
   * アニメーションデータ。
   */
  animation: AnimationData;
  /**
   * トークデータ。
   * 何もない時はトーク内容は表示されない。
   */
  talk?: TalkData;
}

/**
 * アニメーションデータ。
 */
export interface AnimationData {
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
  /**
   * そのアニメーションのループ回数。
   * 指定されなければ1回のみ再生される。
   */
  roopCount?: number;
}

/**
 * トーク情報。
 */
export interface TalkData {
  /**
   * 話題にする事柄。
   */
  topic: string;
  /**
   * トーク内容。
   */
  contents: string;
}
