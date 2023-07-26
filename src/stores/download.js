import { useAppStore } from '@/stores/app'
import { useChatStore } from '@/stores/chat'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDownloadStore = defineStore('download', {
  state: () => ({
    downloadUrl: ref(''),
    sourceContent: ref({
      title: '',
      content: 'Paste content here...',
      textContent: ''
    })
  }),
  actions: {
    async downloadSourceContent() {
      const app = useAppStore()
      const chat = useChatStore()

      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ downloadUrl: this.downloadUrl })
      })

      const data = await response.json()

      if (response.status !== 200) {
        console.log('setting error')
        app.setErrorMessage(data.body)
        return
      }

      chat.setGroundingSource(data.body.content)
    }
  }
})
