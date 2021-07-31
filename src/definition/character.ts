import { angelaRoopAnimationList } from "@/animation/angela/roopAnimationList";
import { angelaTalkData } from "@/animation/angela/talkData";
import { pierreRoopAnimationList } from "@/animation/pierre/roopAnimationList";
import { pierreTalkData } from "@/animation/pierre/talkData";
import { CharacterData } from "@/animation/types";

const angelaCharacterData: CharacterData = {
  ssfbFilePath: "/animation/angela/angela.ssfb",
  roopAnimationList: angelaRoopAnimationList,
  talkData: angelaTalkData,
};
const pierreCharacterData: CharacterData = {
  ssfbFilePath: "/animation/pierre/pierre.ssfb",
  roopAnimationList: pierreRoopAnimationList,
  talkData: pierreTalkData,
};

/**
 * 本デスクトップマスコットプロジェクト内部で使用されるキャラクターデータ。
 */
export const characterList: CharacterData[] = [
  angelaCharacterData,
  pierreCharacterData,
];

/**
 * デフォルト(初期状態で再生されるキャラ)のキャラクターデータ。
 */
export const defaultCharacter = angelaCharacterData;
