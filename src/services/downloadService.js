export default {
  async downloadSourceContent(downloadUrl) {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ downloadUrl: downloadUrl })
    })

    const data = await response.json()

    if (response.status !== 200) {
      console.log('setting error')
      app.setErrorMessage(data.body)
      return
    }

    return data
  }
}
