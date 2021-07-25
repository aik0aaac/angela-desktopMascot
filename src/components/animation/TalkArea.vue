<template>
  <section id="talk-area"></section>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "TalkArea",
  components: {},
});
</script>

<style lang="sass" scoped>
#talk-area
  max-width: var(--max-width)
  margin-top: calc(var(--base-pixel) * 4)
  padding: calc(var(--base-pixel) * 4)
  color: white
  font-size: var(--font-size)
  // 改行コードをそのまま反映、半角スペースは詰めて表示させる
  white-space: pre-wrap
  background-color: black
  border-radius: calc(var(--base-pixel) * 2)
  opacity: 0
  transition: .3s

  &:after
    left: 100%
    bottom: 20%
    border: solid transparent
    content: ""
    height: 0
    width: 0
    position: absolute
    pointer-events: none
  &:after
    border-color: rgba(0, 0, 0, 0)
    border-left-color: black
    border-width: 10px
    margin-top: -10px
</style>
