const authService = require('../services/authService')
const promptsService = require('../services/promptsService')

module.exports = async function (context, req) {
  const clientPrincipal = authService.isUserAuthorized(req, context)
  if (clientPrincipal === null) {
    return unauthorizedResponse(context)
  }

  const { id } = req.params
  const { title, category, text } = req.body

  // first, see if the item exists in the database already
  const existingPrompt = await promptsService.getPrompt(id)

  // the prompt already exists, so we need to check to see if the user has the right to update it
  if (existingPrompt === null || existingPrompt.userId !== clientPrincipal.userId) {
    return unauthorizedResponse(context)
  }

  const resource = await promptsService.savePrompt(
    id,
    title,
    category,
    text,
    clientPrincipal.userId
  )

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  }
}
