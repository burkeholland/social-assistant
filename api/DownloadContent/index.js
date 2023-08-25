const authService = require('../services/authService')
const downloadService = require('../services/downloadService')

module.exports = async function download(context, req) {
  const clientPrincipal = authService.isUserAuthorized(req, context)
  if (clientPrincipal) {
    try {
      // parse the id off the body
      const { downloadUrl } = req.body

      let result = { status: 200, body: '' }

      // if the url is a youtube url
      if (downloadUrl.includes('youtube') || downloadUrl.includes('youtu.be')) {
        result = await downloadService.downloadYouTubeCaptions(downloadUrl)
      } else if (downloadUrl.includes('github.com') && downloadUrl.includes('/releases/')) {
        result = await downloadService.downloadGitHubRelease(downloadUrl)
      } else {
        // otherwise we assume its a webpage and try to download the text
        result = await downloadService.downloadWebPageText(downloadUrl)
      }

      context.res = {
        status: result.status,
        body: { body: result.body }
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
