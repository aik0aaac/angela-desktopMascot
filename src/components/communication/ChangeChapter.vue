<template>
  <enabled-click-element>
    <template #contents>
      <select
        v-model="state.selectedChapter"
        class="change-chapter-select-list"
      >
        <option v-for="(chapter, i) in state.chapterList" :key="i">
          {{ chapter }}
        </option>
      </select>
    </template>
  </enabled-click-element>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, watch } from "vue";
import EnabledClickElement from "../common/EnabledClickElement.vue";
import { AnimationStoreKey, AnimationStore } from "@/store/animation";
import { chapterType, chapterDefinitionList } from "@/definition/chapter";

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
      selectedChapter: chapterType;
      chapterList: chapterType[];
    }>({
      selectedChapter: animationStore.getChapter(),
      chapterList: chapterDefinitionList,
    });

    watch(
      // 選択中のチャプターが変化した時の処理
      () => state.selectedChapter,
      () => {
        // 変更後の値をStoreないに登録
        animationStore.changeChapter(state.selectedChapter);
      }
    );

    return { state };
  },
});
</script>

<style scoped lang="sass">
.change-chapter-select-list
  display: block
  padding: calc(var(--base-pixel) * 2)
  color: white
  background-color: rgba(0, 0, 0, 1)
  border: none
  box-shadow: none
  opacity: var(--opacity)
  cursor: pointer
</style>
