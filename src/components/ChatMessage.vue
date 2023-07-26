<script setup>
import { useChatStore } from '@/stores/chat'

const { deleteMessage } = useChatStore()

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div>
    <div>
      <button
        class="delete is-pulled-right"
        @click="
          () => {
            deleteMessage(index)
          }
        "
      ></button>
    </div>
    <div class="content" v-html="message.content"></div>
  </div>
</template>
