/**
 * 本デスクトップマスコットプロジェクト内部で使用されるストーリーの進行度リスト。
 */
export const chapterDefinitionList = ["あらぬ噂", "都市怪談"];
/**
 * ストーリーの進行度リストのユニオン型。
 */
export type chapterType = typeof chapterDefinitionList[number];

/**
 * デフォルト(初期状態)のストーリーの進行度。
 */
export const defaultChapter = chapterDefinitionList[0];
