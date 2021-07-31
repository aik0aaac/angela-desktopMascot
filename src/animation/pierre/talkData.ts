import { pierreAnimationList } from "./animationList";

export const pierreTalkData = {
  // あらぬ噂
  canard: [
    // 出番なし用会話
    {
      data: [
        {
          animation: {
            ...pierreAnimationList.normallyTalk,
            roopCount: 3,
          },
          talk: {
            topic: "",
            contents: "あら？ここの段階では私の出番はまだみたいね。",
          },
        },
        {
          animation: {
            ...pierreAnimationList.surprisingTalk,
            roopCount: 3,
          },
          talk: {
            topic: "",
            contents:
              "あら、壁に何か書いているわ…「あなたは都市怪談で話せるキャラだから待っててね」…ふーん？",
          },
        },
        {
          animation: {
            ...pierreAnimationList.mostlySmileTalk,
            roopCount: 3,
          },
          talk: {
            topic: "",
            contents:
              "ともかく、ここではあんまりおしゃべりしちゃダメみたい。都市怪談でまた会いましょ！",
          },
        },
      ],
    },
  ],
  // 都市怪談
  urbanMyth: [
    // その他1
    {
      data: [
        {
          animation: {
            ...pierreAnimationList.mostlySmileTalk,
            roopCount: 5,
          },
          talk: {
            topic: "",
            contents:
              "んっふふ〜〜♪ここには最っ高級の食材がゴロゴロ転がってるわねぇ。",
          },
        },
        {
          animation: {
            ...pierreAnimationList.normallyTalk,
            roopCount: 5,
          },
          talk: {
            topic: "",
            contents:
              "でもみーんな人間じゃないみたいね?　あやふやなのもありそうだけど。",
          },
        },
        {
          animation: {
            ...pierreAnimationList.mostlySmileTalk,
            roopCount: 5,
          },
          talk: {
            topic: "",
            contents:
              "でもそんなこと関係ないわ！どんな味がするのか楽しみだわ〜。",
          },
        },
      ],
    },
    // その他2
    {
      data: [
        {
          animation: {
            ...pierreAnimationList.normallyTalk,
            roopCount: 3,
          },
          talk: {
            topic: "",
            contents:
              "人が引き出せる味には限界があるの。人間の舌が感じることができる味の極限って思ったより大したことないから。",
          },
        },
        {
          animation: {
            ...pierreAnimationList.normallyTalk,
            roopCount: 5,
          },
          talk: {
            topic: "",
            contents:
              "多くのシェフたちは、これ以上の味を追い求める方法は何か悩んで…「舌で感じる味、これ以上の経験を味に昇華したらどうか？」という結論に至ったわ。",
          },
        },
        {
          animation: {
            ...pierreAnimationList.normallyTalkWithCloseEyes,
            roopCount: 5,
          },
          talk: {
            topic: "",
            contents:
              "料理の工程そのものを味で感じられたら、それはまさしく舌で感じる味以上の経験になるように…。",
          },
        },
        {
          animation: {
            ...pierreAnimationList.normallyTalk,
            roopCount: 5,
          },
          talk: {
            topic: "",
            contents:
              "そうしてシェフのみんなが、もっと素晴らしい味を追い求めるために研究を続けているのよ。",
          },
        },
      ],
    },
    // その他3
    {
      data: [
        {
          animation: {
            ...pierreAnimationList.mostlySmileTalk,
            roopCount: 5,
          },
          talk: {
            topic: "",
            contents:
              "「８人のシェフ」…私はあの人たちのエプロンの染みくらいでも追いつきたい！そのために研究を続けているの！",
          },
        },
      ],
    },
    // その他4
    {
      data: [
        {
          animation: {
            ...pierreAnimationList.normallyTalkWithCloseEyes,
            roopCount: 3,
          },
          talk: {
            topic: "",
            contents:
              "私たちをこーんな素敵な場所に招待してくれた方には、上品に振る舞わなきゃね。",
          },
        },
      ],
    },
  ],
};
