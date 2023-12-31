const authService = {
  isUserAuthorized(req) {
    try {
      const header = req.headers['x-ms-client-principal']
      const encoded = Buffer.from(header, 'base64')
      const decoded = encoded.toString('ascii')
      const clientPrincipal = JSON.parse(decoded)

      // only allow users with a microsoft.com or github.com email address
      const domainIsApproved =
        clientPrincipal.userDetails &&
        (clientPrincipal.userDetails.endsWith('@microsoft.com') ||
          clientPrincipal.userDetails.endsWith('@github.com'))

      if (domainIsApproved) {
        return clientPrincipal
      }

      return null
    } catch {
      return null
    }
  }
}

module.exports = authService
