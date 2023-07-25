import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    downloadUrl: ref(''),
    sourceContent: ref({
      textContent: '',
    }),
  }),
  actions: {
    getSourceContent: async (state) => {
      const response = await fetch("/api/download", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: state.downloadUrl })
      });

      const data = await response.json();

      if (response.status === 200) {
        state.sourceContent = data.body;
      }
    }
  }
});