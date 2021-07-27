<template>
  <article class="animation">
    <animation-area class="animation-area" />
  </article>

  <!-- コミュニケーション欄 -->
  <div class="communication">
    <!-- 会話ボタン -->
    <talk-button />
    <!-- ストーリー進行度変更 -->
    <change-chapter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AnimationArea from "@/components/animation/AnimationArea.vue";
import TalkButton from "@/components/communication/TalkButton.vue";
import ChangeChapter from "@/components/communication/ChangeChapter.vue";

export default defineComponent({
  name: "Home",
  components: {
    AnimationArea,
    TalkButton,
    ChangeChapter,
  },
});
</script>

<style lang="sass" scoped>
// アニメーション領域
.animation
  position: relative
  width: 100%
  &-area
    display: inline-block
    position: absolute
    right: calc(var(--base-pixel) * 2)
    padding-bottom: calc(val(--base-pixel) * 1)

// コミュニケーション欄
.communication
  position: absolute
  right: calc(var(--base-pixel) * 2)
  bottom: 5%
  text-align: right
</style>
