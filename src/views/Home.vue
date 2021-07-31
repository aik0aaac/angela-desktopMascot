<template>
  <article class="animation">
    <animation-area class="animation-area" />
  </article>

  <!-- メニュー欄 -->
  <div class="menu">
    <change-character />
  </div>

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
import ChangeCharacter from "@/components/menu/ChangeCharacter.vue";

export default defineComponent({
  name: "Home",
  components: {
    AnimationArea,
    TalkButton,
    ChangeChapter,
    ChangeCharacter,
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

// メニュー欄
.menu
  position: absolute
  right: calc(var(--base-pixel) * 2)
  text-align: right

// コミュニケーション欄
.communication
  position: absolute
  right: calc(var(--base-pixel) * 2)
  bottom: 10%
  text-align: right
</style>
