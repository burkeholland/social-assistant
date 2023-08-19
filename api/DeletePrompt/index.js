const authService = require('../services/authService')
const promptsService = require('../services/promptsService')

module.exports = async function (context, req) {
  try {
    const clientPrincipal = authService.isUserAuthorized(req)
    if (clientPrincipal === null) {
      return unauthorizedResponse(context)
    }

    const { id } = req.params

    // make sure the user has the right to delete this item by checking to see if the item in the database has their user id associated with it
    const prompt = await promptsService.getPrompt(id)


    if (prompt.userId !== clientPrincipal.userId) {
      return unauthorizedResponse(context)
    }

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
