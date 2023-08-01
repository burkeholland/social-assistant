export default {
  async getCompletion(messages, groundingSource) {
    // create an array that contains only the role and content properties of each message
    const completionMessages = messages.map((message) => {
      return {
        role: message.role,
        content: message.content
      }
    })

    const result = await fetch('/api/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groundingSource: groundingSource,
        messages: completionMessages
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
    return {
      status: 200,
      usedTokens: data.usedTokens,
      content: data.content,
      contentPlain: data.contentPlain
    }
  }
}
