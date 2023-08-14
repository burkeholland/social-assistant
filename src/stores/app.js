import { ref } from 'vue'
import { defineStore } from 'pinia'
import { prompt } from '@/stores/models'

export const useAppStore = defineStore('app', {
  // All app state is stored here so it can be easily saved to local
  // storage and rehydrated when the app is loaded
  state: () => {
    return {
      errorMessage: '',
      groundingSource: '',
      sourceUrl: '',
      userMessage: '',
      showEditor: false,
      temperature: 1.0,
      showPromptEditor: false,
      messages: [],
      promptToSave: {
        id: '',
        title: '',
        category: '',
        text: ''
      }
    }
  },
  actions: {
    initPromptState(id, title, category, text) {
      this.promptToSave = { id, title, category, text }
    },
    setErrorMessage(message) {
      this.errorMessage = message
    },
    hydrateState(state) {
      if (state) {
        // loop over the state object and assign the values on the pinia state object
        Object.keys(state).forEach((key) => {
          this[key] = state[key]
        })
      }

      // clear the error message - we don't need that anymore
      this.errorMessage = ''
    }
  }
})
