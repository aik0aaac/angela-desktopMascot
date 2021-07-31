/**
 * 再生可能なアニメーションのリスト。
 * ※ループ再生数は入っていないため、各アニメーションデータ内部で指定可能。
 */
export const pierreAnimationList = {
  // 待機モーション1
  rest1: {
    animePackName: "pierre",
    animeName: "rest1",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 待機モーション2@目閉じStart
  rest2_eyeclose_start: {
    animePackName: "pierre",
    animeName: "rest2_eyeclose_start",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 待機モーション2@目閉じ途中
  rest2_eyeclose_between: {
    animePackName: "pierre",
    animeName: "rest2_eyeclose_start",
    playSpeed: 1,
    endFrame: 40,
  },
  // 待機モーション2@目閉じEnd
  rest2_eyeclose_end: {
    animePackName: "pierre",
    animeName: "rest2_eyeclose_start",
    playSpeed: 0.6,
    endFrame: 40,
  },
  /**************************************************
   * ここから会話用モーション(口が動くモーション)
   **************************************************/ // 普通に話す
  normallyTalk: {
    animePackName: "pierre",
    animeName: "normallyTalk",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 目を閉じながら普通に話す
  normallyTalkWithCloseEyes: {
    animePackName: "pierre",
    animeName: "normallyTalkWithCloseEyes",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 最高に笑いながら話す
  mostlySmileTalk: {
    animePackName: "pierre",
    animeName: "mostlySmileTalk",
    playSpeed: 0.6,
    endFrame: 40,
  },
  // 驚きながら話す
  surprisingTalk: {
    animePackName: "pierre",
    animeName: "surprisingTalk",
    playSpeed: 0.6,
    endFrame: 40,
  },
};
