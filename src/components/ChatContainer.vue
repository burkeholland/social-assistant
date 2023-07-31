<script setup>
import { useAppStore } from '@/store/appStore'
import { storeToRefs } from 'pinia'

const { appStore } = useAppStore()
const { groundingSource, userMessage } = storeToRefs(appStore)

import ChatThread from '@/components/ChatThread.vue'
import PromptLibrary from '@/components/PromptLibrary.vue'

defineProps({
  groundingSource: {
    type: String,
    required: true
  }
})

</script>


<template>
  <div class="columns is-full-height">
    <div class="column is-two-quarter">
      <PromptLibrary @setUserMessage="setUserMessage"></PromptLibrary>
    </div>
    <div class="column is-three-quarters is-flex is-flex-direction-column">
      <ChatThread :userMessage="userMessage"></ChatThread>
    </div>
  </div>
</template>