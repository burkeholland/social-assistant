<script setup>
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'

const { groundingSource } = storeToRefs(useChatStore())
</script>

<template>
  <article class="panel is-success">
    <p class="panel-heading">Source</p>
    <div class="panel-block section">
      <content
        class="content"
        contenteditable
        id="source"
        placeholder="Paste source content here..."
        v-html="groundingSource"
      ></content>
    </div>
  </article>
</template>

<style scoped>
#source.content {
  border: none;
  width: 100%;
  height: 100%;
  overflow: scroll;
}

::-webkit-scrollbar {
  width: 0 !important;
}

.box-header {
  height: 20px;
  background-color: aqua;
  margin: -10px;
}
</style>
