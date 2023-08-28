const authService = require('../services/authService')
const { marked } = require('marked')

module.exports = async function (context, req) {
  const clientPrincipal = authService.isUserAuthorized(req, context)
  if (clientPrincipal) {
    try {
      // read the source and prompt parameters from the body of the request. The body is www-form-urlencoded.
      let { contextContent, referenceContent, messages, temperature } = req.body

      temperature = parseFloat(temperature)

      // strip out all HTML tags from the groudingSource to save space
      const contextContentText = contextContent.replace(/(<([^>]+)>)/gi, '')
      const referenceContentText = referenceContent.replace(/(<([^>]+)>)/gi, '')

      // set the system prompt and ground the model
      const systemPrompt = {
        role: 'system',
        content: `You are a social media assistant who writes creative content. You wll be provided with a source that is delimited by three single quotes. 
        
        '''${contextContentText}'''

        You will format your responses by imitating the writing style provided in the style reference. The style reference is delimited by three back slashes.

        ///${referenceContentText}///`
      }

      // add the systemPrompt to the start of the messages array
      messages.unshift(systemPrompt)

      const response = await fetch(
        process.env.AZURE_OPENAI_ENDPOINT,
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
      const parsedResponse = marked(responseContent, { mangle: false, headerIds: false })

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
  } else {
    context.res = {
      status: 401,
      body: 'Unauthorized'
    }
  }
}
