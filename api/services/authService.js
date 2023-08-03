const authService = {
  isUserAuthorized(req, context) {
    const header = req.headers['x-ms-client-principal']
    const encoded = Buffer.from(header, 'base64')
    const decoded = encoded.toString('ascii')
    const clientPrincipal = JSON.parse(decoded)

    // only allow users with a microsoft.com or github.com email address
    const domainIsApproved =
      clientPrincipal.userDetails &&
      (clientPrincipal.userDetails.endsWith('@microsoft.com') ||
        clientPrincipal.userDetails.endsWith('@github.com'))

    let response = {}

    if (domainIsApproved) {
      return { authorized: true, context: context }
    }

    context.res = {
      status: 401,
      body: {
        body: 'Unauthorized - Your login may have expired. Please log out and back in.'
      }
    }

    return { authorized: false, context: context }
  }
}

module.exports = authService
