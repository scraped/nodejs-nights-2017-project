'use strict'

const request = require('request')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const config = require('../../modules/config')
const log = require('../../modules/logging')

module.exports = {

  targetQueue: config.queues.names.imageResizing,

  process(job) {
    const imageUrl = job.data.imageUrl
    const dimensions = { width: 300, height: 300 }

    const resizer = sharp()
      .resize(dimensions.width, dimensions.height)
      .max()
      .png()

    // Construct output stream
    const outputFileName = `${Number(new Date())}.png`
    const outputFilePath = path.join(__dirname, '../../../output/', outputFileName)
    const outputStream = fs.createWriteStream(outputFilePath)

    request.get(imageUrl)
      .pipe(resizer)
      .pipe(outputStream)

    log.info({ imageUrl }, 'Image resized.')
  }

}



