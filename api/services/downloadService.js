var { Readability } = require('@mozilla/readability')
var { JSDOM } = require('jsdom')
const { getSubtitles } = require('youtube-caption-extractor')

const downloadService = {
  downloadWebPageText: async (url) => {
    try {
      const response = await fetch(url)
      const html = await response.text()

      var doc = new JSDOM(html, {
        url: url
      })
      let reader = new Readability(doc.window.document)
      let article = reader.parse()

      let content = `<h1>${article.title}</h1>${article.content}`

      return { status: 200, body: { type: 'webpage', content: content } }
    } catch (error) {
      return { status: 500, body: error.message }
    }
  },

  downloadYouTubeCaptions: async (url) => {
    try {
      const videoId = extractVideoId(url)

      const videoCaptions = await getSubtitles({
        videoID: videoId,
        lang: 'en'
      })

      let formattedCaptions = ''

      videoCaptions.forEach((caption) => {
        // round the seconds to the nearest second
        caption.start = Math.round(caption.start)

        const formattedTime = formatTime(caption.start)
        formattedCaptions += `Timestamp: ${formattedTime}, Caption: ${caption.text}\n\n`
      })

      return {
        status: 200,
        body: { type: 'captions', content: formattedCaptions }
      }
    } catch (error) {
      return { status: 500, body: error.message }
    }
  }
}

function extractVideoId(url) {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/.*[&?#]v=)([\w-]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSeconds).padStart(2, '0')
  return `${formattedMinutes}:${formattedSeconds}`
}

module.exports = downloadService
