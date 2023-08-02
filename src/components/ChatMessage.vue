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
  deleteMessage: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="is-pulled-right is-inline">
      <button
        class="delete"
        @click="deleteMessage(message.id)"
        v-if="message.role === 'user'"
      ></button>
      <button
        class="button"
        @click="copyMessage(message.contentPlain)"
        v-if="message.role === 'assistant'"
        title="Copy to clipbard"
      >
        <span v-if="showCopyNotification" class="mr-3">Copied!</span>
        <span v-else>Copy</span>
        <span class="icon is-small">
          <i class="fas fa-clipboard"></i>
        </span>
      </button>
    </div>
    <div class="columns">
      <div class="column is-narrow" v-if="message.role === 'assistant'">
        <span class="icon">
          <i class="fas fa-robot is-size-4"></i>
        </span>
      </div>
      <div class="column">
        <div class="content block" v-html="message.content" ref="message"></div>
      </div>
    </div>
  </div>
</template>
