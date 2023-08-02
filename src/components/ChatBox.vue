<script setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { userMessage } = storeToRefs(store)

defineProps({
  getCompletion: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="chat">
    <div class="columns is-vcentered">
      <div class="column">
        <textarea
          placeholder="Type your message here..."
          @keyup.enter="getCompletion"
          v-model="userMessage"
        >
        </textarea>
      </div>
      <div class="column is-narrow mr-5">
        <button
          class="button is-primary is-pulled-right"
          :disabled="!userMessage"
          @click="getCompletion"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat {
  border: 1px solid #ddd;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-top: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

.chat textarea {
  resize: none;
  min-width: 100%;
  border: none;
  height: 96px;
  font-size: 1rem;
  line-height: 1.5rem;
  outline: none;
  padding-right: 1rem;
}
</style>
