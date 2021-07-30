import { angelaAnimationList } from "./animationList";

export const angelaTalkData = {
  // あらぬ噂
  canard: [
    // ネズミ: rats
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.normallyTalk_LookingHere,
            roopCount: 3,
          },
          talk: {
            topic: "ネズミ",
            contents:
              "「ネズミ」ね…程度の低い連中というのは振る舞いを見ても分かったわ。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.normallyTalk,
            roopCount: 3,
          },
          talk: {
            topic: "ネズミ",
            contents: "都市には私の知らない世界が広がっているのね。",
          },
        },
      ],
    },
    // ユン事務所: yunOffice
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.bitSmileTalk,
            roopCount: 3,
          },
          talk: {
            topic: "ユン事務所",
            contents: "結構大きな規模で来たけど、問題なかったわね。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.satiatedTalk,
            roopCount: 3,
          },
          talk: {
            topic: "ユン事務所",
            contents:
              "それにしても、フィクサーの種類と数って、本当に多いのね。",
          },
        },
      ],
    },
    // 鉄の兄弟: theBrotherhoodOfIron
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.satiatedTalk,
            roopCount: 3,
          },
          talk: {
            topic: "鉄の兄弟",
            contents:
              "組織だというのにあんな間抜けもいるなんてね。もっとそれっぽいかと思ってたわ。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.surprisingTalk,
            roopCount: 3,
          },
          talk: {
            topic: "鉄の兄弟",
            contents:
              "それにしても、機械の体の方が適している環境もあるみたいね。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.satiatedTalk,
            roopCount: 3,
          },
          talk: {
            topic: "鉄の兄弟",
            contents: "長時間の反復作業…いえ、これ以上はやめましょう。",
          },
        },
      ],
    },
    // 釣事務所1: hookOffice
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.bitSmileTalk,
            roopCount: 3,
          },
          talk: {
            topic: "釣事務所",
            contents:
              "今回のゲストで、事務所というものがどんな場所なのか理解が深まりそうね。",
          },
        },
      ],
    },
    // 釣事務所2: hookOffice
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.vagueTalk,
            roopCount: 5,
          },
          talk: {
            topic: "釣事務所",
            contents:
              "…今回のゲストが話していた通り、私は機械。さっき相手した体を義体に置き換えているわけでもない、純粋な機械…。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.vagueTalk,
            roopCount: 5,
          },
          talk: {
            topic: "釣事務所",
            contents:
              "ローランが言うには、都市では人間を模した機械を作ることは禁じられている様ね。でも、なぜそんな禁忌を犯す必要があったのかしら…そんなことをしなければ、私は…。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.determinatingTalk,
            roopCount: 3,
          },
          talk: {
            topic: "釣事務所",
            contents:
              "…いつかこの場所から出て、私をこんな目に遭わせた全てに復讐して自由の身になるの。そのために…。",
          },
        },
      ],
    },
  ],
  // 都市怪談
  urbanMyth: [
    // プロローグ: prologue
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.surprisingTalk,
            roopCount: 5,
          },
          talk: {
            topic: "都市怪談プロローグ",
            contents:
              "ローランは利害関係が一致したから手伝ってくれている様ね。どうも恐怖を原動力に動いている様には見えないから気にはなっていたの。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.bitSmileTalk,
            roopCount: 5,
          },
          talk: {
            topic: "都市怪談プロローグ",
            contents:
              "いずれにせよ、私も彼を利用しているだけだし、向こうも利用してもいいとは思うわ。もちろん、一定のボーダーラインはあるけれど。",
          },
        },
      ],
    },
    // ピエールのミートパイ: pierreBistro
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.normallyTalk,
            roopCount: 3,
          },
          talk: {
            topic: "ピエールのミートパイ",
            contents:
              "区…正確には、区を管理している巣と翼によって環境は様変わりするのね。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.satiatedTalk,
            roopCount: 5,
          },
          talk: {
            topic: "ピエールのミートパイ",
            contents:
              "はぁ、それにしても彼らにとっては私が最高級の食材に見える様だけど。どんな思考だったらそんなふうに見えるのかしら。",
          },
        },
      ],
    },
    // 街灯事務所1: streetlightOffice
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.normallyTalk,
            roopCount: 5,
          },
          talk: {
            topic: "街灯事務所",
            contents:
              "都市には12のフィクサー協会があって、それぞれ業務が違う…。事務所にはランクがあってそのランク付を行うのはフィクサー協会…。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.satiatedTalk,
            roopCount: 3,
          },
          talk: {
            topic: "街灯事務所",
            contents: "都市には本当に色々な概念や、ランク付けが存在するのね。",
          },
        },
      ],
    },
    // 街灯事務所2: streetlightOffice
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.normallyTalk,
            roopCount: 3,
          },
          talk: {
            topic: "街灯事務所",
            contents: "さっきの招待客達はだいぶ仲が良かったわね。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.surprisingTalk,
            roopCount: 5,
          },
          talk: {
            topic: "街灯事務所",
            contents:
              "それにしてもローランは、ああいった経験は何度もしてきたと話していたわね…。今はどん底フィクサーとか言ってたけど、本当はどうなのかしら。",
          },
        },
      ],
    },

    // 街灯事務所3: streetlightOffice
    {
      data: [
        {
          animation: {
            ...angelaAnimationList.satiatedTalk,
            roopCount: 3,
          },
          talk: {
            topic: "街灯事務所@ルル",
            contents:
              "仲間が死んでその後追いの悲劇…まぁ、私としては見慣れたものだけど。",
          },
        },
        {
          animation: {
            ...angelaAnimationList.surprisingTalk,
            roopCount: 5,
          },
          talk: {
            topic: "街灯事務所@ルル",
            contents:
              "ローランもああ言った経験は結構してきたらしいわね。どん底フィクサーでは簡単にできなさそうな経験だけど。",
          },
        },
      ],
    },
  ],
};
