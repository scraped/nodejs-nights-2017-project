'use strict'

const welcomeEmailWorker = require('./welcome-email-worker')
const resizeImageWorker = require('./resize-image-worker')

module.exports = [
  welcomeEmailWorker,
  resizeImageWorker,
]
