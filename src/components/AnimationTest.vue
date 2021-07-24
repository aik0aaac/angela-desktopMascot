<template>
  <div id="animation-area"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import { AngelaAnimation, angelaPlayAnimeDataList } from "@/animation/angela";

export default defineComponent({
  name: "AnimationTest",
  components: {},
  setup() {
    let testAnimation: AngelaAnimation;
    onMounted(() => {
      testAnimation = new AngelaAnimation("animation-area");
    });
    onBeforeUnmount(() => {
      testAnimation.animationDestroy();
    });
  },
});
</script>

<style scoped lang="sass"></style>
