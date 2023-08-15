const authService = require('../services/authService')
const promptsService = require('../services/promptsService')

module.exports = async function (context, req) {
  try {
    const clientPrincipal = authService.isUserAuthorized(req)
    if (clientPrincipal === null) {
      return unauthorizedResponse(context)
    }

    const { id } = req.params

    const response = await promptsService.deletePrompt(id)

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: { id: response }
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
