<script setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { userMessage, temperature } = storeToRefs(store)

function clearChatBox() {
  store.userMessage = ''
}

function getLastUserMessage() {
  // if the usermessage.value is empty, return the last item from the messages array where the role is user
  if (!userMessage.value) {
    const lastUserMessage = messages.value.filter((message) => message.role === 'user').pop()
    store.userMessage = lastUserMessage.content || ''
  }
}

defineProps({
  getCompletion: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="chat">
    <div class="columns is-vcentered mr-5 mb-0">
      <div class="column is-narrow">Temperature</div>
      <div class="column">
        <input class="slider" step=".1" min="0" max="2" v-model="temperature" type="range" />
      </div>
    </div>
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
          class="button is-primary is-block mb-2"
          :disabled="!userMessage"
          @click="getCompletion"
        >
          Send
        </button>
        <button class="button is-danger" :disabled="!userMessage" @click="clearChatBox">
          Clear
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
