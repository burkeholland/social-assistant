import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAppStore } from '@/stores/app'

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

      this.messages.push({ role: 'user', content: userMessage })
      this.userMessage = ''

      const result = await fetch('/api/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          groundingSource,
          messages
        })
      })

      const data = await result.json()

      if (result.status !== 200) {
        const app = useAppStore()
        app.setErrorMessage(data.body)
        return
      }

      this.usedTokens = data.usedTokens
      this.messages.push({ role: 'assistant', content: data.content })
    },
    deleteMessage(index) {
      this.messages.splice(index, 1)
    },
    setGroundingSource(content) {
      this.groundingSource = content
    }
  }
})
