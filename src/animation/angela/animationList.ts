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
    animePackName: "talk",
    animeName: "normallyTalk",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 普通に話す(こちらを見ながら)
  normallyTalk_LookingHere: {
    animePackName: "talk",
    animeName: "normallyTalk_LookingHere",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 微笑みながら話す
  bitSmileTalk: {
    animePackName: "talk",
    animeName: "bitSmileTalk",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // げんなりしながら話す
  satiatedTalk: {
    animePackName: "talk",
    animeName: "satiatedTalk",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 意外そうにしながら話す
  surprisingTalk: {
    animePackName: "talk",
    animeName: "surprisingTalk",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // ぼんやりした顔で話す
  vagueTalk: {
    animePackName: "talk",
    animeName: "vagueTalk",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 決意を抱いた顔で話す
  determinatingTalk: {
    animePackName: "talk",
    animeName: "determinatingTalk",
    playSpeed: 0.6,
    endFrame: 40,
  },
};
