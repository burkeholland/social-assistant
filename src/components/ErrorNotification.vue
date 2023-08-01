<script setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { errorMessage } = storeToRefs(store)
</script>

<template>
  <div id="error" class="is-display-block notification is-danger" v-if="errorMessage">
    <button class="delete" @click="errorMessage = ''"></button>
    {{ errorMessage }}
  </div>
</template>

<style>
#error {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  margin: 0;
  left: 0;
}
</style>
