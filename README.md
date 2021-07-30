# アンジェラ様のデスクトップマスコット

アンジェラ様のデスクトップマスコットです。  
**個人で二次創作物として作ったものなので、公式のものではありません。**  
WindowsOS と MacOS に対応しています。

こんな感じで動きます:

![デモ動画GIF](https://github.com/aik0aaac/angela-desktopMascot/blob/images/movies/demo_movie.gif)

# インストール方法

- [こちら(Releases)](https://github.com/aik0aaac/angela-desktopMascot/releases)のページに移動
- MacOS の場合:
  - `angela-desktop-mascot_forMac.zip`を DL&ZIP 解凍してから`angela-desktop-mascot-1.0.0.dmg`を起動してください
- WindowsOS の場合:
  - `angela-desktop-mascot_forWindows.zip`を DL&ZIP 解凍してから`angela-desktop-mascot Setup 1.0.0.exe`を起動してください

# 画面説明

![説明用画像](https://github.com/aik0aaac/angela-desktopMascot/blob/images/images/description.jpg)

- 終了ボタン: 本アプリケーションを終了します
- 移動ボタン(Mac OS のみ): ドラッグ&ドロップでウィンドウを移動できます。
  - WindowsOS では諸事情がありこのボタンは非表示となっております、悪しからず…。
- トークボタン: クリックすると、アンジェラ様とトークできます
  - 現在のストーリー進行状況によって、トーク内容は色々変わります
  - 2021/07/31 現在は「あらぬ噂」と「都市怪談」のトーク内容のみ用意してます
- ストーリー進行状況切り替え: クリックすると、ストーリー進行状況が切り替えられます

# 注意事項

- 本ソフトはフリーソフトです。自由にご使用ください
- このソフトウェアを使用したことによって生じたすべての障害・損害・不具合等に関しては、私と私の関係者および私の所属するいかなる団体・組織とも、一切の責任を負いません。各自の責任においてご使用ください
- メインの開発環境は MacOS であり、WindowsOS では最低限の動作確認しか行なっていません。このため WindowsOS では不具合が多いかもしれません…ご了承をば。
- 以下に示す[動作確認環境](#動作確認環境)以外での動作確認は行ってません。記載のない環境では動かない可能性もあります…ご了承をば。
- 何かご意見・質問等あれば[Issue](https://github.com/aik0aaac/angela-desktopMascot/issues)からどうぞ
  - 個人プロジェクトであるため、全てのご意見&質問にご対応できるわけではありません。悪しからず…。

# 動作確認環境

- MacOS: Big Sur(v11.4)
  - プロセッサ: 2.3GHz デュアルコア Intel Core i5
  - メモリ: 8GB
- Windows: Windows10 Home
  - プロセッサ: Intel Core i7 3.0GHz
  - メモリ: 16GB

上記以外の環境での動作は保証しかねます。あらかじめご了承ください。

# 開発者向け説明

本リポジトリのライセンスは MIT LICENSE となっております。  
本リポジトリのソースコードを自由に改良し、お好きなキャラをデスクトップ上に召喚してももちろん構いません。
(とは言っても、あまり綺麗なコードではないので改良には苦労をかけるかもしれません…。)

なお、アニメーションに使用した画像は本リポジトリ内部にはありません。

## 使用している主要技術スタック

改良の際には、下記の主要技術スタックの知識が必須となります。
特にアニメーション新規作成には SpriteStudio の知識が、アニメーション関連にがっつり変更を加えたいのであれば、SS6Player for pixi.js の知識が必須となります…。

- Electron
- Vue3
- SpriteStudio
- [SS6Player for pixi.js](https://github.com/SpriteStudio/SS6PlayerForWeb/tree/master/packages/ss6player-pixi)

# 環境構築手順

1. SS6PlayerForWeb ライブラリのソースコードを導入
   - 当該リポジトリで使用している [SS6PlayerForWeb](https://github.com/SpriteStudio/SS6PlayerForWeb) は作成時点(2021/07/14)npm モジュールとして公開されていないため、自前でソースコードを調達する必要があります
   - 詳しい手順は[`/src/lib/ss6player-for-web/README.md`](https://github.com/aik0aaac/angela-desktopMascot/src/lib/ss6player-for-web/README.md)を参照に。
2. `yarn install`
3. `yarn electron:serve`でローカル環境が立ち上がります
