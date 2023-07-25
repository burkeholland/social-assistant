
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAppStore } from '@/stores/app'

export const useChatStore = defineStore('chat', {
  state: () => ({
    userMessage: '',
    messages: ref([
      { role: 'user', content: '' },
    ]),
  }),
  actions: {
    async getCompletion() {
      this.messages.push({ role: 'user', content: userMessage });

      const result = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages
        })
      });

      const data = await result.json();

      if (result.status !== 200) {
        const app = useAppStore();
        app.setErrorMessage(data.body);
        return;
      }

      this.messages.push({ role: 'assistant', content: data.content });
    },
    setSourceMessage(message) {
      this.messages[0] = message;
    }
  }
});