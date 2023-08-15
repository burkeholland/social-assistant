const authService = require('../services/authService')
const promptsService = require('../services/promptsService')

module.exports = async function (context, req) {
  const clientPrincipal = authService.isUserAuthorized(req)
  if (clientPrincipal) {
  } else {
    context.res = {
      status: 401,
      body: 'Unauthorized'
    }
  }
}
