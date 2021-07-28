<template>
  <p id="talk-topic-area"></p>
  <p id="talk-area"></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TalkArea",
  components: {},
});
</script>

<style lang="sass" scoped>
#talk-topic-area
  display: inline-block
  max-width: var(--max-width)
  margin: calc(var(--base-pixel) * 4) 0 0 0
  padding: calc(var(--base-pixel) * 2)
  color: white
  font-size: var(--topic-font-size)
  text-align: left
  background-color: black
  opacity: 0
  transition: .3s

#talk-area
  max-width: var(--max-width)
  margin: 0
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
