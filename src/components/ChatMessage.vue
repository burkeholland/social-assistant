<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const showCopyNotification = ref(false)

async function copyMessage(content) {
  await navigator.clipboard.writeText(content)
  showCopyNotification.value = true

  setTimeout(() => {
    showCopyNotification.value = false
  }, 2000)
}

function openPromptEditor() {
  store.initPromptState(null, '', '', props.message.content)

  store.showPromptEditor = true
}

const props = defineProps({
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
    <div class="mb-2">
      <div class="is-flex is-justify-content-space-between is-align-items-center" v-if="message.role === 'user'">
        <button class="button is-small" @click="openPromptEditor" title="Save prompt">
          <span>Save</span>
          <span class="icon is-small">
            <i class="fas fa-save"></i>
          </span>
        </button>
        <div class="is-align-self-end">
          <button class="delete is-align-self-flex-end is-block" @click="deleteMessage(message.id)"></button>
        </div>
      </div>
      <div v-else>
        <button class="button is-small" @click="copyMessage(message.contentPlain)" title="Copy to clipbard">
          <span v-if="showCopyNotification" class="mr-3">Copied!</span>
          <span v-else>Copy</span>
          <span class="icon is-small">
            <i class="fas fa-clipboard"></i>
          </span>
        </button>
      </div>
    </div>
    <div v-if="message.role === 'assistant'" class="content message-content"
      v-html="message.content.replace(/(\r\n|\n|\r)/gm, '')" ref="message"></div>
    <div v-else class="content message-content" v-html="message.content" ref="message"></div>
  </div>
</template>

<style>
.content pre {
  white-space: pre-wrap;
}

.content.message-content {
  white-space: pre-wrap;
}
</style>
