<script setup>
import { onUpdated, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { tempGroundingSource, showEditor } = storeToRefs(store)

function closeEditor() {
  store.tempGroundingSource = store.groundingSource
  store.showEditor = false
}
</script>

<template>
  <div class="modal" :class="{ 'is-active': showEditor }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Grounding Source</p>
      </header>
      <section class="modal-card-body">
        <div class="content source-content" contenteditable v-html="tempGroundingSource"></div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="closeEditor">Close</button>
      </footer>
    </div>
  </div>
</template>
