var { Readability } = require('@mozilla/readability')
var { JSDOM } = require('jsdom')
const { getSubtitles } = require('youtube-caption-extractor')
const { google } = require('googleapis');

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
      const videoId = extractVideoId(url);

      const videoCaptions = await getSubtitles({
        videoID: videoId,
        lang: 'en'
      });

      const comments = await downloadYouTubeComments(videoId);

      let formattedContent = 'Captions:\n';
      videoCaptions.forEach((caption) => {
        const formattedTime = formatTime(Math.round(caption.start));
        formattedContent += `Timestamp: ${formattedTime}, Caption: ${caption.text}\n\n`;
      });

      formattedContent += '\nComments:\n' + comments;

      return {
        status: 200,
        body: { type: 'captions_and_comments', content: formattedContent }
      };
    } catch (error) {
      return { status: 500, body: error.message };
    }
  },

  downloadGitHubRelease: async (url) => {
    try {
      const response = await fetch(url)
      const html = await response.text()
      const dom = new JSDOM(html);

      const releaseName = getGitHubReleaseTitle(dom);
      const relatedIssuesUrl = getRelatedGitHubIssuesUrls(dom);
      const relatedIssues = await getRelatedGitHubIssues(relatedIssuesUrl);
      const gitHubReleaseHtml = buildGitHubReleaseHtml(releaseName, relatedIssues);

      return { status: 200, body: { type: 'webpage', content: gitHubReleaseHtml } }
    }
    catch (error) {
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

function getGitHubReleaseTitle(dom) {
  return dom.window.document.querySelector('#repo-content-turbo-frame h1').textContent;
}

function getRelatedGitHubIssuesUrls(dom) {
  const releaseBodyElement = dom.window.document.querySelector('#repo-content-turbo-frame [data-test-selector="body-content"]');
  const links = releaseBodyElement.querySelectorAll('a.issue-link');
  const linkedIssuesUrls = [];
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href.indexOf('/issues/') > -1) {
      linkedIssuesUrls.push(href);
    }
  });
  return linkedIssuesUrls;
}

async function getRelatedGitHubIssues(issuesUrls) {
  const issues = await Promise.all(issuesUrls.map(async url => {
    const response = await fetch(url)
    const html = await response.text()
    const dom = new JSDOM(html);
    const title = dom.window.document.querySelector('#partial-discussion-header .js-issue-title').textContent;
    const body = dom.window.document.querySelector('.js-comment-body').textContent;
    return {
      title,
      body
    };
  }));
  return issues;
}

function buildGitHubReleaseHtml(releaseName, issues) {
  const html = `
<html>
<head>
  <title>${releaseName}</title>
</head>
<body>
<h1>${releaseName}</h1>

${issues.map(issue => `
<h2>${issue.title}</h2>
<p>${issue.body}</p>
`)}
</body>
</html>
  `;
  return html;
}

async function downloadYouTubeComments(videoId) {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
  });

  let comments = '';
  let nextPageToken = null;

  do {
    const response = await youtube.commentThreads.list({
      part: 'snippet',
      videoId: videoId,
      maxResults: 100,
      pageToken: nextPageToken,
      textFormat: 'plainText'
    });

    response.data.items.forEach((item) => {
      const comment = item.snippet.topLevelComment.snippet.textDisplay;
      comments += `${comment}\n\n`;
    });

    nextPageToken = response.data.nextPageToken;
  } while (nextPageToken);

  return comments;
}

module.exports = downloadService
