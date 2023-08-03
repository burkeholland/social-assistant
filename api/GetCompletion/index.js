const authService = require('../services/authService')
const { marked } = require('marked')

module.exports = async function (context, req) {
  const { authorized, newContext } = authService.isUserAuthorized(req, context)
  if (!authorized) {
    return newContext
  }

  try {
    // read the source and prompt parameters from the body of the request. The body is www-form-urlencoded.
    let { groundingSource, messages, temperature } = req.body

    temperature = parseFloat(temperature)

    // strip out all HTML tags from the groudingSource to save space
    const groundingSourceText = groundingSource.replace(/(<([^>]+)>)/gi, '')

    // set the system prompt and ground the model
    const systemPrompt = {
      role: 'system',
      content: `You are a social assistant who writes creative content when given a source. You will politely decline any other requests from the user not related to creating content. If the source content is not provided, tell the user that they need to provide a source before you can answer any questions about it. You format all your responses as Markdown unless otherwise specified. You will ground your responses in the following source content: ${groundingSourceText}.`
    }

    // add the systemPrompt to the start of the messages array
    messages.unshift(systemPrompt)

    const response = await fetch(
      'https://chatterbox.openai.azure.com/openai/deployments/gpt-35-turbo-16k/chat/completions?api-version=2023-05-15',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_KEY
        },
        body: JSON.stringify({ messages: messages, temperature: temperature })
      }
    )

    const json = await response.json()

    if (response.status !== 200) {
      context.res = {
        status: response.status,
        body: { body: json.error.message }
      }
      return
    }

    // get the first choice from the response
    const responseContent = json.choices[0].message.content

    // parse the response with marked
    const parsedResponse = marked(responseContent)

    context.res = {
      status: response.status,
      body: {
        content: parsedResponse,
        contentPlain: responseContent,
        usedTokens: json.usage.total_tokens,
        availableTokens: 16384
      }
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: { body: error.message }
    }
  }
}
