const promptsService = require('../services/promptsService')
const authService = require('../services/authService')

module.exports = async function (context, req) {
  const clientPrincipal = authService.isUserAuthorized(req, context)
  if (clientPrincipal === null) {
    return unauthorizedResponse(context)
  }

  const { title, category, text } = req.body

  const promptItem = await promptsService.getPromptByTitle(title)

  if (promptItem.length > 0) {
    context.res = {
      status: 409,
      body: { body: 'Prompt already exists' }
    }
    return
  }

  const createdItem = await promptsService.createPrompt(
    title,
    category,
    text,
    clientPrincipal.userId
  )

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: createdItem
  }
}

function unauthorizedResponse(context) {
  context.res = {
    status: 401,
    body: 'Unauthorized'
  }
}
