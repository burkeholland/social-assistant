<script setup>
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'

const { userMessage } = storeToRefs(useChatStore())
const { getCompletion } = useChatStore()
</script>

<template>
  <div>
    <textarea
      class="chat-box"
      placeholder="Type your message here..."
      v-model="userMessage"
      @keyup.enter="getCompletion"
    ></textarea>
  </div>
</template>

<style scoped>
.chat-box {
  resize: none;
  min-width: 100%;
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  display: block;
  height: 150px;
  font-size: 1rem;
}

select {
  display: block;
}
</style>
