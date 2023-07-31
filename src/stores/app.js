import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    errorMessage: ref(''),
    groundingSource: ref(''),
    userMessage: ref(''),
    showEditor: ref(false)
  }),
  actions: {
    setErrorMessage(message) {
      this.errorMessage = message
    },
    setGroundingSource(content) {
      this.groundingSource = content
    },
    setUserMessage(message) {
      this.userMessage = message
    }
  }
})
