import { angelaAnimationList } from "./animationList";

export const angelaTalkData = {
  // あらぬ噂
  canard: [
    // ネズミ
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.normallyTalk_LookingHere,
            roopCount: 5,
          },
          talk: {
            contents:
              "「ネズミ」ね…程度の低い連中というのは振る舞いを見ても分かったわ。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.normallyTalk,
            roopCount: 5,
          },
          talk: {
            contents: "都市には私の知らない世界が広がっているのね。",
          },
        },
      ],
    },
    // ユン事務所
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.bitSmileTalk,
            roopCount: 5,
          },
          talk: {
            contents: "結構大きな規模で来たけど、問題なかったわね。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.satiatedTalk,
            roopCount: 5,
          },
          talk: {
            contents:
              "それにしても、フィクサーの種類と数って、本当に多いのね。",
          },
        },
      ],
    },
    // 鉄の兄弟
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.move,
            roopCount: 5,
          },
          talk: {
            contents: "鉄の兄弟",
          },
        },
      ],
    },
    // 釣事務所
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.move,
            roopCount: 5,
          },
          talk: {
            contents: "釣事務所",
          },
        },
      ],
    },
    // その他1
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.scornTalk,
            roopCount: 5,
          },
          talk: {
            contents: "用がないなら帰ってもいいかしら。",
          },
        },
      ],
    },
  ],
  // 都市怪談
  urbanMyth: [
    // ピエールのミートパイ
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.move,
            roopCount: 5,
          },
          talk: {
            contents: "ピエールのミートパイ",
          },
        },
      ],
    },
    // 街灯事務所
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.move,
            roopCount: 5,
          },
          talk: {
            contents: "街灯事務所",
          },
        },
      ],
    },
    // その他1
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.move,
            roopCount: 5,
          },
          talk: {
            contents: "その他1@都市怪談",
          },
        },
      ],
    },
  ],
};
