import fetchUtil from '../utils/fetchUtil'

export default {
  async getPrompts() {
    const result = await fetchUtil.get('/api/prompts')
    return result.body
  },
  async getPrompt(id) {},
  async savePrompt(id, title, category, text) {
    let result = {}
    if (id) {
      result = await this.updatePrompt(id, title, category, text)
    } else {
      result = await this.createPrompt(title, category, text)
    }
    return result
  },
  async updatePrompt(id, title, category, text) {
    const result = await fetchUtil.put(`/api/prompts/${id}`, {
      title,
      category,
      text
    })
    return result.body
  },
  async createPrompt(title, category, text) {
    const result = await fetchUtil.post('/api/prompts', {
      title,
      category,
      text
    })
    return result
  },
  async deletePrompt(id) {
    const result = await fetchUtil.delete(`/api/prompts/${id}`)
    return result
  }
}
