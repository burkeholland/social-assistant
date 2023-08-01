<script setup>
import { ref } from 'vue'
import { uid } from 'uid'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import completionService from '@/services/completionService'
import ChatMessage from '@/components/ChatMessage.vue'

const store = useAppStore()
const { groundingSource, userMessage } = storeToRefs(store)

const isWaitingForCompletion = ref(false)
const messages = ref([])

function deleteMessage(id) {
  // delete the message with the id passed as well as the one right after it in the messages array
  // this is because the message with the id is the user message and the one after it is the assistant message
  const index = messages.value.findIndex((message) => message.id === id)
  messages.value.splice(index, 2)
}

async function getCompletion() {
  // dont let the user add another message until the previous one is complete
  if (isWaitingForCompletion.value) {
    return
  }

  isWaitingForCompletion.value = true

  messages.value.push({ id: uid(), role: 'user', content: userMessage.value })

  store.userMessage = ''

  try {
    let completion = await completionService.getCompletion(messages.value, groundingSource.value)

    if (completion.status !== 200) {
      // remove the last message from the messages array because it was not a valid message
      messages.value.pop()
      // show the app error message
      store.errorMessage = completion.content
    } else {
      messages.value.push({
        id: uid(),
        role: 'assistant',
        content: completion.content,
        contentPlain: completion.contentPlain
      })
    }

    isWaitingForCompletion.value = false
  } catch (error) {
    // remove the last message from the messages array because it was not a valid message
    messages.value.pop()
    // show the app error message
    store.errorMessage = error.message
    isWaitingForCompletion.value = false
  }
}
</script>

<template>
  <div ref="chatThread" class="chat-thread is-flex-grow-1">
    <div class="box message has-background-white system-message">
      <div class="columns is-vcentered">
        <div class="column is-narrow">
          <span class="icon">
            <i class="fas fa-robot is-size-4"></i>
          </span>
        </div>
        <div class="column">
          Hello! I am your social assistant. I can help you with all things social. Enter a URL on
          the left and click "Set Source" so I know what to create content about.
        </div>
      </div>
    </div>
    <div v-for="message in messages" :key="message.id" class="block" :id="message.id">
      <ChatMessage
        class="box message"
        :class="message.role"
        :message="message"
        :deleteMessage="deleteMessage"
      ></ChatMessage>
    </div>
    <div class="box message has-background-white system-message" v-if="isWaitingForCompletion">
      <div class="columns is-vcentered">
        <div class="column is-narrow">
          <span class="icon">
            <i class="fas fa-robot is-size-4" bounce></i>
          </span>
        </div>
        <div class="column">Thinking...</div>
      </div>
    </div>
  </div>
  <div class="chat">
    <div class="columns">
      <div class="column">
        <textarea
          placeholder="Type your message here..."
          @keyup.enter="getCompletion"
          v-model="userMessage"
        >
        </textarea>
      </div>
      <div class="column is-narrow mr-5 mt-5">
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

<style>
.chat-thread {
  overflow: scroll;
  margin-bottom: 20px;
  max-height: calc(100vh - 100px);
  padding-bottom: 20px;
}

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

.message {
  margin-left: 1rem;
  margin-right: 1rem;
}

.user {
  background-color: #f5f5f5;
}

.assistant {
  background-color: #fff;
}
</style>
