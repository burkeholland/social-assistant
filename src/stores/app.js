import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    errorMessage: ref(''),
    groundingSource: ref(''),
    sourceUrl: ref(''),
    userMessage: ref(''),
    showEditor: ref(false)
  }),
  actions: {
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
