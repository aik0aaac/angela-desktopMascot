/**
 * 環境によらない、プロジェクト全体に関する設定値を詰めたファイル。
 */
export const AppConfig = {
  /**
   * Electronウィンドウの横幅。
   * 単位: px
   */
  windowScreenWidth: 800,
  /**
   * Electronウィンドウの縦幅。
   * 単位: px
   */
  windowScreenHeight: 400 + 40,
  /**
   * アニメーション関連の設定値
   */
  animation: {
    /**
     * アニメーション画像横サイズ。
     */
    widthSize: 1000,
    /**
     * アニメーション画像縦サイズ。
     */
    heightSize: 1000,
    /**
     * アニメーション画像表示倍率。
     */
    scale: 0.4,
    /**
     * アニメーション再生フレームレート。
     */
    flameRate: 60,
  },
};
