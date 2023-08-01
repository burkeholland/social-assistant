<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import downloadService from '@/services/downloadService'

const store = useAppStore()
const { groundingSource, errorMessage } = storeToRefs(store)

const downloadUrl = ref('')
const isLoading = ref(false)
const isInvalid = ref(false)
const groundingSourceIsSet = ref(false)

async function downloadSource() {
  try {
    new URL(downloadUrl.value)
  } catch {
    isInvalid.value = true
    return
  }

  try {
    isInvalid.value = false
    isLoading.value = true

    const data = await downloadService.downloadSourceContent(downloadUrl.value)
    store.groundingSource = data.body.content

    isLoading.value = false
    groundingSourceIsSet.value = true
  } catch (error) {
    store.errorMessage = error.message
    isLoading.value = false
  }
}

function showEditor() {
  store.showEditor = true
}

function clearGroundingSource() {
  store.groundingSource = ''
  groundingSourceIsSet.value = false
}
</script>

<template>
  <div>
    <p>Enter the URL for your source content</p>
    <div class="field has-addons mt-2">
      <div class="control is-expanded">
        <input
          class="input is-success is-small"
          type="text"
          placeholder="YouTube video, Release notes, Documentation, etc."
          v-model="downloadUrl"
        />
      </div>
      <div class="control" v-if="!groundingSourceIsSet">
        <button
          class="button is-primary is-pulled-right is-small"
          :class="{ 'is-loading': isLoading }"
          :disabled="!downloadUrl"
          @click="downloadSource"
        >
          Set Source
        </button>
      </div>
      <div class="control" v-if="groundingSourceIsSet">
        <button class="button is-primary is-small" @click="showEditor">Edit</button>
      </div>
      <div class="control" v-if="groundingSourceIsSet">
        <button class="button is-danger is-small" @click="clearGroundingSource">Clear</button>
      </div>
    </div>
    <div v-if="isInvalid">
      <p class="is-size-7 has-text-danger">
        Please enter a valid URL with the protocal (http/https)
      </p>
    </div>
    <div v-if="groundingSourceIsSet">
      <span
        >Chat now grounded in <a :href="downloadUrl">{{ downloadUrl }}</a></span
      >
    </div>
  </div>
</template>
