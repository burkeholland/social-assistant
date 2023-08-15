const authService = require('../services/authService')
const promptsService = require('../services/promptsService')

module.exports = async function (context, req) {
  const clientPrincipal = authService.isUserAuthorized(req)
  if (clientPrincipal) {
    try {
      // get all the prompts from the database
      const resources = await promptsService.getPrompts()

      // return the prompts to the client
      context.res = {
        body: { body: resources }
      }
    } catch (error) {
      context.res = {
        status: 500,
        body: error.message
      }
    }
  } else {
    context.res = {
      status: 401,
      body: 'Unauthorized'
    }
  }
}
