<template>
  <div class="wrapper"></div>
  <div id="animation-area"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import { animationDestroy, animationPlay } from "@/animation";

export default defineComponent({
  name: "AnimationTest",
  components: {},
  setup() {
    onMounted(() => {
      animationPlay();
    });
    onBeforeUnmount(() => {
      animationDestroy();
    });
  },
});
</script>

<style scoped lang="scss"></style>
