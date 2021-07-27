/**
 * アンジェラ様で再生可能なアニメーションのリスト。
 * ※ループ再生数は入っていないため、各アニメーションデータ内部で指定可能。
 */
export const angelaAnimationList = {
  // 待機モーション1
  rest1: {
    animePackName: "base",
    animeName: "rest_1",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 待機モーション1
  rest2: {
    animePackName: "base",
    animeName: "rest_2",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 移動モーション
  move: {
    animePackName: "base",
    animeName: "move",
    playSpeed: 1,
    endFrame: 40,
  },
  /**************************************************
   * ここから会話用モーション(口が動くモーション)
   **************************************************/
  // 普通に話す
  normallyTalk: {
    animePackName: "base",
    animeName: "normallyTalk",
    playSpeed: 1,
    endFrame: 40,
  },
  // 普通に話す(こちらを見ながら)
  normallyTalk_LookingHere: {
    animePackName: "base",
    animeName: "normallyTalk_LookingHere",
    playSpeed: 1,
    endFrame: 40,
  },
  // げんなりしながら話す
  bitSmileTalk: {
    animePackName: "base",
    animeName: "bitSmileTalk",
    playSpeed: 1,
    endFrame: 40,
  },
  // げんなりしながら話す
  satiatedTalk: {
    animePackName: "base",
    animeName: "satiatedTalk",
    playSpeed: 1,
    endFrame: 40,
  },
  // ジト目で見つつ話す
  scornTalk: {
    animePackName: "base",
    animeName: "scornTalk",
    playSpeed: 1,
    endFrame: 40,
  },
};
