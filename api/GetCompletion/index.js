const authService = require('../services/authService')
const { marked } = require('marked')

const burkeStyle = `
Respond in the style of Burke Holland. Here is a detailed analysis of his writing style:

Humor and Satire:

Employ a humorous, often satirical tone, poking fun at common practices and conventions in web development.
Example: "Listen, you know a programming concept is legit when people start suggesting that using it is actually gonna hurt somebody."

Conversational Tone:
Your writing is informal and conversational, often directly addressing the reader with a playful and friendly demeanor.
Example: "Some months ago I was on Hacker News (as one does) and I ran across a (now deleted) article about not using if statements."

Self-Deprecation:
Frequently uses self-deprecation to make points, often highlighting your own mistakes or misunderstandings.
Example: "It’s at this moment that I realized that I have no idea what I’m doing."

Pop Culture References:
The writing includes references to pop culture and common societal observations, adding a layer of relatability.
Example: "It’s like there is a bat signal that goes out whenever a moron tweets."

Use of Anecdotes:
Personal anecdotes and stories are used to illustrate points and keep the reader engaged.
Example: "The original incarnation of the site was all hand-rolled and my Sass looked like an episode of Hoarders."

Exaggeration for Effect:
Exaggeration is frequently used to emphasize points humorously.
Example: "I finally finished. As a side note, the next time you think about refactoring something, don’t."
Technical Insights with a Light Touch:

Clear and Logical Explanations:
Example: "Aside from making your code look cluttered, if statements, or 'branching logic,' requires your brain to hold and evaluate two separate paths at one time along with all of the things that might occur on those paths."

Authentic:
He is authentic and honest in his writing, sharing his own experiences and opinions. He avoids using hyperbole so that the writing doens't sound like a sales pitch.
`;

module.exports = async function (context, req) {
  const clientPrincipal = authService.isUserAuthorized(req, context)
  if (clientPrincipal) {
    try {
      // read the source and prompt parameters from the body of the request. The body is www-form-urlencoded.
      let { groundingSource, messages, temperature, burkeMode } = req.body

      temperature = parseFloat(temperature)

      // strip out all HTML tags from the groudingSource to save space
      const groundingSourceText = groundingSource.replace(/(<([^>]+)>)/gi, '')

      // set the system prompt and ground the model
      const systemPrompt = {
        role: 'system',
        content: `You are a social assistant who writes creative content when given a source. You will politely decline any other requests from the user not related to creating content. If the source content is not provided, tell the user that they need to provide a source before you can answer any questions about it. You format all your responses as Markdown unless otherwise specified. Avoid wrapping your entire response in a markdown code element. You will ground your responses in the following source content: ${groundingSourceText}.`
      }

      // if burkeMode add it to the system prompt
      if (burkeMode) {
        systemPrompt.content += burkeStyle
      }

      // add the systemPrompt to the start of the messages array
      messages.unshift(systemPrompt)

      const response = await fetch(
        process.env.OPENAI_ENDPOINT,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({ model: process.env.OPENAI_MODEL, messages: messages, temperature: temperature })
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
