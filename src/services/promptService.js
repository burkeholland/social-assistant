import fetchUtil from '../utils/fetchUtil'

export default {
  async getPrompts(userId) {
    const result = await fetchUtil.get(`/api/prompts/${userId}`)
    return result.body
  },
  async getPrompt(id) { },
  async savePrompt(id, title, category, text, isPublic) {
    let result = {}
    if (id) {
      result = await this.updatePrompt(id, title, category, text, isPublic)
    } else {
      result = await this.createPrompt(title, category, text, isPublic)
    }
    return result
  },
  async updatePrompt(id, title, category, text, isPublic) {
    const result = await fetchUtil.put(`/api/prompts/${id}`, {
      title,
      category,
      text,
      isPublic
    })
    return result
  },
  async createPrompt(title, category, text, isPublic) {
    const result = await fetchUtil.post('/api/prompts', {
      title,
      category,
      text,
      isPublic
    })
    return result
  },
  async deletePrompt(id) {
    const result = await fetchUtil.delete(`/api/prompts/${id}`)
    return result
  }
}
