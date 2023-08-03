<script setup>
import { ref, onUpdated } from 'vue'
import { uid } from 'uid'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import completionService from '@/services/completionService'

import ChatMessage from '@/components/ChatMessage.vue'
import ChatBox from '@/components/ChatBox.vue'
import ChatLoading from '@/components/ChatLoading.vue'

const store = useAppStore()
const { groundingSource, userMessage } = storeToRefs(store)

const isWaitingForCompletion = ref(false)
const messages = ref([])
const chatThread = ref(null)

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

  const savedUserMessage = userMessage.value
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
    // restore the last user message
    store.userMessage = savedUserMessage
  }
}

function clearChat() {
  messages.value = []
}

onUpdated(() => {
  // scroll to the bottom of the chat thread
  chatThread.value.scrollTop = chatThread.value.scrollHeight
})
</script>

<template>
  <button
    class="button is-small is-danger is-align-self-flex-end mb-4 mr-4"
    v-if="messages.length > 0"
    @click="clearChat"
  >
    Clear Chat
  </button>
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
      >
      </ChatMessage>
    </div>
    <ChatLoading
      class="box message has-background-white system-message"
      v-if="isWaitingForCompletion"
    ></ChatLoading>
  </div>
  <div class="columns is-vcentered">
    <div class="column is-narrow">Temperature</div>
    <div class="column">
      <input class="slider is-full-width" step="1" min="0" max="100" value="50" type="range" />
    </div>
  </div>
  <ChatBox :getCompletion="getCompletion"></ChatBox>
</template>

<style scoped lang="scss">
.chat-thread {
  overflow: scroll;
  margin-bottom: 20px;
  max-height: calc(100vh - 200px);
  padding-bottom: 20px;
}

.message {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.user {
  background-color: #f5f5f5;
}

.assistant {
  background-color: #fff;
}
</style>
