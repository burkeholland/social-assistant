<script setup>
import { ref, onUpdated, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'

import ChatMessage from '../components/ChatMessage.vue'
import PromptLibrary from '../components/PromptLibrary.vue'

const { messages, usedTokens, userMessage } = storeToRefs(useChatStore())
const { getCompletion } = useChatStore()

const chatThread = ref(null)

watchEffect(() => {
  // const id = messages.value.length - 1
  // console.log(id)
  // const el = document.getElementById(`"${id}"`)
  // if (el) {
  //   el.scrollIntoView({ behavior: 'smooth' })
  // }
})
</script>

<template>
  <div class="mt-5 is-flex-grow-1">
    <div class="columns is-full-height">
      <div class="column is-two-quarter">
        <PromptLibrary></PromptLibrary>
      </div>
      <div class="column is-three-quarters is-flex is-flex-direction-column">
        <div ref="chatThread" class="chat-thread is-flex-grow-1">
          <div v-for="(message, index) in messages" :key="message.id" class="block">
            <ChatMessage
              v-if="message.role === 'assistant'"
              class="box has-background-light message system-message"
              :message="message"
              :index="index"
              :id="message.id"
            ></ChatMessage>
            <ChatMessage
              v-else
              class="box has-background-white message user-message"
              :message="message"
              :index="index"
              :id="message.id"
            ></ChatMessage>
          </div>
        </div>
        <div class="chat-footer">
          <textarea
            class="chat-box"
            placeholder="Type your message here..."
            v-model="userMessage"
            @keyup.enter="getCompletion"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.chat-thread {
  overflow: scroll;
  margin-bottom: 20px;
  max-height: calc(100vh - 330px);
  padding-bottom: 20px;
}

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

/* the user message and system message should have different backgrounds */
.user-message {
  background-color: #f5f5f5;
  margin-left: 5rem;
  margin-right: 1rem;
}

.system-message {
  background-color: #fff;
  margin-right: 1rem;
}
</style>
