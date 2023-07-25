<script setup>
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'

const { userMessage, getCompletion } = storeToRefs(useChatStore())
</script>

<template>
  <textarea
    class="chat-box"
    placeholder="Type your message here..."
    v-model="userMessage"
    @keypress:enter="getCompletion"
  ></textarea>
</template>

<style scoped>
textarea.chat-box {
  resize: none;
  max-width: 1248px;
  width: 1248px;
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  height: 100px;
}
</style>
