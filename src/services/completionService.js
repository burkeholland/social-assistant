export default {
  async getCompletion(messages, groundingSource) {
    // create a new array that only contains the role and content properties from the messages array
    const messagesWithoutId = messages.map(({ id, ...keepProperties }) => keepProperties)

    const result = await fetch('/api/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groundingSource: groundingSource,
        messages: messagesWithoutId
      })
    })

    if (result.status !== 200) {
      return {
        status: result.status,
        content: 'There was an error with the completion service. Please try again.'
      }
    }

    const data = await result.json()

    data.usedTokens
    return { status: 200, usedTokens: data.usedTokens, content: data.content }
  }
}
