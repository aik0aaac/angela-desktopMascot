<template>
  <enabled-click-element>
    <template #contents>
      <select
        v-model="state.selectedCharacter"
        class="change-character-select-list"
      >
        <option value="0">アンジェラ</option>
        <option value="1">ピエール</option>
        <!-- <option v-for="(chapter, i) in state.chapterList" :key="i">
          {{ chapter }}
        </option> -->
      </select>
    </template>
  </enabled-click-element>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, watch } from "vue";
import EnabledClickElement from "../common/EnabledClickElement.vue";
import { AnimationStoreKey, AnimationStore } from "@/store/animation";

/**
 * 会話トリガーボタンコンポーネント。
 */
export default defineComponent({
  name: "ChangeChapter",
  components: {
    EnabledClickElement,
  },
  setup() {
    // アニメーション再生&管理インスタンス用のStore処理を取得
    const animationStore = inject(AnimationStoreKey) as AnimationStore;

    const state = reactive<{
      selectedCharacter: number;
    }>({
      selectedCharacter: 0,
    });

    watch(
      // 選択中のチャプターが変化した時の処理
      () => state.selectedCharacter,
      () => {
        // 変更後の値をStore内部に登録
        animationStore.changeCharacter(state.selectedCharacter);
      }
    );

    return { state };
  },
});
</script>

<style scoped lang="sass">
.change-character-select-list
  display: block
  padding: calc(var(--base-pixel) * 2)
  color: white
  background-color: rgba(0, 0, 0, 1)
  border: none
  box-shadow: none
  opacity: var(--opacity)
  cursor: pointer
  z-index: 999
</style>
