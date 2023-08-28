export default {
  async getCompletion(contextContent, referenceContent, messages, temperature) {
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
        contextContent: contextContent,
        referenceContent: referenceContent,
        messages: completionMessages,
        temperature: temperature
      })
    })

    if (result.status === 500) {
      return {
        status: result.status,
        content:
          'The server returned an internal error. This happens with the Azure OpenAI services sometimes. Try your request again.'
      }
    }

    const data = await result.json()

    if (result.status !== 200) {
      return {
        status: result.status,
        content: data.body
      }
    }

    data.usedTokens
    return {
      status: 200,
      usedTokens: data.usedTokens,
      content: data.content,
      contentPlain: data.contentPlain
    }
  }
}
