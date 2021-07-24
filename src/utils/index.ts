/**
 * ランダムな数値を生成する。
 * @param min 生成数値の最小値
 * @param max 生成数値の最大値
 */
export function GetRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}
