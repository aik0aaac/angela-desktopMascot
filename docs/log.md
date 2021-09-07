# 制作の過程ログ
ここではアンジェラ様デスクトップマスコット作成の制作過程LOGを記す。  
なお、筆者は特別な記載がなければ下記環境で作業を行った:

- OS: MacOS Big Sur v11.4（20F71）
- ※M1チップではなくIntelチップのMacbook Pro

## 余談:技術選定について
今回使用した主要技術スタックは下記の通り:

- アニメーション作成: SpriteStudio
    - アニメーション再生にはSpriteStudio提供会社が作成しているSS6Player for Webを使用
- デスクトップアプリ: Electron × Vue3

以下に選定理由を述べる。

アニメーション作成にSpriteStudioを使用したのは「2dアニメーション作成ツールで、無料で全ての機能が利用できるから」。  
元々アニメーションについては、セルアニメーション形式ではなくSpineやLive2dを使用する様な2dアニメーションで作りたいなと想定していた。  
(ソシャゲのアークナイツの基地内部でミニキャラが動くイメージが前提としてあった)

筆者が調べた限り、2dアニメーション作成ツールには「Live2d」「Spine」「SpriteStudio」が3大巨塔としてあるっぽい。  
だが、Live2dは無料版だと動かせるパーツ数に限界があるし、Spineは無料版だと保存ができない…無料で行える範囲が狭すぎるのだ。  
対してSpriteStudioは、なんと個人開発の範囲であれば**無料で全ての機能が利用できる**という太っ腹っぷり! まじありがたや…!!  
参考: https://www.webtech.co.jp/information/release/20200924/spritestudio.html  
このためSpriteStudioを選定した。

デスクトップアプリにElectron × Vue3を選定したのは「以前Electron × Vue2でデスクトップアプリを作った経験がある」というのと「フロントエンド領域が元々得意」というのと「Vue3を勉強したい」というのから。  
ちなみに以前作ったElectron × Vue2のデスクトップマスコットはこれ:  
https://github.com/aik0aaac/molmot-desktopMascot

## Githubリポジトリ作成
- 2021/07/09開始
- 2021/07/09完了

何はともあれまずはGithubでリポジトリ作成。  
気楽に現状のソースコードをぶち壊してもいい様に、開発のTurning Point時には明示的にCommitできる環境は整えておきたいからね。配布時にも便利だし…。  
一応リポジトリはPrivateで作っておく。公開時にPublicにして、それまでは秘密にしておこう…。特に理由あるわけでもないけど。

ライセンスも悩みどころ。二次創作物で公式の絵を流用したりはせず、全部自力で作る予定だからオープンソース形式でもいいかもしれないけど…。オープンソースにすると、自分で作ったイラストもそうなっちゃうんだよね。ソースコードはいいと思うけど二次創作物系の絵がオープンソースになるのはまずい。悩んだが、以前作ったPUI PUIデスクトップマスコットと同様に絵だけ別のライセンスを適用しているって体にしようってことでMITライセンスにした。  
→最終的にはリポジトリ内部にはアニメーションデータや画像を一切入れない形式で乗り切ることにした。リリースパッケージは別途でアップロードできるので。

名称に悩んだが「angela-desktopMascot」に決定。アンジェラ様以外も入れるかもしれないけど、できたとしても相当先の話だと思うしね…。

## Electronで空のデスクトップマスコットアプリを作成
- 2021/07/10開始
- 2021/07/12完了

まずはVue3プロジェクト作成。  
参考記事: https://www.suzu6.net/posts/260-electron-vue-develop/

<img width="710" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/1.jpg?raw=true">

記事との相違点: dart-sassを使用した。  
公式がdart-sassの利用をrecommendedしている様子。  
https://webpack.js.org/loaders/sass-loader/

記事との相違点: E2Eテストツールにcypressを採用。  
ElectronでE2Eテストができるかは正直微妙だが、Vue-Routerを入れてるんだったらできるんじゃないってことで導入することに。

出来上がった時点でのフォルダ構成:  
https://github.com/aik0aaac/angela-desktopMascot/tree/636542028e74b57e5e06727e50b2880f626c4533

にしてもすごいのが、`/tests`内でJestとcypressが競合しない様に:

- Jest: `/tests/unit`内部に
- cypress: `/tests/e2e`内部に

…あるってこと。こういう所もしっかりやってくれるから、Vueプロジェクトはコマンドで立ち上げたくなるんだよな。

とりあえず標準装備として`rimraf`を扱える様にしておく。  
https://maku77.github.io/nodejs/npm/npm-run-rimraf.html  
`yarn add -D rimraf`、`package.json`に下記を追記。

```json
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test:unit": "vue-cli-service test:unit",
    "test:e2e": "vue-cli-service test:e2e",
    "lint": "vue-cli-service lint",
    "clean": "rimraf node_modules" // ココ追加
  }
```

Sassをかける様にする準備等は、SpriteStudioが本当にElectronに組み込めそうか分かった段階でやることにする。

次はElectronを導入…と思ったが、`vue add electron-builder`と打つと下記の様なメッセージが:  
<img width="1430" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/2.jpg?raw=true">

「いやよくできてんなさすが」…と思いながら、現状が「Vueのプロジェクトができた段階」であることを思い出し一度コミットすることに。

せっかくなのでcommitコメントにはプレフィックスをつけておく。  
こちらの記事で紹介されているCommitzenとそれを日本語化するツールを入れていたため:  
https://blog.solunita.net/posts/write-easy-neat-git-commit-message/
こちらを使って`git cz`でコミットしよう。  
…と思ったけど、どうにもプロジェクト立ち上げ初期の、なんにも機能がついていない時のコメントプレフィックスはつけづらい。  
なので、俺俺ルールだが「init: プロジェクト作成途中に関わる変更」としてプレフィックスを作成することにしてみた。これで運用してみよう…。

Electronを導入すると、早速出てきました「どのElectronバージョンにするか問題」。  
バージョンはなんと選べる3択! 記事ではv7~v9しか選べなかったとあったのに、最新バージョンのv13から選べる様になってら。  
<img width="528" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/3.jpg?raw=true">

今回参考にしようと思ったPUI PUIデスクトップマスコットのElectron versionは9。なんとリストにすらない…だからフロントエンド周りの変化は激しすぎるんだって!!!  
Vue2→Vue3は全く別物になったという苦い経験もあるので、ここは慎重に選びたい…

早速破壊的変更があった記事をみっけた。  
https://forest.watch.impress.co.jp/docs/news/1309998.html  
そして、リリースポリシーによると3バージョン前のサポートは打ち切ると言う…んなら最新バージョン使うしかねーじゃんってね。調べてもうまく出てこなかったし「いーややっちゃえ」精神で最新バージョンを選択。フラグにならないといいけど…。

ちなみにElectronの公式テストツールもあるらしい。Spectronってやつ。  
https://ics.media/entry/13082/  
これも入れるか聞かれたので、とりあえず脳死で「YES」を選択。まぁ使うとは限らないから(白目)。

その後Buildすると、参考記事にあった様にページが真っ白になったのでVue-Routerの設定変更。  
参考: https://www.suzu6.net/posts/262-vue-electron-builder-blank/  
無事にいい感じにビルドできた!現時点でのディレクトリはこちら:  
https://github.com/aik0aaac/angela-desktopMascot/tree/d589c60ea4847d810ea90435322061e8a1b480a3

お次はこのElectronプロジェクトをデスクトップマスコットにしていこう。  
以前に作ったElectronデスクトップマスコットのコード:  
https://github.com/aik0aaac/molmot-desktopMascot  
…と、自分のブログ記事を元に作成。  
https://aik0aaat.hatenadiary.jp/entry/2021/03/19/100000  
こういう時に、きっちりアウトプットしてた自分に感謝するねんな。

やっていくと、早速記事とは異なることが。これがv12の破壊的変更点なのかな…:

```js
async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Spectronテスト時に要求される
      enableRemoteModule: !!process.env.IS_TEST,
      // ここから
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      // ここまで
    },
    transparent: true, // 背景の透明化
    frame: false, // フレームを非表示にする
    resizable: false, // ウィンドウリサイズ禁止
    alwaysOnTop: true, // 常に最前面に表示
    hasShadow: false, // デスクトップアプリの影をなくす(MacOS対応)
  });
```

ここからここまでで区切った箇所が「Electron v9ではなかった」箇所。  
https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration  
どうもnodeIntegrationという「Node.js API(`require`とか)はデフォルトでは使用できない様にしている」らしい。これはセキュリティ的な懸念のためとのこと。  
前々からこれは公式側も「使えなくするよ」と言っていたので、それが実現された形かな。

もっと話すと…。  
Electronは「レンダラープロセス」と「メインプロセス」の2つの処理で動いている。  
`yarn electron:serve`が実行されると、エントリポイントの`background.ts`が呼び出され、メインプロセスが実行。その後、メインプロセス経由でレンダラープロセスが実行される。

超噛み砕くと、筆者のプロジェクトだとVue3部分が「レンダラープロセスで実行される処理」、`background.ts`内の処理は「メインプロセスで実行される処理」となる。  
この辺りの参考記事: https://qiita.com/nullpointer_t/items/83cc14225b677f0d72fa

レンダラープロセスはいわゆるWebでいうクライアント側なので、普通であればNode.js系の処理は実行できない…けど、nodeIntegrationを有効化すればNode.js系の処理をレンダラープロセスから、つまりVue3側で使える様になるということ。  
Node.jsはいわばサーバーサイドのJavaScriptなので、これを使えばVue3から`fs`(ローカルファイルの読み書き)や`sqlite`といったモジュールが使える様になる。

ただしこれにも弱点があって、クライアント側にサーバー側、つまりElectronを実行しているマシン(デスクトップマスコットを起動しているPC)とやりとりできる口を用意してしまうことでXSS脆弱性が生まれてしまう。  
ソースコード内部に「Cドライブのファイルを全消ししてね」なんてコードを埋め込み人知れず実行させたりもできちゃうのだ。

悪意を持った人がGitリポジトリ内のソースコードをいじれない様にしておかないとな…。  
まぁGithubはデフォルトでリポジトリ作成者以外のcommitは受け付けない様になっているはずだし大丈夫だろうけど。  
詳しくは: https://qiita.com/akameco/items/cc6fc949e7c9f0d1a42a とか https://utf-8.jp/public/2016/0307/electron.pdf 参照。

脱線したが気を取り直して続きをやっていく…。  
すると「フレームにあるボタン群の代わりを作成」で早速大変Pointが!  
以前作ったやつだと私はnodeIntegrationを有効化してやっていたらしい…伏線回収早すぎかよ!  
https://aik0aaat.hatenadiary.jp/entry/2021/03/19/100000#%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%81%AB%E3%81%82%E3%82%8B%E3%83%9C%E3%82%BF%E3%83%B3%E7%BE%A4%E3%81%AE%E4%BB%A3%E3%82%8F%E3%82%8A%E3%82%92%E4%BD%9C%E6%88%90  
今回はせっかくなので、nodeIntegrationを有効化せずともどうにかできないか模索してみることにする。

「ウィンドウを動かすボタン」は前作ったデスクトップマスコットのコードを丸コピできそう。  
…と思ったら、ここもElectron APIを使用している=requireでElectron APIを参照していることが判明。これじゃあ移植できねーじゃん…やっぱり「nodeIntegrationを有効化せずともELectron APIをいじれないか」やってみる必要がある。

とりあえずデスクトップマスコットでも画面上の要素は押せる様に「要素にマウスポインタが乗っている間、マウスイベントの無視をやめる」処理を作ってみる。  
使用しているElectron APIは`electron.remote.getCurrentWindow().setIgnoreMouseEvents(false);`。これを実行できれば…。

 探していくと問題の本質は「レンダラープロセスからメインプロセスに通信したい」ということになることがわかった。  
メインプロセス内では`electron.remote.getCurrentWindow().setIgnoreMouseEvents(false)`ができることがわかったからだ。

方法としては2通りあり、「ipcRendererを使用する方法: https://webbibouroku.com/Blog/Article/electron-ipc 」と「グローバルオブジェクトにNode.js APIを叩けるJavaScriptからElectronオブジェクトを配置し、それを使用する方法: https://qiita.com/nomuyoshi/items/9091abd9dc3b05c85f44 」だ。  
個人的にはグローバルオブジェクトに配置するというのがどうも引っかかるので、前者の方法を採用することに。  
なんなら前者のやり方でデスクトップマスコットの実装記事があったので、それを参照してみる:  
https://shironeko.hateblo.jp/entry/2019/11/09/235312

…が、この方法だとレンダラープロセス内の処理が膨大になることが予想される。  
`background.ts`にIPC関連の処理が累積されるのは、どうも危ない予感しかしない…このファイルではElectronウィンドウの設定等もしているのにだ。  
なので、前者と後者を組み合わせた形で実装することに。  
後者のやり方の中では、preloadという機能を使用している。

>preloadとは、他のスクリプトが実行される前にロードするスクリプトを指定できるオプションで、指定したスクリプト内では、Node.jsのAPIにアクセスできます。  
https://qiita.com/nomuyoshi/items/9091abd9dc3b05c85f44

なので、このpreloadに`ipcMain`関連の処理を固めちゃえばいいのかなと。  
お試し実装してみる…。

…どうも`ipcRenderer`はnodeIntegrationがtrueじゃないと使用できないみたい…。  
https://final.hateblo.jp/entry/2020/06/09/191439  
nodeIntegrationをfalseにしたまま使いたかったのに、どうもそれはダメみたいだ…くそう…。  
他に良い解決策がないか模索したが、どうしようもなさそうなので…苦渋の決断で、nodeIntegrationをtrueにすることに。

当初やりたかった`electron.remote.getCurrentWindow().setIgnoreMouseEvents(false)`も、nodeIntegrationがtrueなら以前作ったデスクトップマスコットのコードが流用できる。ipc通信については、それが必要になった時にそれを作るとしよう。

やっていく中で、Vue2におけるcomputedプロパティのVue3の書き方がわからなくなった。  
下記に参考記事を掲載しておく…:  
https://qiita.com/azukiazusa/items/1a7e5849a04c22951e97#computed

…やってみたが、どうも`electron`内部に`remote`というものがない。  
`ipcRenderer`はあるので、せっかくなのでこれを使用する路線でいこう。

なんとかできた…！  
現時点でのコードはこれ:  
https://github.com/aik0aaac/angela-desktopMascot/tree/63b1e27e4048d607fe7bd9f2965a2d55fcc11d3a  
Vue3とElectronのnodeIntegrationの違いでだいぶ苦戦した気がする…。  
次は本題のSpriteStudioだ!

# SpriteStudioのサンプルコードを元にElectronにバインド、いけそうか検証
- 2021/07/13開始
- 2021/07/18完了

ElectronにSpriteStudioのサンプルコードをバインドしてみる。こちらの記事が参考になりそうだ…。  
https://www.webtech.co.jp/help/ja/spritestudio/guide/output6/ss6p_for_web/  
ちなみに現時点(2021/07/13)にて、SS6Player for Webの参考系記事はほとんどなさそう。だからこそ参考記事が公式記事になるのだ…公式記事が結構わかりやすかったのは幸いか。この知見はぜひブログにしたいねぇ…。  
SpriteStudioのデータは上記記事内のサンプルデータを扱うこととする。本章ができなければSpriteStudioを学ぶ意味もなくなるからね。この時点ではサンプルデータでやっておきたいなと思いながら…。

流れとしては大まかに下記のとおりっぽい:

- SpriteStudioのアニメーションデータ準備
- sspj(アニメーションデータ)をSS6Player for Webで使用するssfbに変換(Ss6ConverterGUIを使用)
- 再生用コードを組み立て

意外と事前準備がいるっぽいね。  
SpriteStudioを用いてやる際には「SpriteStudio本体」「Ss6ConverterGUI」「SS6 Player for Web」…の3つのバージョンやその依存関係に注意しておかないと。…まぁフロントエンド界隈ほど激しくバージョンアップなりはしないと思うけど。

ちなみにsspjやらssfbとか出てきたので、ここでSpriteStudioのデータ類を整理しておくと:  
参考: https://www.webtech.co.jp/spritestudio/ss6user/download/SpriteStudio_beginners2_20200310.pdf  
https://www.webtech.co.jp/blog/products/spritestudio/12626/

- sspj: プロジェクトファイル
    - AviUtilのプロジェクトファイルの様なもの
    - 全てのファイルの大元となるデータが格納
- ssfb: FlatBuffers形式のバイナリファイル
    - プログラム上でSpriteStudioのデータを使用するときに使用
    - FlatBuffersとは?: https://qiita.com/y_miyoshi/items/873ae853509f8cd59f0b
- ssbp: 独自形式のバイナリファイル
    - プログラム上でSpriteStudioのデータを使用するときに使用
    - C++でしか操作できない、処理負荷が高いなどssfbと比較して問題あり
- ssae: アニメーションファイル
    - レイアウトやアニメーションの情報を保存するファイル
- ssce: セルマップファイル
    - 動かすための『画像の情報』を保持するファイル
- ssee: エフェクトファイル
    - エフェクト機能使用時に使用、エフェクト情報が格納されている

…と言った形だろうか。こう言った情報がググっても気軽に出てこないあたり、やはりSpriteStudioはマイナーな技術な気もするなぁ…。

## sspj(アニメーションデータ)をSS6Player for Webで使用するssfbに変換
ひとまずバイナリファイルだけ作成。…と思ったら、なぜかSs6ConverterGUIが効かない。どうもLOGに何も出力されなくなってしまう…  
<img width="736" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/4.jpg?raw=true">

ウイルスバスターのせいかと思ってOFFってもうまくいかない。参考ページはWindowsでやってたっぽいから、Macはうまくいかないのかも…。  
というわけで、同梱されてたexecコマンドから実行することに。  
DLしたフォルダ内に`Ss6Converter`という拡張子もないものをTerminal経由で実行。Terminalで`./Ss6Converter`と実行すると、下記の様な使用方法LOGが出現! 丁寧で助かる…。

```
~/workspace/illustration/SpriteStudio/Ss6Converter$ ./Ss6Converter   

Ss6Converter converter version SpriteStudio 6 SDK Version 1.8.0 (Build: Apr  8 2021 15:45:32)
usage: Ss6Converter Input files(.sspj) ...

option:
  -h      Display usage.
  -v      Verbose mode.
  -o      set output path.
  -pkg    sspkg output mode
  -f      set output format.
  usage exsample : Ss6Converter -o <outputpath> -f < json , ssfb , c , sspkg> <input file name path>
```

`Ss6Converter -o [出力先パス] -f ssfb [入力ファイル(.sspjファイル)パス]`でできそう。早速実行…。

```
./Ss6Converter -o ./output -f ssfb ../OPTPiX_SpriteStudio_CharactorBoxSamples_20190626/chara_box/box_00_00.sspj
../OPTPiX_SpriteStudio_CharactorBoxSamples_20190626/chara_box/box_00_00.sspj
Animation load error : 00_box_00_default.ssae
ssae old version
データにエラーがありコンバートを中止しました 
```

まさかのssae …つまり「アニメーションファイル」が古くてコンバート中止に。サンプルデータとコンバートツールでバージョンの差異があるみたいね…。

サンプルデータの作成日は2019年っぽい。結構前だねぇ…対してコンバーターの方の最終コミット日は2021/4。何かしら差異があってもおかしくなさそう…。

一応、「ssaeのバージョンが古いのが本当の原因か」調査してみ…たが、よくわからなかった。コンバーターのソースコードを見てみると:  
https://github.com/SpriteStudio/SpriteStudio6-SDK/blob/develop/Build/Converter/main.cpp#L1910  
`ssae old version`というエラーメッセージを出力する行はmain.cppにはなさそうなので、おそらく上記行のTry-catchでこけてる可能性が高そうということは分かったが…。

ちなみに他のサンプルファイルはどうかなと思ったが、他のサンプルファイルも軒並み2019年作成の様だ。  
https://www.webtech.co.jp/help/ja/spritestudio/download/sample/

埒があかないので、試しにこの古いサンプルデータを最新のSpriteStudioで保存し直し、ssaeが最新バージョンになるか確かめてみる。  
SpriteStudioをインストールするところからだな…。

## SpriteStudioインストール
SpriteStudioのStarter版を使用する。Starter版なら個人利用の範囲であれば無償で利用できるからね。  
ライセンス形式となっているらしく、まずはSpriteStudioの本体をDLし:  
https://www.webtech.co.jp/help/ja/spritestudio/download/ss6download/  
次はWebテクノロジオンラインストアからライセンスを発行してもらい:  
https://store.act.webtech.co.jp/products/

あとはSpriteStudioを起動し、ライセンスキーを入力すれば…:  
<img width="587" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/5.jpg?raw=true">

SpriteStudioが無事に起動! わーい!!  
<img width="587" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/9.jpg?raw=true">  
…文字の解像度が荒かったりするけど、まぁ気にしない方向で。  
お次はサンプルプロジェクトを開いてみよう。

## 現行のコンバーターに対応したssaeファイル作成
とりあえずSpriteStudio上から、ssaeファイルをリネームして上書き保存してみて、コンバーターに読み込ませてみたが失敗。  
もういいや練習がわりに…と思い、サンプルデータの画像を拝借してSpriteStudioのプロジェクトを新規作成していくことに。

### SpriteStudioでサンプルのアニメーション作成
Electronにバインドしたかっただけなのにここまでになるとは…なんともしんどいものよ。  
気を取り直して、サンプルのアニメーションを作成してみる。予行練習と思えばいいかな…。  
アニメーション作成にはこちらを参照した: https://www.webtech.co.jp/spritestudio/ss6user/download/SpriteStudio_beginners2_20200310.pdf  
ここからはアニメーション作成時に面白いと感じた点をここに記載していく:

セルの登録をやってみたが:  
<img width="666" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/7.jpg?raw=true">  
画像引用: https://www.webtech.co.jp/spritestudio/ss6user/download/SpriteStudio_beginners2_20200310.pdf

意外と操作は快適で使いやすい。まぁ実際にやるときはpsdファイルから「スプライト画像生成」「(おそらく)セル生成までやってくれる」ツールを使用すると思うけどね…。

プロジェクト設定>互換性>出力プラットフォーム選択時、SS6Player for Webを選択すると「エフェクト機能」と「マスク機能」がOFFになってしまった。  
<img width="487" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/8.jpg?raw=true">

どうも使用できない機能はOFFになる様に自動的に設定してくれるらしい。便利!  
…逆に、今回作るアンジェラ様のアニメーションは「エフェクト機能」と「マスク機能」には頼れないということだ。メッシュ/ボーン機能は使えるから問題ないとは思うが…。

アニメーションの作成自体もとても快適に操作できる。  
要素をクリックするとこんな感じの独特の操作アイコンが出て、要素の移動や回転、変形といったさまざまなことが直感的に可能。  
<img width="1086" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/9.jpg?raw=true">

この操作アイコンに慣れる必要はあるだろうが、それでもかなり扱いやすいなと感じた。簡単な動きならLive2dより手軽かもしれない…目ぱちのアニメーション作成がどれくらい楽にできるか次第かな。  
キーの追加についてはLive2dとかなり似た操作感。「キーを追加して」「そのキー上の動きを設定し」「保存」とすれば、やりたいことは一通りできる。  
Live2dの無料版だと、これが各要素事に1つくらいしかパラメータ設定できなかったが…SpriteStudioだと「新規アニメーション」を作ってしまえば無限にパラメータ設定やいろんな動きができる。これは画期的な気がするぞ…！Live2dの有償版だったらできるかもしれないけど、Live2d無償版でできない以上SpriteStudioを活用した方が私好みかもしれない。

とりあえず簡単なアニメーションを作成し、無事にssaeファイルもできていることは確認できた。  
お次はこのファイルを使ってssfbファイルにコンバートしてみよう。

## sspjファイルをssfbファイルにコンバート

```
~/workspace/illustration/SpriteStudio/Ss6Converter
❯ ./Ss6Converter -o ./output -f ssfb ../SampleProject/SampleProject.sspj 
../SampleProject/SampleProject.sspj
SpriteStudio 6 SDK Version 1.8.0
Ss6Converter ssbpFormatVersion=11
convert start!
警告：セルマップが存在しません。
データにエラーがありコンバートを中止しました
```

無事にできた…!? と思いきやまたもエラー。ただ、忌々しき`ssae old version`のエラーは出てないので十分な進歩だ。  
見てみると、どうもプロジェクトを保存してなかったかららしい。こりゃ失敬…改めてコンバートしてみる。

```
~/workspace/illustration/SpriteStudio/Ss6Converter
❯ ./Ss6Converter -o ./output -f ssfb ../SampleProject/SampleProject.sspj
../SampleProject/SampleProject.sspj
Animation load error : Sample.ssae
ssae old version
データにエラーがありコンバートを中止しました
```

…まじか…!!!?  
どうしようと思い、コンバーターのGithubリリースノートを見てみると…どうもバージョンが複数あるらしい。  
https://github.com/SpriteStudio/SpriteStudio6-SDK/tags  
試しに1つ前の「1.7.4_SS6.4.0」をDLし、それで実行してみるとこんな状態に:

```
~/workspace/illustration/SpriteStudio/Ss6Converter/v1.6.1_SS6.2.0
❯ ./Ss6Converter -o ../output -f ssfb ../../SampleProject/SampleProject.sspj
../../SampleProject/SampleProject.sspj
SpriteStudio 6 SDK Version 1.6.1
Ss6Converter ssbpFormatVersion=11
convert start!
TextureFile Load box_00_00.png 

New Load Texture : box_00_00.png 

TextureFile Load box_00_00.png 

Texture Cached : box_00_00.png 

Release Texture refCount == 0  Deleted : box_00_00.png 

TextureFile Load box_00_00.png 

New Load Texture : box_00_00.png 

TextureFile Load box_00_00.png 

Texture Cached : box_00_00.png 

Release Texture refCount == 0  Deleted : box_00_00.png 

The specified texture is not under management. 

convert end
```

処理は進んでそうだが、outputフォルダを見ても何も出力されていない事態に…。  
でも、参考ページのコンバーター出力部分と末尾は合ってそうなのだが…なぜだ…。  
https://www.webtech.co.jp/help/ja/spritestudio/guide/output6/ss6p_for_web/#ssfb_convert

もしかしてMacOS側の問題かもしれない…WindowsPCでやったらコロッとうまくいかないかな〜…。  
どうもSs6ConverterGuiが動かないのもMacOS限定っぽい?し: https://github.com/SpriteStudio/SpriteStudio6-SDK/issues/94  
WindowsPCでSpriteStudioでアニメーションデータ作成→Ss6Convertを使用してssfbファイルを作成してみよう。

### Tips: なぜセル分けをするのか
<img width="1560" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/10.jpg?raw=true">  
画像引用: https://www.webtech.co.jp/spritestudio/ss6user/download/SpriteStudio_beginners2_20200310.pdf

これについての具体的なユースケースが見えたので記事を貼っておく。  
https://q-ice.hatenablog.com/entry/2016/05/03/013009

アニメーションを流用する際にセル境界をきっちり分けておくのがいいことらしい。  
アークナイツのミニキャラとか、かなりモーション凝ってるが…もしかしたら共通のアニメーションがあり、そこからカスタマイズしたりとかもしてるのかも。全部を最初から作るのは大変だろうしね。

## Windowsで作業、ssfbファイルを作成
Windowsで同様のことを行ってみた。

- SpriteStudioのインストール
- SpriteStudioでアニメーションデータ作成
- Ss6ConverterGUI v1.7.4_SS6.4.0にてコンバート

…あっさりssfbファイルができてしまった。MacOSではやるなということだろうか…。  
ちなみにSs6ConverterGUIのv2.1.0_SS6.5.2でやってみてもssfbファイルは作成できた。

やっぱMacOS上でやったのがあかんのかな…。なんにせよファイルは生成できたので、次へ進むことにする。  
一応最新版のコンバーター(v2.1.0)で生成されたssfbファイルを使って、今後の作業は行おう。

## 再生用コードを組み立て
再生用コードは、SpriteStudioさんが出してくれているサンプルコードを参考に実装する。  
https://github.com/SpriteStudio/SS6PlayerForWeb  
サンプルコードは大きく分けて3種類ある:

- ss6player-pixi: pixi.js 上でアニメーションを再生するプレイヤーライブラリ
- ss6player-rpgmakermz: RPGツクールMZ 上でアニメーションを再生するプラグイン
- ss6player-viewer: ss6player-pixi へアニメーションの再生確認用の機能と sspkg の再生機能を追加したプレイヤーライブラリ
- ssfblib: アニメーションデータファイル ssfb をパースするライブラリ

RPGツクールで使用するわけでもなし、データファイルをパースして欲しいわけでもないから、ss6player-rpgmakermzとssfblibは除外。  
ss6player-pixiかss6player-viewerで悩んだが、デモページをみる限り後者だとリッチすぎるので前者を参考に組み立ててみることにする。  
Githubのリポジトリをダウンロードし、ソースコードを見てみる…。

※これ以降は、当該リポジトリの2021/6/22時点の最新Commit時のソースコードをもとにしたお話である  
https://github.com/SpriteStudio/SS6PlayerForWeb/tree/10e59900e14967348b05e57bec81a1ab17293054

ss6player-pixiは`packages/ss6player-pixi`内部のコードのことを指す様だ。  
Wiki等をみる感じ、このプロジェクトのビルド結果のJavaScriptをライブラリとして使用できるっぽい。ソースコードだけ配布されているのでビルドは自前で、という経験は初めてかも…。

今後の流れは下記でやっていこう:

- SS6PlayerForWebをローカル環境で動かす環境整備
- SS6PlayerForWebをもとにお試しでSS6PlayerForWebライブラリの使用感を確かめ
- Electronにバインド

### SS6PlayerForWebをローカル環境で動かす環境整備
下記の記事をもとにビルド。  
https://github.com/SpriteStudio/SS6PlayerForWeb/tree/master/packages/ss6player-pixi#%E5%85%A8%E3%83%93%E3%83%AB%E3%83%89

**SS6PlayerForWebリポジトリ直下で**`npm i`を実行、  
`npm run bootstrap`を実行。どうも内部でlernaというものを使用しているらしい。  
その後は`npm run build`を実行。buildされると`SS6PlayerForWeb-develop/packages/ss6player-pixi`内部に`dist`フォルダができ、そこにライブラリとして使用可能っぽいファイル群が生成された。

余談:lernaとは  
単一のリポジトリで複数の npm module 開発を可能にするツール。複数のNode.jsプロジェクトを管理するツールっぽい。  
https://qiita.com/hisasann/items/929b6702df1d6e871ce7

生成されたファイルは下記の通り:

- dist/types: 型定義ファイル。TypeScriptでも当該ライブラリを使用できる様にしてくれてるっぽい…ありがたや
- dist/lib
    - dist/lib/ss6player-pixi.js
    - dist/lib/SS6Player.js
    - dist/lib/SS6PlayerInstanceKeyParam.js
    - dist/lib/SS6Project.js
- dist/ss6player-pixi.es5.js
- dist/ss6player-pixi.umd.js

各生成JavaScriptには`.map`ファイルも入っていた。  
その後は`npm run view`で、`Player`フォルダ内部のサンプルHTMLとJavaScriptが実行され表示。  
どうも初期のアニメーションデータは、リポジトリ直下の`TestData`というフォルダ内のものを参照して使用しているっぽい。  
なんにせよ、ローカル環境で無事に動いた。お次はお試し使用として本ライブラリを使ってみることにしよう。

### お試しでSS6PlayerForWebライブラリの使用感を確かめ
`Player`フォルダ内部のサンプルHTMLとJavaScriptをカスタムしてみよう。  
ソースコードを見る感じ、下記の様な流れで実行されるっぽい:

```js
// ①PIXI Applicationの初期化
var app = new PIXI.Application({ width: 1280, height: 720, backgroundColor: 0x606060 });
document.body.appendChild(app.view);

// ②ssfbFileを指定し、SS6PlayerPixiを起動
var mySS6Project = new ss6PlayerPixi.SS6Project([ssfbFileのパス], [起動完了時のコールバック処理]);

// ③起動完了時のコールバック処理を登録
var onComplete = function () {
    var mySS6Player = new ss6PlayerPixi.SS6Player(mySS6Project); // 引数には②で作成したSS6Project変数を格納する
    mySS6Player.Setup([再生したいアニメーション名(.ssaeファイルの名称)を文字列指定], "[アニメーション種類を文字列指定]");
    mySS6Player.position = new PIXI.Point(320, 480);
    mySS6Player.scale = new PIXI.Point(0.5, 0.5);
    app.stage.addChild(mySS6Player); // `app`はPIXI Applicationの初期化時に使用したnew PIXI.Applicationの変数

    // [任意]ユーザーデータコールバック
    // ※Play前に設定しないと開始フレームのデータが漏れるので注意
    mySS6Player.SetUserDataCalback(function (userDataArray) {
      // console.log(userDataArray);
    });

    // [任意]再生速度(SS設定値への乗率、負設定で逆再生)とフレームスキップの可否(初期値はfalse)を設定
    // フレームスキップ：trueで処理落ちでフレームスキップ、falseで処理落ちでもフレームスキップしない
    //        mySS6Player.SetAnimationSpeed(-1, true);

    // [任意]始点フレーム番号、終点フレーム番号、ループ回数（0以下で無限ループ）
    // 同時に初期フレームを始点（再生速度がマイナスの場合は終点）フレーム番号に設定
    //        mySS6Player.SetAnimationSection(0, 10, -1);

    // 再生開始
    mySS6Player.Play();
}
```

…サンプルファイルをもとに必要なコードだけ並べると上記の様な感じになった。  
にしても気づいたのが、実行に必要なSpriteStudio系のファイルは`ssfb`ファイルだけじゃないってこと…プロジェクトファイルなり、アニメーションデータなり全部必要っぽいね。これはWindowsで作業→MacOSで作業はめんどいかもなぁ…。  
ひとまずssfbファイルだけじゃなく、全てのZIPファイルを持ってきた。

このファイルを使用しサンプルコードをもとに編集…。無事に動かせる様になった!  
<img width="2558" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/11.jpg?raw=true">

お次はElectronにバインドしてみる。  
…前に、1つ確かめたいことが。

Windowsでssfbファイルの生成に成功したが、あのときは「WindowsでSpriteStudioプロジェクトファイルを作り」「Windowsでssfbファイル生成した」…という感じだった。  
では、「MacOSでSpriteStudioプロジェクトファイルを作り」「Windowsでssfbファイル生成した」らどうなるだろう? 正常にssfbファイルは生成されるだろうか?  
検証してみたら…無事にファイル生成できた。SpriteStudioのプロジェクトファイルに問題があるわけじゃなくて、Ss6ConverterをMacOSで動かす方に問題があるみたいだね。

### Electronにバインド
まずはss6player-pixiプロジェクト内部の依存関係を調査。依存関係のあるnpmモジュールがあれば、Electronプロジェクトにも入れてあげないといけないからね…。  
使用しているnpmモジュールは下記の通り:

```
    "flatbuffers": "^2.0.3",
    "pixi.js": "^5.3.10",
    "ssfblib": "^1.1.0"
```

この中の`ssfblib`というのは、SS6PlayerForWebライブラリ内のモジュールのことみたい。サンプルプロジェクトではlernaを用いてこの辺りの依存関係を解消しているのかな…。  
一応npmでもローカルモジュールを使用できるみたいだが、複数のnpmモジュールを1つのGitリポジトリに管理するのも面倒だ…。  
https://infltech.com/articles/Qd8UZv  
ということで、今回は`ssfblib`については「ビルド後の`dist`ファイルをライブラリがわりに使用」する形にする。もっと良い方法が思いついたらそっちにしよう…。

ということで、残るnpmモジュール`flatbuffers`, `pixi.js`をElectronプロジェクトにインストール。

その後、`ssfblib`と合わせて`ss6player-pixi`のソースコードをElectronプロジェクト内に封入。  
ただ、他の方が作ったソースコードをビルド後のファイルとはいえ自分のGitリポジトリに入れるのは憚られたため…「ソースコードを配置するフォルダのみGitリポジトリに入れて」「README.mdにソースコードを封入するやり方のみを記載」するという形にしておいた。  
README.mdはこんな感じ: https://github.com/aik0aaac/angela-desktopMascot/tree/main/src/lib/ss6player-for-web

お次はいよいよソースコード記入。ひとまずサンプルとなるVueコンポーネントを適当に作り、その中で作業してみる…。

まずつまずいたのは「TypeScript×Node.jsプロジェクト内でのpixi.jsの使い方」。  
https://qiita.com/t_furu/items/042f2d8f4cbcf8056b8c  
…は、上記を見るとあっさり解決。  
ちなみに上記記事を見ると、どうもpixi.jsは型定義を別途インストールする必要があるっぽい。なので`yarn add -D @types/pixi.js`で型もインストール。

お次はSS6Playerの使い方。サンプルコードはJavaScriptで書かれていた…型定義ファイルはあるけど、TypeScriptの習熟度が浅い自分に使いこなせるか…。

色々やっていくと、distファイルで出力されたSS6Playerのファイル構造がわかってきた。

- dist/types: 型定義ファイル。TypeScriptでも当該ライブラリを使用できる様にしてくれてるっぽい…ありがたや
- dist/lib: `dist/ss6player-pixi.es5.js`, `dist/ss6player-pixi.umd.js`で使われている処理群、ここの内容を直接指定はしない
    - dist/lib/ss6player-pixi.js
    - dist/lib/SS6Player.js
    - dist/lib/SS6PlayerInstanceKeyParam.js
    - dist/lib/SS6Project.js
- dist/ss6player-pixi.es5.js: SS6Playerモジュールのimport元、ES5版
- dist/ss6player-pixi.umd.js: SS6Playerモジュールのimport元、UMD版

`dist`フォルダ内で実際に使うのは`dist/ss6player-pixi.es5.js`と`dist/ss6player-pixi.umd.js`の**どちらかでOK**みたい。  
てっきり両方いるのかと思ったが、違うみたいね…。

ちなみにUMDというのは「JSモジュール化する仕組みの1つ」みたい。  
私はJSモジュール化では「CommonJS方式(モジュールを`require`でインポート)」ないし「ES6方式(モジュールを`import`でインポート)」しか知らなかったが、どうも中にはAMDというモジュール化規格もあるそうだ。  
UMDはAMDとCommonJS、両方の形式をサポートしたモジュール化規格らしい。  
参考:   
https://ytyaru.hatenablog.com/entry/2019/03/29/000000  
https://qiita.com/chuck0523/items/1868a4c04ab4d8cdfb23#commonjs%E3%81%A8amd

SS6PlayerForWebはES5形式とUMD形式が提供されているので、AMD形式で使いたいならUMD版を使えってことかな。少なくとも、今の自プロジェクトはES5版のもので良さそう。

長々と書いたが、要するにSS6Playerモジュールを使いたいなら:

```js
import {
  SS6Project,
  SS6Player,
} from "[path]/ss6player-pixi/dist/ss6player-pixi.es5";
```

…と書けば使えるっぽい。

やっていくと下記のエラーが。

```
ERROR in src/components/AnimationTest.vue:11:8
TS7016: Could not find a declaration file for module '@/lib/ss6player-for-web/ss6player-pixi/dist/ss6player-pixi.es5'. '/Users/ura/workspace/github/angela-desktopMascot/src/lib/ss6player-for-web/ss6player-pixi/dist/ss6player-pixi.es5.js' implicitly has an 'any' type.
     9 |   SS6Project,
    10 |   SS6Player,
  > 11 | } from "@/lib/ss6player-for-web/ss6player-pixi/dist/ss6player-pixi.es5";
       |        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    12 |
    13 | export default defineComponent({
    14 |   name: "AnimationTest",
```

どうも型定義ファイルがないと怒られている様だ。  
型定義ファイルは`/src/@types`内部に入れないとダメっぽい…distフォルダ内部にあるものではないっぽいね。  
参考: https://qiita.com/Nossa/items/726cc3e67527e896ed1e  
なお、出力されている型定義ファイル名は`ss6player-pixi.d.ts`となっていた。なので`dist/ss6player-pixi.es5.js`を`dist/ss6player-pixi.js`とリネームするのも必要だ。  
…これでOKかと思いきや、まだエラーが消えない…。

---
ここから2021/07/15  
※ここから日付を刻む様にした

おそらく型定義ファイルの配置場所に問題があるかも…ここが参考になりそう。  
https://numb86-tech.hatenablog.com/entry/2020/07/15/153431  
みてみると、どうも`ss6player-pixi.d.ts`を`dist/ss6player-pixi.js`があるフォルダと同一階層に配置すればいい様だ。SDKから生成された`dist`ファイルの`@types`フォルダの中身を丸ごと1階層上に配置すればいいって感じか。  
やってみると無事に型エラーが消えた！良かった良かった…。  
ただ、`@types`フォルダの中身を移動したりと色々面倒が多い…`ss6player-pixi.js`ファイルをローカルnpmパッケージ化すれば早いかなぁ。

---
ここから2021/07/18

サンプルコードを書いていくと、なぜか下記の様なエラーにぶち当たった…。

```
ERROR in src/components/AnimationTest.vue:40:26
TS2345: Argument of type 'SS6Player[]' is not assignable to parameter of type 'DisplayObject'.
  Type 'SS6Player[]' is missing the following properties from type 'DisplayObject': sortDirty, parent, worldAlpha, transform, and 72 more.
    38 |       // mySS6Player.position = new PIXI.Point(320, 480);
    39 |       // mySS6Player.scale = new PIXI.Point(0.5, 0.5);
  > 40 |       app.stage.addChild([mySS6Player]);
```

TypeScriptとPixi.jsのを導入するときに入れた参考記事にあった「V5にするとエラーなく実行できる」というのをスルーしてたからかも。  
https://qiita.com/t_furu/items/042f2d8f4cbcf8056b8c  
実際、筆者のこの時点でのプロジェクト内のPixi.jsは`v6.0.4`だし、SS6PlayerForWebリポジトリで使用されていたPixi.jsは`v5.3.10`だった。  
ちなみにPixi.jsのリリースノートを見ると、最新の安定バージョンは`v5.3.10`。大人しくこちらにしてどうなるかみてみよう…。  
https://github.com/pixijs/pixijs/tags

すると先のエラーは出なくなったが、起動すると下記の様なエラーが:  
<img width="1236" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/12.jpg?raw=true">

「お使いのブラウザはWebGLをサポートしていません」と出る…そんな、最新版のChromeでそんなバカな。  
試しにElectron内部でhttps://get.webgl.org/ にアクセスしてみたが、無事にWebGLの内容が出てくれた。  
<img width="1602" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/13.jpg?raw=true">

Githubで同様の事象がないか調べたが…どうもMacOSだと「ハードウェアアクセラレーションをONにしないと」当該エラーが出るらしい。  
https://github.com/pixijs/pixijs/issues/5694#issuecomment-498629435  
以前モルカーデスクトップマスコットを作った際、MacOSだと背景が透明にならなかった対処方法として「ハードウェアアクセラレーションをOFFにする」ソースコードを仕込んだが…これが裏目に出たらしい。

ここのソースコードをコメントアウトすると、無事にPixi.jsの画面が出た…が、またもエラー。もーやんなっちゃうぜぇ。  
<img width="762" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/14.jpg?raw=true">

どうもSS6Player側のエラーっぽい。アニメーションデータの`partsLength`が空っぽい…?  
筆者が作ったサンプルプロジェクトのデータが悪いのかなと思い、SS6PlayerForWebリポジトリ内部のサンプルデータを使用してみた…が、結果は同じ。

実際にエラーが発生したソースコードを見てみる。エラー発生箇所は`ss6player-pixi.js`内部の下記のコードの様だ。

```js
/**
   * パーツの描画モードを取得する
   * @return {array} - 全パーツの描画モード
   */


  SS6Player.prototype.GetPartsBlendMode = function () {
    var l = this.fbObj.animePacks(this.parts).partsLength(); // ここでエラー
    var ret = [];
    var animePacks = this.fbObj.animePacks(this.parts);
```

ここでコメント内にある「パーツの描画モード」というのが気になった。おそらくだが、この設定値はSpriteStudio上の下記の項目のことを指している様に思える…。  
<img width="1115" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/15.jpg?raw=true">  
ここを変えてあげればうまくいくかと思ったけど、サンプルプロジェクト上で現デスクトップマスコットプロジェクトで使っているサンプルデータを使用しても何もないんだよね…これは原因違うかも。

その後はサンプルプロジェクトのコードと、Electronプロジェクト上のコードをChrome DevToolsでトレース。するとサンプルプロジェクトとの相違点が。  
サンプルプロジェクト上では、animePacksという関数内で呼び出されている内容はこんな感じだが:  
<img width="1820" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/16.jpg?raw=true">

Electronプロジェクト上ではこんな感じになってる:  
<img width="1358" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/17.jpg?raw=true">  
index番号が-1になっててちょっと怪しい。

さらにこの中の、`this.bb__offset(this.bb_pos, 14);`という行を掘ってみると、サンプルプロジェクト上ではこんな感じだが:  
<img width="742" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/18.jpg?raw=true">

Electronプロジェクト上ではこんな感じになってる:  
<img width="629" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/19.jpg?raw=true">

…この時点で何となく、「アニメーションデータを読み込めてないからこうなっているのでは…?」と推測。  
これまで`src/assets`に配置していたアニメーションデータを`static`に配置してみたが、それでもダメ。

試しに、`const mySS6Project = new SS6Project(ssfbFile, onComplete);`で宣言できる`SS6Project`のオブジェクトを展開してみると、思わぬ発見が。  
サンプルプロジェクト上ではこんな感じだが:  
<img width="1566" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/20.jpg?raw=true">

Electronプロジェクト上ではこんな感じになってる:  
<img width="1284" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/21.jpg?raw=true">

`resources`の`box_00_00`が読み込まれてないっぽい! やはりアニメーションデータが読み込まれていないという線は強そうだ…。  
おそらくstatic以下に配置するだけでは、静的ファイルとして読み込まれないのだろう。検索しても「静的な画像を配置する方法」が出るばかりで、それ以外のファイルの配置方法がわからない…。Electron×Vueという状況で、画像に関わらず静的なファイルを設置するにはどうするか見てみることにする。

色々探していると、やはりstaticフォルダに配置するのがよさそうだ…。  
https://webpack.electron.build/using-static-assets  
…と思ったが、どうもElectron×Vueプロジェクトにおいては`static`フォルダ=`public`フォルダ?の様だ。  
とりあえず、`public`フォルダ直下に画像を配置することでVueコンポーネント内部で`<img src="/app.png" />`と表示するのが可能ということはわかった。

それじゃあ後はこれをアニメーションデータにも適用するだけ…。  
`src/assets`内部に配置していたアニメーションデータを`public`直下に移動し、パス指定をこんな感じに変更:

```js
    // Initialize SS6 Project (json file path)
    // ssbpをコンバートしたjsonファイルを指定
    const ssfbFile = "/animation/SampleProject/SampleProject.ssfb";
```

…うまくいった! サンプルプロジェクトと全く同じ値…! ここまで長かった｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡  
<img width="1046" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/22.jpg?raw=true">

…と思いきや、またしてもエラー。  
<img width="1030" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/23.jpg?raw=true">

どうもこちらはPixi.js側のエラーの様だ。  
幸いにもGithubのIssueに同様の現象とその解決方法があったので試してみる…。  
https://github.com/pixijs/pixijs/issues/6171#issuecomment-619507968  
`node_modules`を全部削除、`yarn-lock`ファイルを削除、再度`yarn install`してみたがうまくいかない。  
上記のGithubのIssueには「Pixi.jsをv5.1.5->v5.2.3にした」とあったので、こちらも倣ってみることにする…多分治らない気もするけど…。  
…はい、やはり治らなかった。

調査していくうちに「SS6Playerが原因なのか」「SS6Player×Pixi.jsに原因があるのか」「Pixi.jsをElectron×Vueで動かしていることに原因があるのか」わからなくなってきた。  
なので一旦、SS6Player系の処理をコメントアウトして再実行してみる。  
…そうすると、Pixi.jsのエラーは出ない。やはりSS6Playerが原因なのかも…。正確には、SS6Player内部で恐らく使用しているPixi.jsの使い方に原因があるかも…。

ここで気になるのが、やはりサンプルプロジェクトではうまくいってること…。サンプルプロジェクトでは、index.html内部に直接scriptタグでPixi.jsを読み込んでいる。  
それに対し、当プロジェクトではPixi.jsはnpmモジュールとして読み込んでいる。これが原因か…?

実際、出力されたSS6PlayerForWeb内部にあるTypeScript型定義ファイルでは`/// <reference types="pixi.js" />`という行があったが、これはどうも「ブラウザで個々のjsがscriptタグで読み込まれるケースを想定」して書かれたものの様。  
参考: https://qiita.com/ousttrue/items/8bd21094cb7b58d2a016#%E5%86%85%E9%83%A8%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%ABinternal-module  
なので、ここを`import * as PIXI from "pixi.js";`にしてみることにする。対象ファイルは`SS6Player.d.ts`と`SS6Project.d.ts`。  
…これだけではダメっぽい。

なら、SS6PlayerForWebのライブラリファイル出力にまで遡ってみる…。  
案の定、`SS6Player.ts`と`SS6Project.ts`の先頭行の`import * as PIXI from "pixi.js";`がコメントアウトされてた。これを有効化し再度ビルド、`/dist`フォルダ内に格納してみる…。  
…それでもエラーが消えない…!!

…ちなみに、SS6PlayerForWebのCommit Logを見ると、「ss6player-pixi doesn't contain pixi.js import logic」…つまり「ss6player-pixiはpixi.jsのimportロジックを含まない」と明示的に書かれていた。なぜそうしたのだろう…(震え)  
https://github.com/SpriteStudio/SS6PlayerForWeb/commit/70960ed2c3a5937805be3619cabb04ba29537d72#diff-f8fa699485ea18515cc80e3eff5c0a245d64ccb9c75b2712900a734b2a15aa2a  
とりあえずこれが原因だと個人的に確信はできた。サンプルプロジェクトとのpixi.jsの相違点これくらいしかないんだもん…。ただ解決方法が思いつかない…。

一息置いて考えてみたら、これって「VueプロジェクトにjQueryを混ぜ込む」状況と似てるのではと感じた。  
jQueryってscriptタグで読み込まれるのが主流だが、これをVue.jsと組み合わせるときの状況と似ているのでは…。  
jQuery×Vueの参考記事ならたくさんあるかもしれない! と希望を持ち、やり方を模索してみる。
…が、無理そうっすね…。

希望を失っていた中彷徨っていると、何とVue×Electron×Pixi.jsで色々やってみた系の記事が!  
https://www.bilibili.com/read/cv11041094  
まさかあるとは…中国語の記事だったので見逃してたかも。最近、技術調査してると中国圏の記事がちょいちょい見かける様になったな〜と感じるので…技術単語だけ並べたら(今回であれば「electron vue pixi.js」みたいな感じ)こういった記事もヒットするし、今後はこうした調査方法にしてみようかな。

上記記事を見てみると、onMountedの段階でPixi.jsを発火してた…そうか、DOM操作でPixi.jsオブジェクトを追加するからonMountedじゃないと発火しないよね…orz。  
処理を丸ごとonMounted内部に入れたらあっさりうまく…いかず。またもサンプルプロジェクトと見比べますか…`mySS6Player`辺りを見比べるといいかもなぁと思いつつ。

どうしたもんかなぁ…と彷徨いながらなぜかPixi.jsのバージョンを「v6.0.4」にすると…。  
なんと！！！表示された！！！！！  
<img width="807" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/24.jpg?raw=true">
(正直なんでうまくできたかよくわかんない)

実はこれに付け加えて、上記に述べたこれ:  
>…ちなみに、SS6PlayerForWebのCommit Logを見ると、「ss6player-pixi doesn't contain pixi.js import logic」…つまり「ss6player-pixiはpixi.jsのimportロジックを含まない」と明示的に書かれていた。なぜそうしたのだろう…(震え)  
https://github.com/SpriteStudio/SS6PlayerForWeb/commit/70960ed2c3a5937805be3619cabb04ba29537d72#diff-f8fa699485ea18515cc80e3eff5c0a245d64ccb9c75b2712900a734b2a15aa2a

…の修正をSS6PlayerForWebリポジトリから打ち消し修正を行ない、それをビルドしたものをライブラリとして使用する様にもしたのだ。これがうまくいった原因…かなぁ。  
具体的には下記の修正を行なった:

- `SS6PlayerForWeb-develop/packages/ss6player-pixi/src/SS6Player.ts`, `SS6PlayerForWeb-develop/packages/ss6player-pixi/src/SS6Project.ts`の最初の行にある`//import * as PIXI from "pixi.js";`をコメントアウトしないようにする
- `packages/ss6player-pixi/tsconfig.json `内にある下記の記述を削除 or コメントアウトする:
  - `"node_modules/pixi.js/pixi.js.d.ts",`
  - `"types": ["pixi.js"]`

何にせよ、非常に記念すべき時…!　ひとまずCommitは済ませておいた。  
https://github.com/aik0aaac/angela-desktopMascot/tree/6dc033b2d98fc3a4288aa7df9e87d7564109d946  
…ただ、デバッグ中に色々いじっちゃったせいで一時的にデスクトップマスコットになってない箇所も多々あり…コードも汚いし…。

また、現段階ではSpriteStudioのアニメーションデータを表示できるだけであって、例えばアニメーションの切り替えとか「セリフと一緒にアニメーションを再生」とかみたいな柔軟な操作のやり方がわからない。  
この辺りのやり方ぐらいはつかんでおいて、それからUIを決めたり機能考案する方がいい気がする…。  
というわけで、次は上記2点を何とかしていこう:

## コードの整備
特筆すべき点のみ記載していく…。

Pixi.jsのバージョンを上げたことで、アニメーション再生用コードに記載していた下記:

```js
    mySS6Player.position = new PIXI.Point(320, 480);
    mySS6Player.scale = new PIXI.Point(0.5, 0.5);
```

 …がエラーを吐く様になった。  
どうも`PIXI.Point`ではなく`PIXI.ObservablePoint`に変わったらしい。  
しかも、第1引数&第2引数にx, y座標以外のものが必要になったっぽい…面倒だなぁ。  
ひとまず下記の様に記載することで何とかなった。

```js
    mySS6Player.position = new PIXI.ObservablePoint(
      () => {
        return {};
      },
      1,
      AppConfig.windowScreenWidth / 2,
      AppConfig.windowScreenHeight / 2
    );
    mySS6Player.scale = new PIXI.ObservablePoint(
      () => {
        return {};
      },
      1,
      0.5,
      0.5
    );
```

これまでのコードだと、Pixi.js表示エリアは都度都度`document.body.appendChild`して表示していたが、これだとローカル環境でリロードした際にPixi.js表示エリアがその都度生成されてしまうことになった…。  
現状Pixi.js表示エリアはコンポーネント内部で表示させているので、出来れば「コンポーネントがリロードor消えた時にはPixi.js表示エリアも一緒に消えてほしい」。  
なので、Vue.jsのライフサイクルフックの`destroy`の手前(Vue3だと`onBeforeUnmount`)でPixi.js表示エリアを削除しておくコードを作った:

```js
export function animationDestroy(): void {
  if (app) {
    app.destroy();
  }
  app = null;

  const target = document.getElementById("animation-area");
  while (target?.firstChild) {
    target.removeChild(target.firstChild);
  }
}
```

Pixi.jsに削除用のメソッドが用意されてて良かった…というかまぁ用意されてないとね。

## どんなことができるかPoC
…しようと思ったが、やるからには「どんなことをしようと思っているのか」を考えないと行動が起こせないことに気づく。  
ここまでプログラミングの四苦八苦あって疲れたし、PoCスキップして楽しいUIや機能考案を先にやっちゃおうそうしよう。  
ということで「SpriteStudioのサンプルコードを元にElectronにバインド、いけそうか検証」、完了!!!!!

# デスクトップマスコットのUIや機能考案
- 2021/07/21開始
- 2021/07/22完了

---
ここから2021/07/22

とりあえず現状で考えている案や内容をまとめてみた:  
<img width="1536" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/25.jpg?raw=true">  
<img width="1536" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/26.jpg?raw=true">  
<img width="1536" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/27.jpg?raw=true">  
<img width="1536" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/28.jpg?raw=true">

字がかなり汚い…まぁ自分が分かればいいのさ。  
デスクトップマスコットについてググってみると、他にも色々機能を持たせているケースも多いが…。→Google画像検索: https://www.google.com/search?q=%E3%83%87%E3%82%B9%E3%82%AF%E3%83%88%E3%83%83%E3%83%97%E3%83%9E%E3%82%B9%E3%82%B3%E3%83%83%E3%83%88+%E6%A9%9F%E8%83%BD&tbm=isch  
Twitter連携はTwitterAPIの対応が大変だし、時刻表示はタスクバーにあるやろって感じだし…どうもLoRのデスクトップマスコットにするにはいいかな〜って感じたので、一旦はなしにする。というかこの時点で機能盛り込みすぎだしね…。完成するだろうか…。

まぁこの段階は夢を考える段階だからね。多少盛ってもOKOK(たぶん)。  
…ただ、もう〆切まで少ししかないのである程度の機能は削った状態でリリースしないとな。

お次はアバター作成…ひとまずアンジェラ様のアバターから作ってみよう。

# アンジェラ様アバター作成
- 2021/07/22開始
- 2021/07/完了

アバターの絵柄は迷ったが、LoRのミニキャラをベースに少しアレンジした様な雰囲気にしてみる。アークナイツのミニキャラとLoRのミニキャラを足して2で割る感じで作りたいな…。  
LoRのミニキャラを参考にするべくアンジェラ様のWikiページを見にいったら失楽園のアンジェラ様に見惚れて作業が止まる…いかんいかん。

画像サイズは…どうしようかな、デスクトップの大きさから算出しようかな…。  
WindowsPCとMacOSPCに合わせて作る予定なので…。  
WindowsPCは1920*1080pxのデスクトップサイズを元に考えるでいいかな。MacOSは…手持ちの5年前くらいのMacbookProだと画像解像度は2880*1800px。うーんでかいねんな…さすがRetinaディスプレイ。  
もう脳死で1000*1000pxにしよかな…うんそうしよう。

絵柄の参考にWikiアンジェラ様とアークナイツ絵柄を見比べ…。  
アークナイツの絵柄は足と手が長くて、手のひら大きく足は先太りでかわいいねんな。  
<img width="1291" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/29.jpg?raw=true">  
<img width="1284" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/30.jpg?raw=true">  
画像引用: [アークナイツ](https://www.arknights.jp/)のプレイ画像をスクショしました

素体をこんな感じに:  
<img width="488.5" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/31.jpg?raw=true">

下書きはこんな感じになった。  
<img width="489.5" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/32.jpeg?raw=true">  
にしてもこんなにLOG取りながら絵を描くの初めてねんな…。

お次は線画…だが、今回はアニメーション用に動かすための画像素材。  
後からパーツごとに切り出すことがわかっているので、せっかくだしそれを考慮しながら楽に描きたい…が、最初からそうだとわかっている画像素材を描くのは初めてでどうしたもんか…。  
ひとまず「まつ毛」「前髪」といったパーツごとに線画を分けて描いてみる。

とりあえず線画完了。目の部分はテスト的に塗ってみた感じ。  
線画がいくつも重なっているが、これははみ出ることを考慮してそうしたもの。さてここからは色塗りとなる…。  
<img width="586.5" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/33.jpg?raw=true">

パーツ分けを行いながら色塗り。慣れればどうってことないかもしれない。  
むしろ完成時点でパーツ分けもできているし、またパーツ分けして違和感ない様な塗り方を意識できるからいいかもしれない。  
今回はパキッとした塗りを意識。パーツ間で分かれそうな箇所にグラデーションは使用しない形で…。  
<img width="507" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/34.jpg?raw=true">  
※↑実は結構な数のパーツに分かれている

後は出力、SpriteStudioで使用可能なメッシュ画像に変換しよう。  
テクスチャ画像生成は専用ツールがあるらしいのでそれを用いる。  
https://qiita.com/KINGREGION/items/aefbbe137a1efa9f5ce1

上記記事を参考に、レイヤーをパーツごとに結合し、レイヤー名を英名に(次は英名でフォルダを記載しよう…)  
。そして第1階層に全てのレイヤーを配置しPSD形式で別名保存…。  
そこから、上記記事を参考にここから: https://github.com/SpriteStudio/PSDtoSS6/releases/tag/v2.2.1  
PSDtoSS6をDL&インストールし、起動。SS6Converterの件があるのでWindowsでやった方が安全かもだが、一応MacOSでやってみる…。

起動は無事にできた。  
<img width="683" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/35.jpg?raw=true">

後はコンバート処理が正常にできるかどうかだね…。ここからの手順は公式のWiki記事を参考にしていこう。  
https://www.webtech.co.jp/help/ja/spritestudio/guide/tool/psdtoss6/

手順通りにして…なんと、出力は無事に行えた!!  
<img width="675" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/36.jpg?raw=true">  
<img width="494" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/37.jpg?raw=true">  
ファイル名に全角文字が入っていてもOKみたいね。ただ、プログラム上で扱いにくいから半角文字にしておこう…。

ちなみに出来上がったスプライト画像はこんな感じ:  
<img width="2048" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/38.jpg?raw=true">  
綺麗に詰め込んでくれるもんですなぁ…いやぁありがたい。

出来上がった.sspjを開いてみると…。  
<img width="1375" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/39.jpg?raw=true">  
**素晴らしい!!!!** これはアニメーション作成捗る…! すぐにでも作業に移れますわ。  
でもその前に、プロジェクト設定から「再生対象のプラットフォーム」を「SS6PlayerForWeb」に変更しておく。これで準備完了だ!

…と思ったが、目のパーツを左右で分けるのを忘れていた…。  
わけ直して再度PSDtoSS6にかけ、再出力。これでヨシ!  
にしてもプログラミングはあそこまで苦戦したが、イラスト描きは多分3〜4時間くらいでできてしまったな…やはり自分は絵描きの方が慣れてるんだなぁ。

# アンジェラ様アニメーション作成(仮)
- 2021/07/22開始
- 2021/07/24完了

ここからはアニメーション作成。  
まずは静止モーションを作ってみよう。

静止モーションは:

- 目ぱち
- 呼吸に伴う上半身上下
…ができれば最低限だと感じている。
できれば:
- 呼吸に伴う腕、足が若干開く動作
- 髪揺れ

…までできるといいが、流石にいきなりここまではきつい。ひとまず上記2つを目指していこう。

## 目ぱちモーションお試し作成
とりあえずは目ぱちから。Live2dの目ぱちの様な形で、上瞼をメッシュ変形して覆い隠視変形するイメージで目ぱちを作ってみよう。  
メッシュ変形にはこちらの公式Helpを参照にしてみる…:   
https://www.webtech.co.jp/help/ja/spritestudio/guide/meshbone/howtouse/#make_mesh_cellmap  
…が、よくわからなかったのでサンプルデータを見て研究することに。…でもわからなかったので、デフォーマ機能の公式helpを参考に、メッシュ機能の使い方をなんとか理解できた。  
https://www.webtech.co.jp/help/ja/spritestudio/guide/meshbone/deform/

まず**Setup選択状態で**、セルリストからメッシュ変形させたいパーツを選択する。  
そうするとこんな画面が開く。Live2d御用達の方にはお馴染みの画面だろう。  
<img width="802" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/40.jpg?raw=true">

ここではメッシュの割り振りを行う。Live2dよろしく自動での割り振りもできるが、自動だと少々やりにくいメッシュ割り当てになることもあるので筆者は「自動割り当て」→「マニュアル割り当て」をやる様にした。  
こんな感じで割り当てをしたら:  
<img width="493" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/41.jpg?raw=true">

閉じるボタンを押す。すると「変更を適用しますか?」というダイアログが出るので「はい」を選択。
すると、メッシュが適用される…が、Setupのキャラ上には「メッシュ適用されたセルはレイアウト画面上には反映されない」。  
※赤く表示されているのがメッシュ適用されたセル。だが、今回適用した「righteyelash_upper」のセルは表示されていない。  
<img width="301" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/42.jpg?raw=true">

これがイマイチなところで、どうも「メッシュが適用されても、既存で表示されている「righteyelash_upper」のセルにメッシュが適用される」というわけではないらしい。  
白く表示されている「righteyelash_upper」のやつは、メッシュ適用前のセルなため、このままではせっかく割り当てたメッシュ適用後の画像をいじくれないのだ。

なので、メッシュ適用後のセルをSetupのレイアウト上に登録する必要がある。  
白く表示されている「righteyelash_upper」のX座標、Y座標、優先度を覚えてから:  
<img width="1156" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/43.jpg?raw=true">

白く表示されている「righteyelash_upper」をフレームコントロールから消し、メッシュ適用した「righteyelash_upper」をレイアウト画面にドラッグ&ドロップ。そしてX座標、Y座標、優先度を適用し、元の位置に戻す。

すると、赤く表示された「righteyelash_upper」が出てくるので、これでOK。  
<img width="896" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/44.jpg?raw=true">  
先ほどメッシュ割り当てした際の線が、うっすらと白く絵の上に表示されているのがわかるだろうか…。こうなっていたらSetup側での対応は完了。

お次はいよいよ動かしていく。  
まずはウィンドウ上部の「デフォーム編集」アイコンをクリックし、メッシュを表示させる。  
<img width="895" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/45.jpg?raw=true">

アニメーションを選択し、フレーム0の地点でキーを作成し初期位置を登録させる。  
<img width="1122" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/46.jpg?raw=true">

この時**アトリビュートから「デフォーム」という所にチェックを入れること。**  
<img width="1110" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/47.jpg?raw=true">  
こうしないと、初期位置のメッシュ変形内容が保持されない。…ここもわかりにくいポイントなのでお気をつけて。

後は目を閉じたいフレームにキーを作成し:  
<img width="893" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/48.jpg?raw=true">

Ctrlキーを押しながらまとめて点を選択し:  
<img width="896" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/49.jpg?raw=true">

一気に下側まで持っていって:  
<img width="651" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/50.jpg?raw=true">

微調整すれば完成。  
<img width="748" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/51.jpg?raw=true">

目ぱち完成! 分かれば意外とあっさりできた。  
<video controls width="480" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/52.mp4?raw=true"></video>

ここまで2時間程度かかったが、メッシュ機能はだいぶ使いこなせる様になったかも。  
ちなみにアニメーションの補完方法は全て「減速」にするととてもいい感じで目ぱちしてくれた。線形だとどうしても機械的に目ぱちしている感じになるのでね…。

お次は「呼吸に伴う上半身上下」…と思ったけど、現状のアンジェラ様の画像だと右腕の肩部分が胴体部分に覆い被さっているので、これをなんとかしないといけない。  
それだけじゃない…待機中やトークする際のアニメーションにて小物を使用したいと考えているが、それも今のうちにセルマップ上に入れておいた方がいいだろう。  
そうでないと、小物を追加する段階で、これまで作ったメッシュ割り当て等が全てリセットされてしまうことになる…今の段階から、どんな風なアニメーションをさせるかを検討しておいた方が良さそうだ。  
とりあえずアンジェラ様のみのアニメーション内容を考案してみよう。

## アニメーション内容考案
- 静止モーション: そっぽを向いてるがこちらを向き、目ぱちしながらゆっくり呼吸、またそっぽを向く→繰り返し、本は持ったまま
- 待機モーション: 椅子に座り本を読んでる、ページめくりは無し
- 移動モーション: 普通に移動
- 初回モーション: 指パッチンしながら目を閉じつつ横からスッと登場、本は持ってる。目を開けこちらを見てから静止モーションの姿勢に
- クリックモーション: 目を閉じ体を少しかがめる、その後「何?」というジト目でこちらを見る、その後は静止モーションの姿勢に
- ドラッグ&ドロップモーション: 腰あたりで持ち上がるような姿勢

トークモーション…は、正直ライトに済ませたい。  
上記のモーションを含め、現状のデータに下記を追加し、それでできる範囲の差分でなんとかしよう。

- 右腕、左腕が一本になっているのを真ん中で分離
- 手の差分追加:
  - やんわりとした握り拳（自然体）-default
  - 開いた手(ひらひら手を振ったり、頭に当てて呆れたポーズをする時に使える手)-open(右のみ)
  - 握り拳-grip
  - 指パッチンの手(左手のみ)-crack
- 本を両手で持ち開いた状態の腕差分
- 小物追加…アンジェラ様が座る用の机

## アニメーション差分追加用イラスト描き
---
ここから2021/07/23

分離作業をやってみているが、想像以上に分離作業は時間がかかる…。  
腕だけでもこんなに時間かかるのだ、パーツごとにイラストを描く方式を採用していたのは本当に良かった。

ひとまず全てのパーツ追加完了。パーツ追加だけで1時間30分程度はかかったね…。  
<img width="771" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/53.jpg?raw=true">

PSDtoSS6にかけてまたも生成…こんな感じのセルマップができた。  
<img width="2048" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/54.jpg?raw=true">

それではモーションを作っていこう!

## アニメーション作成
まずはトーク内容以外のモーションを作っていこう。  
下記の様な形で進め、トーク機能については一旦後回しで実装してみる…。

- トークモーション以外のモーション作成
- Electronプロジェクト上でバインド、モーション動かしてみる
- 実装@トーク機能以外
- トーク内容考案、トーク用モーション作成
- トーク機能をデスクトップマスコットに実装

トークモーション以外のモーションとしては下記になる、これらを作り込んでいこう。

- [ ] 静止モーション: そっぽを向いてるがこちらを向き、目ぱちしながらゆっくり呼吸、またそっぽを向く→繰り返し、本は持ったまま
- [ ] 待機モーション: 椅子に座り本を読んでる、ページめくりは無し
- [ ] 移動モーション: 普通に移動
- [ ] 初回モーション: 指パッチンしながら目を閉じつつ横からスッと登場、本は持ってる。目を開けこちらを見てから静止モーションの姿勢に
- [ ] クリックモーション: 目を閉じ体を少しかがめる、その後「何?」というジト目でこちらを見る、その後は静止モーションの姿勢に
- [ ] ドラッグ&ドロップモーション: 腰あたりで持ち上がるような姿勢

### 静止モーション
まずは最も単純な静止モーションから。  
先にも記した様に、下記を作り込んでいく…:

- 目ぱち
- 呼吸に伴う上半身上下
- できれば:
    - 呼吸に伴う腕、足が若干開く動作
    - 髪揺れ

プロジェクトを起動させ、とりあえず不要なパーツを非表示&Lockし編集できない様ににしてみる。  
<img width="735" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/55.jpg?raw=true">

目ぱちは前述の通りあっさりできたので、お次は「呼吸に伴う上半身上下」。  
…としようとしたけど、「呼吸に伴う腕、足が若干開く動作」の方が簡単かもなってことでこちらを先にやってみる。

今回作ったアンジェラ様のやつは、肘を境に腕が上下に分割されているので…。腕を若干開かせるためには、上下に分割されている腕たちを一緒に動かしていく必要がある。  
となると、上側の腕と下側の腕で、グルーピングして一緒に動かせる様にしたい…というところで、SpriteStudioでのパーツのグルーピング方法を見てみよう。

どうもSpriteStudioでのグルーピングという概念は「親子関係」というものになるっぽい。  
https://www.webtech.co.jp/help/ja/spritestudio/guide/tips/general/data_ownership/  
親子関係を作るには、Nullパーツを作りそこに入れていく必要がありそう…ってことで、Nullパーツを活用してみる。  
https://www.webtech.co.jp/help/ja/spritestudio/guide/tips/nullparts/

…と思ったが、ここで問題点発生。
- 腕(Nullパーツ)
    - 上腕
        - 下腕
            - 手

…という様な形で親子関係を作ってみたところ、パーツがずれてしまった。  
<img width="874" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/56.jpg?raw=true">

各パーツのX座標やY座標はそのままなので、値が書き換えられたわけでもなさそう…。  
ここからは筆者の見解だが、おそらく各パーツのX座標やY座標は「親パーツを元とした相対位置」が指定されるのかなと。  
これまでは、各パーツは全てRootというNullパーツに紐づいており、このパーツにはX座標やY座標は初期値が入っているので問題なかったが…。  
上腕はX座標やY座標は初期値ではないので、下腕をその子供にすると「上腕のX座標やY座標を基準とした相対位置」に移動されたんじゃないかなと…。

ともあれ、これでは困るので一旦:

- 腕(Nullパーツ)
    - 上腕
    - 下腕
    - 手

…という階層にしてアニメーションを作ることにする。  
<img width="837" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/57.jpg?raw=true">

これで、腕(Nullパーツ)を回転させることで他の腕を追従することができた!  
<img width="526" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/58.jpg?raw=true">

…が、ここまでやって薄々感じたのが「本当にこの調子でアニメーションを作って大丈夫か」という不安になった。家族に相談すると「参考になる記事くらいあるんじゃない?」とアドバイスをもらえ、早速記事を漁ってみると…。  
Spineの記事だが、メッシュとボーン、ウェイト機能を組み合わせてキャラの動きを作ろうという記事を発見した。  
https://nijibox.jp/blog/usespine/#i-2  
なるほどこういう考えで作ればいいのね…これだと、動きごとにメッシュを割り当てずに済むから楽に済むかも。ボーンという概念はLive2dにはなかったから目から鱗だねぇ…。

そしてさらにSpriteStudioでボーン、メッシュ機能のチュートリアル動画を発見。  
https://youtu.be/WXoaR4R0f0E

そこでは目から鱗な情報が…。  
<img width="2532" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/59.jpg?raw=true">  
<img width="2532" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/60.jpg?raw=true">  
<img width="2532" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/61.jpg?raw=true">  
画像引用: https://youtu.be/WXoaR4R0f0E こちらの動画をキャプチャさせていただきました

…どうやら自分は根本の考え方を改めてもいいかもしれない。  
目ぱちはメッシュで良かったかもだが、腕や髪の動きはボーンメッシュを組み合わせて行おうっと。

というところで、まずは作った右腕をボーンで動かすところから。  
こんな感じでボーンを作り:  
<img width="382" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/62.jpg?raw=true">

ウェイトもこんな感じにしてみた:  
<img width="412" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/63.jpg?raw=true">

そうすると…アニメーションパートでこんな複雑な動きもできる様に…!!  
<img width="423" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/64.jpg?raw=true">  
これが手軽にできるのは本当に素晴らしい…_:(´ཀ`」 ∠):

せっかくなので、この調子で他のパーツもメッシュ化&ボーン割り当てしていく。  
何回かやって、効率の良いメッシュ化&ボーン割り当て方法もわかってきたので、下記にメモしていこう。

まず「メッシュを当てたいパーツを選択した状態で」「ジョイントパーツの追加」からジョイントパーツを生成する。  
こうすると、メッシュを当てたいパーツの直下にジョイントパーツが生成される。ジョイントパーツ適用後は、後から既存のパーツは削除するのでわかりやすい。  
<img width="883" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/65.jpg?raw=true">

その後はメッシュ化したいセルで右クリック→「メッシュ編集」をクリック。メッシュ編集画面が開く。  
<img width="802" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/66.jpg?raw=true">

メッシュ編集画面にて「Autoモードでメッシュを自動割り当て」する。  
<img width="796" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/67.jpg?raw=true">

この時点だと操作しにくいメッシュが高確率で生成されるため、「Manualモードに切り替えて」頂点や分割点を追加する。  
※デフォルトだとオートでメッシュ設定後は自動的にManualモードになっている。  
頂点を追加したいときは「マニュアル>種類>頂点」にチェックを入れた状態で画面をクリックすると追加されるし、分割点を追加したいときは「マニュアル>種類>分割点」にチェックを入れた状態で画面をクリックすると追加される。  
こんな感じで微調整したらOK(大体は軽微な微調整で済む)。  
<img width="805" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/68.jpg?raw=true">

ウィンドウを閉じるボタンを押し「適用しますか?」ダイアログにて「はい」を選択。  
次に、作ったメッシュセルを先に追加したジョイントパーツに属させる。  
<img width="270" src="hhttps://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/69.jpg?raw=true">

…ここで一旦、メッシュセルをジョイントパーツから外させて:  
<img width="256" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/70.jpg?raw=true">

ジョイントパーツを「ボーンを組み立てたい箇所の頂点に配置し直す」。  
<img width="883" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/71.jpg?raw=true">

そして改めて、メッシュセルをジョイントパーツに属させる。  
<img width="270" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/72.jpg?raw=true">  
ジョイントパーツを配置した後にメッシュセルを配置してしまうと、ジョイントパーツが動いた分メッシュセルもずれてしまうので、それの対策としてこの様な順序を踏む。

後はジョイントパーツを選択し、好きなだけボーンを追加して…。  
<img width="416" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/73.jpg?raw=true">

メッシュセルを選択した状態で、レイアウトウィンドウの「ウェイトの再設定」をポチッと押すと、ウェイトが指定される。  
<img width="861" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/74.jpg?raw=true">  
後は元々配置されていたメッシュセルじゃないパーツを消して、これでOK!

メッシュ化の中で期待大だった目ぱち部分をやってみたが…。  
どうもボーン変形だとボーンの形に左右されすぎるためか、綺麗な目ぱちがやりにくい…。  
<img width="252" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/75.jpg?raw=true">

解決するにはボーンをたくさん仕込めばいいが、それだとアニメーションする際にボーンをいちいちちまちま回転させていくのは面倒になる…。  
悩んだが、ここの部分はメッシュ変形で乗り切ることにした。

なんとか全てのパーツのメッシュ割り当て&ボーン割り当て完了!  
<img width="285" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/76.jpg?raw=true">  
いやぁボーンだらけになりましたな…でもだいぶアニメーションは作りやすくなってる気がする。  
次からはいよいよ実際にアニメーション作成だ!

---
ここから2021/07/24

コツとかモーションのやり方とかいーっさいわからないど素人だが、アークナイツの基地内のキャラモーションを参考になんとかできた。  
<img width="1000" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/77.gif?raw=true">  
目の移動ありで作ったが、目の移動ありが静止モーションとしてずーっと流れているのは落ち着かない人っぽいので…(アンジェラ様はお淑やかな女性だからﾈ)。

目の移動なしバージョンも作った。目の移動ありを挟みながら、この目の移動なしバージョンを垂れ流す感じでいいかな〜と。  
<img width="1000" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/78.gif?raw=true">

少し1ループが短く、忙しなく動いている感じになっているが…。これは再生するタイミングで、スロー再生する形でやれたらと思う。  
というのも、1ループを長くするとタイムラインが1画面に収まらずスクロールする手間がね…。増えちゃうからね…。  
<img width="939" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/79.jpg?raw=true">

もしスロー再生できなかったら、エクスポートする時だけフレーム数を多くして出力すれば万事OKかなと。

にしてもボーン割り当てのおかげで、Live2d時代より遥かに早くアニメーション作成ができた!  
今回のモーション作成は、ボーンの移動やキーフレームの登録作業とか初めての作業が多かった中でも1時間30分くらいで上記のモーションが作れた。これをLive2dでやるとしたらと思うと…ぞっとするねぇ。

ただ、ボーンを割り当てすぎた箇所のせいでアニメーション作成に時間がかかったり等はあった。  
例えば腕や足のパーツは、関節部分で分けてボーンを作るだけで十分。布みたいに滑らかに動かしたい部位でもないしね。  
例えば、下記の右足の様に細かくボーンわけをするとすごくアニメーションさせづらくなる。左足の様に、関節部分にどどんと大きなボーンを埋め込むだけで十分なのだ。  
<img width="386" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/80.jpg?raw=true">  
この辺りの経験は、次回のボーン割り当ての時に生かしたいなぁ。

アニメーション作業の中で一番大変だったのは髪の調整。他のパーツよろしく「単に左右に揺らすだけ」では、なーんか違和感のある動きになったので…。  
一旦キーを打ち込んだのち、下記の様にキーの位置をランダムにずらして作ってみた。  
<img width="929" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/81.jpg?raw=true">  
おかげで少し動きのあるモーションができた…?　気がする。

お次は移動モーション。動かし方もわかってきたし、そこまで大変ではない気が…するがどうだろうね。

### 移動モーション
なんとなく察してはいたが、　ボーン機能って移動モーションを作ってる時に輝くんだなぁ…!  
こんなモーションが、ボーンを回転させるだけで簡単にできちゃう!やべぇ!!!  
<img width="404" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/82.jpg?raw=true">

…呼吸モーションや目ぱちモーションを流用した結果、なんと15分程度で移動モーション完成…。本当にヤベェなボーン機能。  
完成した移動モーションはこんな感じ:  
<img width="1000" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/83.gif?raw=true">  
ちょっとぎこちなさがあるのが気になるが…まぁこのくらいでいいでしょう。この手のぎこちなさは実際に移動させれば消えるはず…多分。

…ここまでは簡単なモーションだが、次からは「クリックモーション」「ドラッグ&ドロップモーション」「待機モーション」「初回モーション」というめんどくさいモーション&実機能とは無関係なモーションばかり…。  
これは早々に切り上げて、上記アニメーションだけでもデスクトップマスコットとして実装した方がモチベが維持できそう…ということで、お次は実装フェーズへ!

# 仮アニメーションで実装
- 2021/07/24開始
- 2021/07/完了

## 「アプリ終了ボタン」と「ウィンドウ移動ボタン」調整
とりあえず気になるところから手当たり次第実装していこう。
まずは「アプリ終了ボタン」と「ウィンドウ移動ボタン」から。  

UI調整をしていると、デフォルトブラウザのdivのmarginやpaddingに悩まされる…ということで、リセットCSSを導入することに。  
どうもリセットCSSには「全部リセットするタイプ」と「デフォルトのスタイルを適用してくれるタイプ」があるみたい。  
前者はh1やh2タグに本来取り付けられるフォントサイズの違いまでも全部リセットしておんなじフォントサイズにしちゃったりするので、今回は後者の方を採用する。  
https://webdesign-trends.net/entry/8137

相変わらずリセットCSSにはいろんな種類があり、中でも「sanitize.css」と「ress.css」でどちらを使用するか迷ったが…「ress.css」だとpadinやmarginが0になっちゃって、自分で微調整するのがめんどいかもな〜ってことで「sanitize.css」を採用することに。  
なお、こちらだと「`box-sizing: border-box;`」の記述はないらしい…。こちらの記述はCSSをやっているとちょいちょい聞いたことがあったが、いまいちなんのことか分からなかったままだったのでいい機会だし調べてみよう。  
どうも`box-sizing: border-box;`にすると、paddingやborderの値を含めてwidthの値を計算してくれる様になるらしい。これは便利…。  
参考: https://techacademy.jp/magazine/8571  
ってなわけで、`box-sizing: border-box;`の記述を追加するべく`index.scss`に以下を追加。

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

また、今回はpaddingやmarginの値には「ベースピクセル数」を用いて計算する様に整えてみる。
下記の様なCSSを共通CSSとして用意し…。

```sass
:root
  --base-pixel: 4px
```

使う際には、下記の様に使用することで「ベースピクセル数に沿った値」を使用できる。

```sass
padding: calc(var(--base-pixel) * 4)
```

これにより、UIに統一性が産まれたら…いいなぁ。初の試みだがやってみることにしよう。

## アニメーション表示@アンジェラ様が表示されるまで
アニメーション表示用のコードを作り込んでいる段階で気づいた点が…。  
アニメーション表示時に「始点フレーム番号、終点フレーム番号」を指定する下記の様なコードがあるが…。

```js
// 始点フレーム番号、終点フレーム番号、ループ回数（0以下で無限ループ）
// 同時に初期フレームを始点（再生速度がマイナスの場合は終点）フレーム番号に設定
mySS6Player.SetAnimationSection(0, 40, -1);
```

これがもしアニメーションごとに異なるフレーム数になっていると、「各アニメーションごとに終点フレーム番号の情報を保持させないと」いけなくなる。  
現状の静止モーション、移動モーションでは幸いにもフレーム数は一緒なのだが…今後作っていくモーションはフレーム数が増大することも考えられる。  
ということで、フレーム数も各アニメーションの情報として持たせる様にする。

とりあえずアンジェラ様を画面上に御召喚することができた。  
<video controls width="480" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/84.mp4?raw=true"></video>

いや〜なんとも感慨深いねぇ…。せっかくここの段階まで実装できたのでCommitしておく。

にしてもアンジェラ様が生成デスクトップマスコットウィンドウの中央に鎮座してあられる…画面端っこになんとか表示させたいな。  
Pixi.jsでよしなにやってくれないか…とか考えたけど、なんてことない。表示位置を計算してやればいいのだ…というわけで下記の様に計算。

```js
// アニメーション表示位置を指定
mySS6Player.position = new PIXI.ObservablePoint(
  () => {
    return {};
  },
  1,
  // 画面端より少し左側に配置
  AppConfig.windowScreenWidth - (AppConfig.animationWidthSize * 0.4) / 3,
  // 最下部に合わせる形で配置(画面高さ - そのキャラの幅/2)
  AppConfig.windowScreenHeight - (AppConfig.animationHeightSize * 0.4) / 2
);
```

## アニメーション表示@モーションの自動切り替え
位置はいい感じに調整できた! お次はモーションの自動切り替えだ。  
せっかく各モーションで終了時のフレームがわかっているので、各動作のフレーム終了後に別モーションへ変更する様なルーチンを組んでみよう。  
…と思ったら、SS6Playerの方に便利な関数を発見。  
<img width="535" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/85.jpg?raw=true">

これで再生後に次のモーションを再生する処理を組めばOKそうだ。  
にしてもSS6Playerにはサンプルコードには載っていない、結構参考になりそうな関数が隠れているっぽい…Wikiに一覧として載ってないかと思ったが、どうも載ってなさそう。  
以下に参考になりそうなコードを列挙しておこう。

```js
// 再生時のフレームレート設定
// ※deprecated(削除される可能性がある関数)なので注意
mySS6Player.SetAnimationFramerate(AppConfig.animation.flameRate, true);
// アニメーション再生終了後にコールバック
// ループ回数に`-1`(無限再生)を指定しているとコールバックはされない
mySS6Player.SetPlayEndCallback(() => {
  document.body.innerHTML = "test";
});
```

なんとかランダムで静止モーション→移動モーション→…とループさせることはできた。この段階で一旦Commitしておく。

が、次の「移動モーション時の移動」が…これまた難しい。  
Pixi.jsないしSS6Playerには「pivot」という値があり、この中にアニメーションのX, Y座標が保持されている。  
そしてPixi.jsには「各フレームごとに実行したい処理」を記載することが可能だ。  
これらを組み合わせ、下記の様にX座標を1フレームごとに動かせば動く様になるはず…。

```js
this.pixiApp?.ticker.add(() => {
  this.ss6Player?.pivot.x += 5;
});
```

…なのだが、どうも`x`の値はundefinedが入る可能性があるらしい。  
それを考慮して、下記の様に修正したのだが…:

```js
this.pixiApp?.ticker.add(() => {
  if(this.ss6Player?.pivot.x){
    this.ss6Player.pivot.x += 5;
  }
});
```

なぜかxの値がundefinedと判定される様で、上記のif分に永遠に引っ掛からず全く動かないアンジェラ様が出来上がってしまう…。

ここはアプローチを変えて「Pixi.jsが表示されているアニメーションエリアごと移動してしまう」方法をとってみる。  
…が、これもうまくいかない。下記の様なコードを組んでみたのだが:

```js
// 毎フレームごとに実行される処理を登録
this.pixiApp?.ticker.add(() => {
  const targetElement = document.getElementById(this.selectorId);
  if (targetElement) {
    // px文字列を取り除いた純粋な数値を取得
    targetElement.style.right = `${
      targetElement.getBoundingClientRect().width + 1
    }px`;
  }
});
```

なぜかこの様なアニメーションとなる…。  
<video controls width="480" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/86.mov?raw=true"></video>

…だんだん疲れてきたので「移動モーションも動かなくていいんじゃね?」と開き直る方向に。あれだったら移動モーション消してもいいよね…。

## トーク機能実装
お次はいよいよメインディッシュ、トーク機能の実装だ。  
とりあえずトークボタンとチャプター表示のボタンを表示させよう。

---
ここから2021/07/25

### データ構造の見直し
トーク機能の実装にあたり困ったのがデータの持たせ方。  
現状は再生用のデータについては「アニメーションデータ」しか持たせていないが、トークが入ってくると「アニメーションデータとトークデータをセットで持たせないと」いけなくなる。  
おまけに、トークデータは1つのアニメーションデータ&1つのトークデータで終わることもない…連続したトークがあるパターン、例えば:

```
デフォルトモーションで「今日は何?」
呆れモーションで「またゴロゴロ昼寝するのね」
```

…といったトークをさせたいとなると、トークデータとアニメーションデータは1つにつき複数持たせる必要がある。

ということで、データ構造を激変。  
1つのトークデータ&アニメーションデータを「アニメーションセット」と再定義し、  
複数のアニメーションセットで連なるデータを「アニメーションフロー」と定義する。  
再生する時は「アニメーションフロー」の単位で再生されるので、上記の例だと:

```
アニメーションフロー:
    デフォルトモーションで「今日は何?」<-アニメーションセット
    呆れモーションで「またゴロゴロ昼寝するのね」<-アニメーションセット
```

…という様な形で再生される様にした。  
また、ループ再生用のアニメーションもこれに対応してみた。とはいっても、ループ再生用のアニメーションではトークはない様にしたい(ただそこにいるだけの状態にしたい)ので…。  
トーク内容が未定義であれば、トーク用の吹き出しは非表示にする様にしてみた。

…というところで、まずはループ再生用のアニメーションを上記に対応させるところから。ザザッと実装し終え、こんな感じに…いい感じかも。  
<video controls width="480" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/87.mov?raw=true"></video>  
とりあえずこの段階でCommitしておく。

---
ここから2021/07/26

### 追加対応:アニメーションのループ回数を指定できる様にする
ここまでやって気になったのが、アニメーションのループの必要性。  
現状だと1つのアニメーションは一律で1回しかアニメーションが再生されないが…。  
それだと、移動モーションの際に「アンジェラ様が2歩踏み出しただけで次のモーションに変わってしまう」ためちょっと不自然。

せっかくだしここでアニメーションのループ回数を指定できる様にしようということで、修正を加えてみた。  
…が、何かがおかしい。SS6Player提供関数にて、アニメーションのループ回数を指定してみたが…。  
<img width="583" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/88.jpg?raw=true">  
`5`とか`3`とかの、どの値を入れても「1回しかアニメーションが再生されない」事態に。

流石におかしいということで、ライブラリのコードを見てみた。  
…結果、ライブラリのコード側にバグがあることが判明。  
3388行目にて、ループ回数が`-1`の時以外は問答無用で`playEndFlag`を`true`にしている。  
<img width="531" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/89.jpg?raw=true">

この`playEndFlag`は、その先のコードで「フラグがONだったらアニメーション再生終了後のコールバック関数を呼び出す」様になっている。  
<img width="512" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/90.jpg?raw=true">

筆者の現状の仕組みで「アニメーション再生終了後のコールバック関数に次のアニメーションを再生する処理」を仕込んでいるので…。  
ループ回数に何を指定しようが強制的に`playEndFlag`が`true`になる現状のライブラリだと、1回再生されただけで次のアニメーションが再生されてしまうという事態が起こっていたわけだ。

というわけで、コードを下記の様に修正。  
<img width="453" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/91.jpg?raw=true">

`playEndFlag`はループ回数が0になっている時だけ`true`になる様にしてみた。  
※似た様な処理を行なっている箇所がこの15行くらい先にもう1つあったので、そっちも合わせて修正。

これで正常にループされる様になった。  
ちなみに同様のコードは`ss6player-pixi/src/SS6Player.ts`に記載されているため…ここを修正してコンパイルし直せば間違いなさそうだ。  
https://github.com/SpriteStudio/SS6PlayerForWeb/blob/develop/packages/ss6player-pixi/src/SS6Player.ts#L235  
…バグだろうし、プルリクエスト送ってもいいかもな…。  
同じ日本語でやりとりできるだろうし、プルリクのハードルも低そうだ。これをやり終わったら検討してみよう。

### トークボタンクリック時に割り込みで別アニメーションを再生
お次はトークボタンをクリックした際の処理。  
ひとまずはアニメーション再生用のコード`baseAnimation.ts`を弄り、ループ再生用のアニメーション再生中に、割り込みで別のアニメーションを再生できる様に修正した。  
後はアンジェラ様のトークデータを仮で作成し、トークボタンをクリックされたらそのトークデータを再生する様に仕込めばOK …。

だがここで問題発生。  
これまではアニメーション再生を行うオブジェクトの処理は「1コンポーネント内部で完結していた」(単に表示するだけなので)。  
このため、そのコンポーネントの内部でアニメーション再生用のオブジェクトを作り、そこで処理を完結させていたのだが…。  
<img width="560" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/92.jpg?raw=true">

今回アニメーションを表示するコンポーネントと、トークボタンのコンポーネントを分けた影響で「複数のコンポーネントに跨り1つのオブジェクトを操作する」必要性が浮上。  
これは…オブジェクトを状態管理(Store)しないといけなさそうだ。

Vue2であれば、Storeを使用するならVuexだったが…VuexはTypeScriptとの相性が頗る悪い。いやvuex-module-decoratorとか使えばいけるかもしれないけどさ…。  
それに、Vue3だとどうもVuexに頼らず状態管理ができるみたい。最高じゃん! …ということで、Provide-Injectパターンで実装してみる。

この辺りの知識については、下記の記事が非常に参考になった。  
https://qiita.com/karamage/items/4bc90f637487d3fcecf0  
Vue2患者がVue3のStoreの考え方を改めるにはちょうどいい記事だろう…。  
ただ、ここからはおそらくアニメーション再生ロジックが激変すると考え一旦Commitしておく…。

---
ここから2021/07/27

実装に当たってはこちらも参考にしてみた: https://zenn.dev/okakyo/articles/f39d5c2c328b6d  
…が、うまくいかなかった。  
アニメーションを再生させるコンポーネント内部でprovideしてみたのだが、injectがうまく動かずStore内部の処理にアクセスできない…なぜだ…。

ただ、今回はググるとあっさり解決方法が見つかった。  
>注意点として、provideの記述を行う場所ですが、アプリケーションの起点になるmain.ts（main.js）か、グローバルステートとして使いまわせるようにしたいトップの要素（pageとか、layoutsとか）じゃないと正常に動作しませんでした。  
https://karukichi-blog.netlify.app/blogs/vue-provide-inject-pattern

具体的に発生したエラーですが、 const state = inject(todoStateKey);の部分でinjectに失敗して、stateを正常に読み込んでくれませんでした。

今の現象は上記と全く同じ現象と感じ、main.ts内部に処理を書くことで無事にinject処理が動かせStore内部の処理にアクセスできた。やったぜ。  
有名どころのフレームワークを使うと、こういったエラーやハマりにぶち当たった時にさっとおまけに日本語で参考記事が出るのは本当ありがたいよね…。

そんなこんなで無事トークモーション再生の作り込みが完了！いや〜ここまでくると達成感あるねぇ…。  
<video controls width="480" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/93.mov?raw=true"></video>

なんとなく残り日数的に、機能としてはこの段階で留めておかないと締め切りとなる7月末には間に合わない気がする。  
ただ、ストーリー進行度でトーク内容を変更可能な様にする機能は実装しておこう。

### ストーリー進行度でトーク内容を変更可能に
ここでストーリー進行度をどの様にプロジェクトとして定義するか悩んだ。  
必要なデータとしては「現在選択されているストーリーの進行度」と「選択可能なストーリーの進行度リスト」。  
「現在選択されているストーリーの進行度」は先に作ったグローバルステート内部で管理しようとしたが…その時の型で悩んだ。  
<img width="241" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/94.jpg?raw=true">

今回は、`"あらぬ噂"`, `"都市怪談"`と言った様に文字列で保持させようと考えているが、格納先を`string`型にしてしまうとどんな文字列も入ってしまうので…。  
ないとは思うが、例えば一切関係ない`"タピオカ"`みたいな文字列も入れれてしまう。これじゃあちょっと不安だ…。

というところで、TypeScriptの文字列リテラルを使用することに。  
https://typescript-jp.gitbook.io/deep-dive/type-system/literal-types#riteraru  
ユニオン型で下記の様な感じで列挙すればいいらしいが:

```js
export type chapterDefinition = "あらぬ噂" | "都市怪談";
```

こうしてしまうと、`"あらぬ噂"`というのを他で「値として活用したい」場合に無理になってしまう…。

なので、進行度の中身については値として保持させ、下記の記事を参考に「配列をもとにユニオン型が構成される」ようにしてみた。  
https://qiita.com/suin/items/25588b2beba7a3fcce4f

```js
/**
 * 本デスクトップマスコットプロジェクト内部で使用されるストーリーの進行度リスト。
 */
export const chapterDefinitionList = ["あらぬ噂", "都市怪談"];
/**
 * ストーリーの進行度リストのユニオン型。
 */
export type chapterDefinitionUnion = typeof chapterDefinitionList[number];
```

こうすれば、例えば「デスクトップマスコットの起動段階の初期値」についても`chapterDefinitionList`の値がそのまま使える。

```js
/**
 * デフォルト(初期状態)のストーリーの進行度。
 */
export const defaultChapter = chapterDefinitionList[0];
```

これまでTypeScriptでまともに型を意識したことがなかった(string, numberとかの意識だけだった)が、使いこなせるとここまで便利なんすねぇ…。

そんなこんなであとは気合いで実装完了!  
※表情アニメーションがないためトーク内容のみが出るだけになっているが…。  
<video controls width="480" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/95.mp4?raw=true"></video>

とりあえずこの時点でコミット。

一応ここまででトーク機能は実装完了と言えるが、気になっている点が2つ…。

- 現状だと起動後は「あらぬ噂」で状態が固定となっているので、例えば「都市怪談」を選択後にデスクトップマスコットが起動終了したら次起動時は「あらぬ噂」ではなく「都市怪談」の状態で起動したい(ストーリー進行状態の保持)
- 各トークが何を主題として話しているかがわかりにくい、特にユン事務所のトーク(「結構大きな規模で来たけど、問題なかったわね。」が実はユン事務所のトークとなっている)…なので、各トークごとにはTopicとして取り上げている接待相手の顔アイコンや見出し(「ユン事務所について」みたいな感じで)を出したい

…だが、この実装を先にやっちゃうと締切日の今月末に間に合わない可能性が高い…これら実装は後回しにする。  
ということで、お次はトーク内容考案&モーション作成に取り掛かることにする!

# トーク内容考案、トーク用モーション作成&適用
- 2021/07/28開始
- 2021/07/30完了

---
ここから2021/07/28

いよいよトーク内容考案&トーク用モーション作成…。  
まずはトーク内容考案から。

## トーク内容考案
参考用にストーリーを読んでたのだが、ローランくんも指定司書も登場する都合上アイデアが…思い浮かんじゃってね…。  
ローランくんないしマルクトちゃん含め、他の指定司書のトーク内容も一緒に考えてしまった。まぁ今月末のリリースには間に合わないと思うのでおいおいね…。  
考えてみたトーク内容は下記に:

```
・クリックモーション
　…用がないなら帰ってもいいかしら。(ジトっとこちらを見る)

アンジェラ
■あらぬ噂
・ネズミ
　「ネズミ」ね…程度の低い連中というのは振る舞いを見ても分かったわ。(普通に話す)
　都市には私の知らない世界が広がっているのね。(普通に話す)
・ユン事務所
　結構大きな規模で来たけど、問題なかったわね。(少し微笑みながら)
　それにしても、フィクサーの種類と数って、本当に多いのね。(目を閉じげんなりした表情)
・鉄の兄弟
 組織だというのにあんな間抜けもいるなんてね。もっとそれっぽいかと思ってたわ。(げんなり)
 それにしても、機械の体の方が適している環境もあるみたいね。(意外そうな顔)
 長時間の反復作業…いえ、これ以上はやめましょう。(げんなり)
・釣事務所1
　今回のゲストで、事務所というものがどんな場所なのか理解が深まりそうね。(微笑みながら)
・釣事務所2
　…今回のゲストが話していた通り、私は機械。さっき相手した体を義体に置き換えているわけでもない、純粋な機械…。(少し目を伏せどこを見つめているわけでもなく哀愁ある感じ)
 ローランが言うには、都市では人間を模した機械を作ることは禁じられている様ね。でも、なぜそんな禁忌を犯す必要があったのかしら…そんなことをしなければ、私は…。(哀愁ある感じ)
 …いつかこの場所から出て、私をこんな目に遭わせた全てに復讐して自由の身になるの。そのために…。(決意抱いたキリッと顔)
■都市怪談
・プロローグにて
　ローランは利害関係が一致したから手伝ってくれている様ね。どうも恐怖を原動力に動いている様には見えないから気にはなっていたの。(意外そうな顔)
 いずれにせよ、私も彼を利用しているだけだし、向こうも利用してもいいとは思うわ。もちろん、一定のボーダーラインはあるけれど。(微笑みながら)
・ピエールのミートパイ
　区…正確には、区を管理している巣と翼によって環境は様変わりするのね。(普通に話す)
 はぁ、それにしても彼らにとっては私が最高級の食材に見える様だけど。どんな思考だったらそんなふうに見えるのかしら。(げんなり)
・街灯事務所1
 都市には12のフィクサー協会があって、それぞれ業務が違う…。事務所にはランクがあってそのランク付を行うのはフィクサー協会…。(普通に話す)
 都市には本当に色々な概念や、ランク付けが存在するのね。(げんなり)
・街灯事務所2
　さっきの招待客達はだいぶ仲が良かったわね。(普通に話す)
 それにしてもローランは、ああいった経験は何度もしてきたと話していたわね…。今はどん底フィクサーとか言ってたけど、本当はどうなのかしら。(意外そうな顔)
・街灯事務所3
　仲間が死んでその後追いの悲劇…まぁ、私としては見慣れたものだけど。(げんなり)
 ローランもああ言った経験は結構してきたらしいわね。どん底フィクサーでは簡単にできなさそうな経験だけど。(意外そうな顔)
```
```
ローラン
・クリックモーション
　ん？どうした？(こっちを見て体を捩りながら)

■あらぬ噂
・ネズミ
　「ネズミ」か。カネもないし力もない、その日暮らしで精一杯な敗北者…。(普通に話す→馬鹿にしてそうな顔)
　…今の俺もそうっちゃそうか。(目を閉じてげんなりした様子で)
・ユン事務所
　世間知らずの子供まで利用してくるとはな。(げんなり)
　まぁガキもろともみーんな仲良く本になっちまったが。(口を｜＼の形にして普通？の顔で)
　…飛んで火に入る夏の虫、ねぇ。(考え事をしながら)
・鉄の兄弟
　ああいうのを見ると、やっぱり鉄の塊に脳を入れるのはいい考えじゃないなって思うんだよな。(口を｜＼の形にして普通？の顔で)
　元の体のまま強くなる方法は結構あるし…。というかそっちの方が選択肢多いし。(普通にニヒルに笑いながら)
　体を機械にしてしまったら、元には戻れないからな…。(げんなり)
・釣事務所1
　最近の事務所はあんなゴロツキも使い回すのか…。やれやれだな。(げんなり)
・釣事務所1
 アンジェラにも色々事情がありそうだな、薄々そんな気はしてたが…まさか純粋な機械なんて。(口を｜＼の形にして普通？の顔で)
 まぁ、アンジェラの前ではこの話はあんまりしない方が良さそうだな。それはそれ、これはこれだ。(普通にニヒルに笑いながら)
・歴史の階について@初回
　最悪のタイミングで挨拶に行ってしまったよな…アンジェラとバッチバチで息が詰まるかと思ったよ。(困り顔で)
 こっちに火の粉が降りかからなかったのはよかったけど。(げんなり)
 まぁ、思ったより明るい性格の人でよかったよ。(普通にニヒルに笑いながら)
・歴史の階について@2回目
　義体手術を受けて、図書館で人間の体に戻ったって…本当、ここでは俺の知ってる常識が全部崩れていくな…。(げんなり)
 それにしても、マルクトも過去の自分に色々闇を抱えていそうだな。まぁゆっくり考えていけばいいさ。(口を｜＼の形にして普通？の顔で→普通にニヒルに笑いながら)
・技術の階について@初回
　初対面の印象はアンジェラと同タイプと思ったが…思ったよりいいやつでよかったよ。(普通にニヒルに笑いながら)
 ただ、用だけ済ませてさっさと退散した方が良さそうだけど。(げんなり)
 にしても、アンジェラはここの指定司書からはよく思われてない様だな。ややこしい話、特に感情が絡む奴は遠慮したいが…。(困り顔)
■都市怪談
・プロローグにて
　この図書館の司書って存在は結構あやふやなものだな。本と人間の体で縛り付けてるだけって。(口を｜＼の形にして普通？の顔で)
 …まぁ、俺もそれの一部みたいだけど。(げんなり)
　にしても、アンジェラが「多くの人が恐怖に囚われて床を這いずり回る姿を見てきた」って言ってたが…。どんな過程を踏んだらそうなるんだろうな…。(困り顔)
 いずれにせよ、単なる箱入りお嬢様とは違いそうだな。(口を｜＼の形にして普通？の顔で)
・ピエールのミートパイ
 うわ、23区の裏路地の連中か…。あいつらはそこら辺にいる真っ当な人間をすぐ食材にしちまうからな。(げんなり)
 どうやったら人間が美味しく感じるんだよ…あんな奴らとは関わらないのが身のためだな。(困り顔)
・街灯事務所1
 アンジェラはランク付けを「知ることも考えることも放棄したみたいに見える」と言っていたが、都市に生きる人、と言うか人間が生きていく上では普通だからな。(困り顔)
 そう考えると、アンジェラはかなり閉鎖的な環境で暮らしていた様に思えるな…まぁ、世間知らずっぷりからも分かるけどさ。(口を｜＼の形にして普通？の顔で)
・街灯事務所2
　さっき接待してきた連中、だいぶ仲が良かったというか、青臭かったと言うか…。まぁ、今回の経験はいい成長剤だろうな。(普通にニヒルに笑いながら)
 ああ言う経験は俺自身も何度もしてきたが、やっぱり切るときはバッサリ切らないとな。(口を｜＼の形にして普通？の顔で)
・街灯事務所3
　ああ…仲間が死んで、こうなったパターンか。今回の覗き見では嫌なもん見ちまったな。（げんなり)
　悲しさも嬉しさも適度に吐き出して、状況に合ったやり取りで済ますのがお互いのためになるんだ。(困り顔)
 …にしても図書館長の「気になるなら殺して本にするわ」なんてブラックジョーク、笑えないな…。(げんなり)
・技術の階について@2回目
　技術の階って怖いくらい本が整列されてるんだよな…本当こう言うのは性格出るもんだな。(げんなり)
 それにしても、あのやろーアンジェラの犬とか…好きでやってないっての〜。(困り顔)
・文学の階について@初回
　相変わらず図書館長様は指定司書から嫌われているな。(口を｜＼の形にして普通？の顔で)
 全くわからないけど、1つ言えるのは図書館と司書、全てがひどく絡まっていそうってことだな。(困り顔)
 はぁ、本当気が遠くなりそうだな…少なくとも図書館ではみんな仲良くやれればいいのに。(げんなり)
・文学の階について@2回目
　ホドはどうもこう、苦労しそうな性格してるな。出会って数分もない接待客の事情について色々悩んでたし。(口を｜＼の形にして普通？の顔で)
 「それはそれ、これはこれ」っていう言葉も真っ向から受け止めてたしな。(困り顔)
 考えすぎたりして爆発しなければいいんだが…。(げんなり)
```
```
マルクト
■あらぬ噂
・ローラン初回対面時:
 アンジェラのことは、まだ私は許してない…。私はまだ彼女のやることに反対よ。(青ざめて硬く本をにぎりしめこわばりながら)
 とはいえ、私はアンジェラの言う通りに動くだけよ、私の意思は二の次で。(決意抱いたキリッと顔で)
・ローラン2回目対面時:
 3度目の人生…昔であれば、こんな悩み絶対になかったのに。不思議な感覚…。(目を閉じ考えている様な感じで)
 うん、昔の自分のことを考えるのは大変だけど…ローランが落ち着かせてくれたおかげで少し前向きになれたかも。(笑顔で)
 やれることから頑張らないとね!(満面の笑顔で)
```
```
イェソド
■あらぬ噂
・ローラン初回対面時:
　アンジェラにはいい感情は抱けませんね。彼女は我々のやってきたことを最後の最後で踏みにじったのですから。(仏頂面で)
 とはいえ、司書の仕事はします。そういう取引なので。(仏頂面で目を閉じながら)
■都市怪談
・ローラン2回目対面時:
　ローランはよく周りを見ていますね。私たちが戦いに慣れていないことにすぐに気づいた。(仏頂面で目を閉じながら)
 ただ、アンジェラの犬である限りいい感情は抱けませんが。(仏頂面で)
```
```
ホド
■都市怪談
・ローラン初回対面時:
　みんなと同じく、私もアンジェラに好意的な感情は抱けていないわ。(顔をこわばらせながら)
 私がした様に、許されないことをアンジェラもしたから…。（顔をこわばらせ目を閉じながら)
 ただ、取引はしたから文句は言わずに手伝うのみよ。(目を閉じ仏頂面で)
・ローラン2回目対面時:
　文学の階でいろんな人の本を見てきたけど、まるでその人の人生が1つの文学みたい。(微笑みながら)
 自分だけの人生が本の様に書き綴られて、喜劇と悲劇も入り混じって…。悪い人ばかりでも、良い人ばかりでもないみたい。(目を閉じ微笑みながら)
 そんな人たちの文学を見ていると、誰かを無闇に憎んだり、他の人の人生を邪魔したりするのはちょっと抵抗があるかもしれないわ…。(困り顔で)
 ローランの「それはそれ、これはこれ」というアドバイスは確かに的を射てそうだけど、諦めている感じだったり、束の間の慰めと言う意味もあると思うの。(苦笑いしながら)
 もう少し考えてみないとね。(目を閉じ微笑みながら)
```

…本家ストーリーを見ながら時にはそのまま言葉を抜き出したりしながら、なるべく語弊がなさそうな感じで…本家ストーリーに忠実な感じで作ってみた。  
言ってしまえば各ストーリーの会話内容を要約し、キャラクター自身の視点ではどの様なことを語るかをまとめた結果となったが…これ作るのめちゃくちゃ時間かかるね。  
会話内容考案だけで2時間くらい費やしてしまったよ…30分もあれば作れると思ったけど、そんなことなかったでござる。

## プログラム適用
さて、お次はトーク用モーションの作成…と思ったけど、気分的にプログラミングの方をやりたかったのでまずはプログラム側に適用するのを優先した。

…そろそろ長い会話内容をJsonオブジェクトとしてコンバートするのに疲れてきたが、コンバーターを作る余裕もないし一旦は我慢しようね…。

なお、さっきにて:

>- 各トークが何を主題として話しているかがわかりにくい、特にユン事務所のトーク(「結構大きな規模で来たけど、問題なかったわね。」が実はユン事務所のトークとなっている)…なので、各トークごとにはTopicとして取り上げている接待相手の顔アイコンや見出し(「ユン事務所について」みたいな感じで)を出したい

…これは時間があれば後回しにしようとしたが、やっぱりこれは今回の一時リリースで導入することにする。会話として再生した時、主題がわからないの結構困ったからね…。  
顔アイコンという形か見出しという形かで悩んだが、会話内容が日本語である都合上日本語をある程度理解してないとわからないアプリケーションなので、顔アイコンにし言語が違っても直感的にわかる様な対応は不要かな…とおもったので、見出しという形で実装することにした。

というところで、実装完了。  
<video controls width="480" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/95.mp4?raw=true"></video>

一旦Commitしてしまおう。

## トーク用モーション作成
---
ここから2021/07/29

お次はトーク用モーションの作成だ。  
ついつい手が滑ってアンジェラ様以外のキャラの会話内容も考案しちゃったけど、とりあえずはまずアンジェラ様からだね。  
…会話内容考えた後だと、ぜひローランくんも召喚できる様にしたいが…それはまた追い追いね。

作ってみたが、静止モーションや移動モーション作成時よりはるかに楽にできた。  
口のモーションは静止モーションや移動モーションで作る際にほぼセットアップしてなかったのと、元々の口の絵がアニメーション作成に不向きだったのとで、結構手間取ったが…。  
ボーンをめちゃくちゃに仕込むことで、口の線の長さまで制御できることを発見し、それで行った。  
<img width="915" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/97.jpg?raw=true">  
※この小さな口に5つもボーンを仕込んでる

後は適用…。

---
ここから2021/07/30

適用したみたのだが、どうも連続で会話ボタンを押された時の処理がおかしい…。  
例えば:

```
静止モーション>
  [ここで会話ボタンクリック]>
  会話内容1再生開始>
      [ここで再度会話ボタンクリック]>
      会話内容2再生開始>
      会話内容2再生終了>
  会話内容1再生 <-??
```

…となる。筆者としては、`<-??`の部分では元々流れていた静止モーションが流れて欲しいのだが…。

要因はソースコードにあった。まぁそりゃそうなんだけどね。  
会話ボタンクリック後の処理にて、

```js
    // 現在再生中のアニメーションをアニメーションフローキューの先頭へ退避
    this.animationFlowQueue.unshift(this.nowPlayAnimationFlow);
```

…という処理が行われている。  
この結果、会話内容1再生途中に会話ボタンがクリックされると**現在再生中のアニメーション=会話内容1なのでアニメーションフローキューに会話内容1がまじってしまう**結果となってしまった。

筆者的には、会話内容が再生されたら次の会話内容が再生…ではなく、そのまま待機モーションのアニメーションが流れて欲しいので下記の様に変更した。

```js
    // 再生停止した分、待機モーションアニメーションを新たにアニメーションフローキューの先頭へ退避
    this.animationFlowQueue.unshift(this.roopAnimationFlowList[0]);
```

ここまででひとまず作りたい機能については実装し切った…。  
お次はリリースに踏み込むことにする!

# 一旦リリース
- 2021/07/30開始
- 2021/07/完了

さぁいよいよリリース。ひとまずやるべきことを整理しよう。

- 真っ先にやること
    - パッケージ化&動作確認@MacOS
    - パッケージ化&動作確認@Windows
    - 紹介用&DL説明ブログ記事執筆
    - README.md記載(DL説明とか)
    - お問い合わせ&バグ報告用のIssue準備
    - リリース告知&コンテスト応募をTwitterへ投下
- 後々やりたいこと
    - 開発ロードマップ作成

今回は個人開発なのと、自分で好きに作って公開したかっただけなので「DLして起動しても動かないんですけど〜」と言った類のものの対応は…素直にいうと、やりたくない。  
特に本職で経験あるからそうなのだが、「動かないんですけど〜」系のものはその人の環境(ウイルスバスターにブロックされた、とかWindowsOSのバージョンが古い、とか)に左右されるケースが本当に多い…事前情報(どのOSのどのバージョンで動きません、とかウイルス対策系のソフト入れてます、とか)をたくさん渡してくれるのであれば調査しやすいのだがね…。

ということで、README.mdに「動作確認環境」を明示的に示すのと、それ以外の環境での動作は保証しない旨をしっかりと書いておきたい。  
また、バグ報告についてはGithub上でIssueを立ててくれたもののみ対応する様にしたい…。  
そしてIssueを立てやすい様にテンプレートぐらいは整えてあげたい…。ということで、それも盛り込んでみた。

ともあれやるべきことはリストアップできた。1つ1つやっていこう。

## パッケージ化&動作確認@MacOS
まずはパッケージ化から。これまで動作確認時含め一度もパッケージ化したことなかったのだが大丈夫かな…。

とりあえずビルド自体は正常終了。お次は動作確認っすね…。  
また、動作確認の一環として「30分くらいアプリをつけっぱなしにして、CPU等に負荷がかかってないか」もチェックすることにする。

…と思ったら、ここでアプリケーションタイトルを未設定だったことが発覚。  
なんなら会話ボタンの画像も作ってなかった…急いで整えないとな。  
というところで、サクッと作ってきて適用。

…と思ったが、以前のデスクトップマスコット作成時と同じ様に`vue.config.js`に下記の様に記載しても上手くいかない。

```js
        mac: {
          icon: "src/assets/app.png",
        },
        win: {
          icon: "src/assets/app.png",
        },
```

どうしようか…と公式ページを見ると、どうも上記の様な設定をしなくても:

- MacOS: `build/background.png`
- WIndows: `build/icon.png`

ファイルを作成すれば勝手にそうなるらしい。  
https://www.electron.build/icons.html  
設定ファイルにごちゃごちゃ書くのもアレなので、これに則ることにする。

ともあれなんとか動かせた…！  
<img width="554" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/98.jpg?raw=true">

一応30分くらい放置させておいて、メモリ使用量に負担がかからないか等もみておくことにする。  
この間にWindowsでのパッケージ化等も行っちゃおう。

## パッケージ化&動作確認@Windows
以前Electronでデスクトップマスコットを作った際は、なぜかMacOSにてWindowsOS用のパッケージ化が上手くできず…。  
やむなくWindowsOSでパッケージ化を行ったんだった。

今回も安パイを取って、WindowsOSでパッケージ化を行うことにする。  
…が、ここでもまた問題発生。どうもWindowsOSだと画面下が見切れちゃう様で…。  
ストーリー進行状況切り替えボタンが半分くらいタスクバーに埋もれてしまう様になってしまった。

急遽、下部分のCSSを調整し埋もれない様にしておいた…。

 ## README.md記載(DL説明とか)
お次はいよいよ本格的にリリース準備…まずはREADME.mdの修正から。  
開発向けの環境構築手順や、機能説明、デモ画像の整備とかを行う。  
とはいっても、ほとんどは以前作ったデスクトップマスコットのREADME.mdを流用するだけで済んだが…。

後はリリース用のパッケージ化されたインストーラを、MacOS用とWindowsOS用に準備。リリースって不思議とドキドキするよね…リリースボタンをポチッと押した時のあの達成感はなんなんだろうね。  
ともあれ無事にリリース完了、ついでにリポジトリもPrivateからPublicリポジトリに変更しておく。

## 紹介用&DL説明ブログ記事執筆
続いて紹介用&DL説明用のブログ記事も執筆。  
今回はTwitter告知時には記事がある前提で作ろうと思うので、ブログ公開日時は書いた直後に投稿してしまった。

…にしてもデモ用のGIF動画をはてなブログに投稿しようとしたら、10MBを超えていたので投稿できず…残念。  
仕方なくフレームレートを下げたGIF動画を作成し、再度投稿しなおした。フレームレート6にまで減らすハメになったよ…。  
…とやってもなかなかアップロードできない。どうもはてなブログ上ではGIF画像のアップロードは不安定な様だ…。

仕方がないので、外部Webサービスを使用してGIF動画をリサイズすることに。  
こちらを使用してリサイズした: https://ezgif.com  
…としてもうまくアップロードできず…仕方ないので静止画で妥協することに。おのれはてなブログ…。

## お問い合わせ&バグ報告用のIssue準備
いよいよ大詰め…。最後にお問い合わせ&バグ報告用のIssueを詰めておくことにする。

やることとしては、バグ報告用のIssueテンプレート準備だ。  
やったこともなかったが、公式Docsにやり方があったので適用してみたら割とあっさりできた。  
https://docs.github.com/ja/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository

にしても、テンプレートの情報自体はリポジトリ内部に存在させる様ね。Github側に持たせると思ったら違うのか…。

## リリース告知&コンテスト応募をTwitterへ投下
Twitter投下用の文言を揉んでおく。少ない文字数で伝えないといけないから大変だね…。  
とはいえ、ある程度事前に作っておいたからね。かなり楽にできたっちゃできた…今日はもう夜遅いので、明日に投下しよう。

---
ここから2021/07/31

コンテスト応募に投下完了！
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">[特別部門応募]<br>PC上で動くアンジェラ様のデスクトップマスコットです<br>おしゃべりしてくれる様にも仕込んでおります〜<br>※あくまで二次創作物です!<br><br>ダウンロード方法等はこちら: <a href="https://t.co/lY84TgxA19">https://t.co/lY84TgxA19</a><br>ぜひお手元にアンジェラ様を召喚してみてください〜<a href="https://twitter.com/hashtag/LORcontest_First?src=hash&amp;ref_src=twsrc%5Etfw">#LORcontest_First</a> <a href="https://t.co/xGAHKBxXNw">pic.twitter.com/xGAHKBxXNw</a></p>&mdash; Aik(アイク) (@aik0aaac) <a href="https://twitter.com/aik0aaac/status/1421283027485749249?ref_src=twsrc%5Etfw">July 31, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

想像以上に反響がありびっくり…いろんな方にDL&起動していただいている様で、重い思いに楽しまれてる姿が見られてもうね、開発者冥利につきますよ…_:(´ཀ`」 ∠):  
本当ありがとうございますって感じ…！

そして、改めてプロムンさんの募集要項を見てると「指定司書等ではなくストーリーのキャラを中心にしてください」ってあって「マジか…」と若干絶望。  
どうりで他のコンテスト作品に、指定司書やらアンジェラ様の作品がないわけだわぁ…こいつぁしまったぜ。  
というわけで、急遽ストーリー内のキャラ、ピエールちゃんを実装することに。

# ピエール実装
- 2021/07/31開始
- 2021/07/完了

急遽今日中に作成することになったピエールちゃん、間に合うかな…。  
とりあえずアニメーション数は極力少なく、そしてアンジェラ様アニメーションを作った時の知見を生かしながらやっていこうかなと方針を固める。  
ともあれやることを列挙:

- イラスト作成
- アニメーションデータ作成(ボーン作成)
- 会話内容考案
- アニメーションデータ作成(モーション作成)
- プログラム適用、キャラ変更できる様改修
- パッケージ化、リリース
- 改修内容をREADME.md、ブログに追記
- Twitterに告知

…うん、かなりギリギリの提出になりそうだ…。  
ただ、この流れがおそらく今後の改修&キャラ追加の流れになるだろう。軽めの実装で済む様に方針立てたピエールちゃんでお試しできるのはいいかも…。

## イラスト作成
ひとまずはイラスト執筆。  
アンジェラ様アニメーションを作った時の知見を生かしながらイラストを作成…具体的には:

- パーツ分けしながらイラスト作成(左右でも分ける)
- 腕は手も含めて1本に繋げる(そこまでアニメーション必要ないはずなので)
- 白眼部分としたまつ毛部分は統合させる
- 口部分は開いたバージョンの口を用意し、周りを顔の色で塗りつぶしておく
    - 口の中身を丸く作り、開いたバージョンの口を被せることで見えなくするイメージ

…といった感じ。  
出来上がったらPSDファイルに変換し、各パーツを1レイヤーに固めてPSDtoSS6GUIにポーいしてsspj, ssaeファイルを生成。

無事にSpriteStudio上で開けることを確認し、作業としてはここまで！  
<img width="1124" src="https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/log/99.jpg?raw=true">  
お次はアニメーションデータ作成(ボーン作成)にとりかかる。

## アニメーションデータ作成(ボーン作成)
お次はボーン作成。  
ボーン作成&メッシュを割り当て…という作業をひたすらに行っていく。

…なんとか完了。色々ちょっと手を抜いた箇所もありつつ…。  
ちなみに今回は本作業は1時間15分程度でできた。成長を感じるな…。  
慣れてきたら1時間を切れるかもしれないね。

お次は会話内容の考案だ。

## 会話内容考案
考えた会話内容を下記に記載する:

```
あらぬ噂:
・あら？ここの段階では私の出番はまだみたいね。(普通に話す)
　あら、壁に何か書いているわ…「あなたは都市怪談で話せるキャラだから待っててね」…ふーん？(驚いた様な表情で)
 ともかく、ここではあんまりおしゃべりしちゃダメみたい。都市怪談にてまた会いましょ！(目を閉じ最高に笑いながら)

都市怪談:
・んっふふ〜〜♪ここには最っ高級の食材がゴロゴロ転がってるわねぇ。(満面のニヤつき)
　でもみーんな人間じゃないみたいね?　あやふやなのもありそうだけど。(笑みを浮かべながら)
　でもそんなこと関係ないわ！どんな味がするのか楽しみだわ〜。(目を閉じ最高に笑いながら)
・人が引き出せる味には限界があるの。人間の舌が感じることができる味の極限って思ったより大したことないから。(普通に話す)
　多くのシェフたちは、これ以上の味を追い求める方法は何か悩んで…「舌で感じる味、これ以上の経験を味に昇華したらどうか？」という結論に至ったわ。(普通に話す)
 料理の工程そのものを味で感じられたら、それはまさしく舌で感じる味以上の経験になるように…。(目を閉じ普通に話す)
 そうしてシェフのみんなが、もっと素晴らしい味を追い求めるために研究を続けているのよ。(普通に話す)
・「８人のシェフ」…私はあの人たちのエプロンの染みくらいでも追いつきたい！そのために研究を続けているの！(目を閉じ最高に笑いながら)
・私たちをこーんな素敵な場所に招待してくれた方には、上品に振る舞わなきゃね。(目を閉じ普通に話す)
```

お次はアニメーションデータのモーション作成だ!

## アニメーションデータ作成(モーション作成)
モーション作成、かなりちょっぱやでやったがそれでも時間かかるね…。  
特に、全共通のモーション(呼吸している様子、髪がたなびく様子)が時間かかる。この作業だけで全体の作業時間の75%くらいもってかれたよ…。

ともあれ作業は無事完了できた。ここまでで2時間くらいかな…意外と時間かかるのねぇ。  
お次はプログラム適用だ！

## プログラム適用、キャラ変更できる様改修
プログラム適用は割とあっさり完了。  
最悪応募できる時間に間に合わなくなるのを考慮して、この段階で画面の録画をとっておく…。

とりあえず突貫ではあるが、キャラ変更できる様改修。  
コードがクッソ汚くて目を背けたくなるが、速度優先なので…後々改良しましょう。

## パッケージ化、リリース
ここまででなんと23:40…正直LOG書いている場合ではないが、精神を落ち着かせるために書いておく。  
ひとまずMacOSパッケージ化、Windowsパッケージ化完了！動作確認…は省いてしまった。多分大丈夫とは…思うが。

ここまででもう後がない23:57…先にTwitterの告知を行うことにする！

## Twitterに告知
文言は下記に:

```
[特別部門応募](再)
募集要項を見てると「ストーリーのキャラを中心に」とあったので、急遽ピエールちゃんも召喚できる様にしてみました。
※あくまで二次創作物です!

ダウンロードはこちら: 
https://aik0aaac.hatenablog.com/entry/2021/07/31/024809
ぜひお手元にピエールちゃんを召喚してみてください〜

※機械翻訳文です
[特別部門応募]
ピエールちゃんをデスクトップ上に召喚できるデスクトップマスコットを作成しました！
※元はアンジェラ様のデスクトップマスコットですので、アプリタイトルに「angela」とついていますが、ピエールちゃんに表示切り替えもできます

ダウンロードはこちらから: 
https://github.com/aik0aaac/angela-desktopMascot/releases
ぜひお手元に、ピエールちゃんを召喚してみてください。
#LORcontest_First
```

日本語版ツイートを23:59、韓国語版ツイートを00:03にツイート完了！いやぁ…ちょっとギリギリかなぁ。

## 改修内容をREADME.md、ブログに追記
後追いで改修内容をREADME.mdやブログに追記…いやぁ大変っすねこれ。  
特に画像の差し替えが面倒のなんの…機能のアップデートリリースって本当大変なのねってことを実感。

なお、「開発ロードマップ作成」はやろうと思ったけど、多分メンテが面倒になると思うのでやめることに…。

# LOGのおわりに
一旦ここまでで、コンテスト応募も締め切られ目標物もリリース完了したので…この段階で本LOGは締め括ることにする。  
他にもやりたいことは山ほどあるが、それはおいおいで気が向いた時にやろうかなって。