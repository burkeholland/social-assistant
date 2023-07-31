import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAppStore } from '@/stores/app'
import { uid } from 'uid'

export const useChatStore = defineStore('chat', {
  state: () => ({
    userMessage: '',
    groundingSource: '',
    messages: [],
    usedTokens: 0
  }),
  actions: {
    async getCompletion() {
      const { groundingSource, userMessage, messages } = this

      this.messages.push({ id: uid(), role: 'user', content: userMessage })
      this.userMessage = ''

      // create a new array that only contains the role and content properties from the messages array
      const messagesWithoutId = messages.map(({ id, ...keepProperties }) => keepProperties)

      console.log(messagesWithoutId)

      const result = await fetch('/api/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          groundingSource,
          messages: messagesWithoutId
        })
      })

      const data = await result.json()

      if (result.status !== 200) {
        const app = useAppStore()
        app.setErrorMessage(data.body)
        return
      }

      this.usedTokens = data.usedTokens
      this.messages.push({ id: uid(), role: 'assistant', content: data.content })
    },
    addMessage(role, content) {
      this.messages.push({ id: uid(), role, content })
    },
    deleteMessage(index) {
      this.messages.splice(index, 1)
    },
    setGroundingSource(content) {
      this.groundingSource = content
    }
  }
})
