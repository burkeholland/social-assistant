import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useChatStore } from '@/stores/chat'

export const usePromptStore = defineStore('prompt', {
  state: () => ({
    prompts: ref([]),
    currentPrompt: ref('')
  }),
  actions: {
    async getPrompts() {
      const app = useAppStore()

      const response = await fetch('/api/prompts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.status !== 200) {
        app.setErrorMessage(data.body)
        return
      }

      this.prompts = data.body
    },
    setCurrentPrompt(id) {
      const chat = useChatStore()

      // get the prompt from the prompts array with the id that matches the id parameter
      const prompt = this.prompts.find((prompt) => prompt.id === id)

      // set the currentPrompt to the prompt that was found
      chat.userMessage = prompt.systemPrompt
    }
  }
})
