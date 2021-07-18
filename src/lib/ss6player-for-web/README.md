# このフォルダについて

当該フォルダは、SpriteStudio 様が公開されている[SS6PlayerForWeb](https://github.com/SpriteStudio/SS6PlayerForWeb)ライブラリのコードを配置する場所です。
ライブラリのコード自体は封入されておりません。

# `ssfblib`フォルダについて

SpriteStudio 様が公開されている SS6PlayerForWeb リポジトリ内の、[ssfblib](https://github.com/SpriteStudio/SS6PlayerForWeb/tree/master/packages/ssfblib)ライブラリファイルを配置する場所です。
※当該リポジトリに他プロジェクトのソースコードを封入するのが憚られたため、この様な形をとっております

ビルド手順については、`ssfblib`プロジェクトの[README.md#ビルド](https://github.com/SpriteStudio/SS6PlayerForWeb/tree/master/packages/ssfblib#%E3%83%93%E3%83%AB%E3%83%89)を参照してください。
ビルド後に生成された`dist`フォルダごと、`ssfblib`フォルダに配置してください。
※`ssfblib/dist/[生成されたファイル群]`となる様な形で配置ください。

なお、`ssfblib`については[最終コミット日:2021/03/31 のコード](https://github.com/SpriteStudio/SS6PlayerForWeb/tree/feb6c222b36db32cc2e5b6a72fe56955336e43b9)を元に当該リポジトリは作成されています。
これより前、もしくは後のコードを元にしてライブラリのコードを生成された際の動作確認は保証できません。悪しからず…。

# `ss6player-pixi`フォルダについて

SpriteStudio 様が公開されている SS6PlayerForWeb リポジトリ内の、[ssfblib](https://github.com/SpriteStudio/SS6PlayerForWeb/tree/master/packages/ss6player-pixi)ライブラリファイルを配置する場所です。
※当該リポジトリに他プロジェクトのソースコードを封入するのが憚られたため、この様な形をとっております

ビルド手順については、`ssfblib`プロジェクトの[README.md#ビルド](https://github.com/SpriteStudio/SS6PlayerForWeb/tree/master/packages/ss6player-pixi#%E3%83%93%E3%83%AB%E3%83%89)を参照してください。

なお、SS6PlayerForWeb リポジトリ>ss6player-pixi では「pixi.js の import ロジックを含まない」とされていますが:
参照: https://github.com/SpriteStudio/SS6PlayerForWeb/commit/70960ed2c3a5937805be3619cabb04ba29537d72#diff-f8fa699485ea18515cc80e3eff5c0a245d64ccb9c75b2712900a734b2a15aa2a
本プロジェクトでは import ロジックを含めたものを採用しています。このため、リポジトリ内のコードに下記の修正を行なってからビルドを行ってください。

- `SS6PlayerForWeb-develop/packages/ss6player-pixi/src/SS6Player.ts`, `SS6PlayerForWeb-develop/packages/ss6player-pixi/src/SS6Project.ts`の最初の行にある`//import * as PIXI from "pixi.js";`をコメントアウトしないようにする
- `packages/ss6player-pixi/tsconfig.json `内にある下記の記述を削除 or コメントアウトする:
  - `"node_modules/pixi.js/pixi.js.d.ts",`
  - `"types": ["pixi.js"]`

ビルド後に生成された`dist`フォルダごと、`ss6player-pixi`フォルダに配置してください。
※`ss6player-pixi/dist/[生成されたファイル群]`となる様な形で配置ください。

その後、生成されたファイル群から`ss6player-pixi.es5.js`を`ss6player-pixi.js`とリネームしてください。`map`ファイルも同様に。
その後、同 JavaScript コードに下記を封入します。

```js
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
```

これで準備完了です。

なお、`ssfblib`については[最終コミット日:2021/03/31 のコード](https://github.com/SpriteStudio/SS6PlayerForWeb/tree/feb6c222b36db32cc2e5b6a72fe56955336e43b9)を元に当該リポジトリは作成されています。
これより前、もしくは後のコードを元にしてライブラリのコードを生成された際の動作確認は保証できません。悪しからず…。
