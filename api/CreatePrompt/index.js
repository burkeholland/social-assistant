const promptsService = require('../services/promptsService')
const authService = require('../services/authService')

module.exports = async function (context, req) {
  try {
    const clientPrincipal = authService.isUserAuthorized(req)
    if (clientPrincipal === null) {
      return unauthorizedResponse(context)
    }

    const { title, category, text, isPublic } = req.body

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
      isPublic,
      clientPrincipal.userId
    )

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: createdItem
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message
    }
  }
}

function unauthorizedResponse(context) {
  context.res = {
    status: 401,
    body: 'Unauthorized'
  }
}
