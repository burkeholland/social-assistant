import { useAppStore } from '@/stores/app'

export default {
  async getPrompts() {
    const appStore = useAppStore()

    const response = await fetch('/api/prompts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (response.status !== 200) {
      appStore.setErrorMessage(data.body)
      return
    }

    return data.body
  }
}
