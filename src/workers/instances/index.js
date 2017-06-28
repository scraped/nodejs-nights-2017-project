'use strict'

const welcomeEmailWorker = require('./welcome-email-worker')
const resizeImageWorker = require('./resize-image-worker')
const scrapeUrlWorker = require('./scrape-url-worker')

module.exports = [
  welcomeEmailWorker,
  resizeImageWorker,
  scrapeUrlWorker,
]
