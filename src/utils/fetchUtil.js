export default {
  async get(url) {
    const result = await this._fetch('GET', url)
    return result
  },
  async post(url, body) {
    const result = await this._fetch('POST', url, body)
    return result
  },
  async put(url, body) {
    const result = await this._fetch('PUT', url, body)
    return result
  },
  async delete(url) {
    const result = await this._fetch('DELETE', url)
    return result
  },
  async _fetch(method, url, body) {
    try {
      let options = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      if (body) {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(url, options)

      const data = await response.json()
      return { status: response.status, body: data.body }
    } catch (error) {
      throw new Error({ status: 500, content: body.message })
    }
  }
}
