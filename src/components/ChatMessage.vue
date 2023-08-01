<script setup>
import { ref } from 'vue'

const showCopyNotification = ref(false)

async function copyMessage(content) {
  await navigator.clipboard.writeText(content)
  showCopyNotification.value = true

  setTimeout(() => {
    showCopyNotification.value = false
  }, 2000)
}

defineProps({
  message: {
    type: Object,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  deleteMessage: {
    type: Function,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="columns">
      <div class="column is-narrow" v-if="role === 'assistant'">
        <span class="icon">
          <i class="fas fa-robot is-size-4"></i>
        </span>
      </div>
      <div class="column">
        <div class="content block" v-html="message.content"></div>
      </div>
      <div class="column is-narrow">
        <button class="delete" @click="deleteMessage(id)" v-if="role === 'user'"></button>
        <button
          class="button"
          @click="copyMessage(message.content)"
          v-if="role === 'assistant'"
          title="Copy to clipbard"
        >
          <span v-if="showCopyNotification" class="mr-3">Copied to clipboard!</span>
          <span class="icon is-small">
            <i class="fas fa-clipboard"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#copiedNotification {
}
</style>
