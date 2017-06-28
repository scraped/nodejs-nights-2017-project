'use strict'

const cheerio = require('cheerio')
const request = require('request-promise')

const config = require('../../modules/config')
const log = require('../../modules/logging')

module.exports = {

  targetQueue: config.queues.names.scraping,

  async process(job) {
    const pageUrl = job.data.pageUrl

    const pageHtml = await request(pageUrl)
    const $ = cheerio.load(pageHtml)

    const pageInfo = {
      title: $('head > title').text(),
      firstParagraph: $('body p').first().text(),
      ogImage: $('head > meta[property="og:image"]').attr('content'),
      ogDescription: $('head > meta[property="og:description"]').attr('content'),
      ogUrl: $('head > meta[property="og:url"]').attr('content'),
    }

    log.info({ pageInfo }, 'Page info.')
  }

}



