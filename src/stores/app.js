
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    errorMessage: ref(''),
  }),
  actions: {
    setErrorMessage(message) {
      this.errorMessage = message;
    }
  }
});