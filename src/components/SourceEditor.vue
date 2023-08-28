<script setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { contextContent, showEditor } = storeToRefs(store)

function closeEditor() {
  store.showEditor = false
}
</script>

<template>
  <div class="modal" :class="{ 'is-active': showEditor }">
    <div class="modal-background" @click="closeEditor"></div>
    <div class="modal-card" id="editor">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Grounding Source</p>
      </header>
      <section class="modal-card-body">
        <div class="content source-content" contenteditable v-html="contextContent"></div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="closeEditor">Close</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
#editor {
  width: 80%;
  max-width: 960px;
}
</style>
