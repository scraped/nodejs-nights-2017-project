/* eslint-disable no-console, max-len */

'use strict'

const queues = require('../modules/queues')
const config = require('../modules/config')

// const url = 'https://www.seznam.cz'
// const url = 'https://dev-blog.apollodata.com/introducing-launchpad-the-graphql-server-demo-platform-cc4e7481fcba'
// const url = 'https://www.strv.com'
const url = 'https://medium.com/@ageitgey/machine-learning-is-fun-80ea3ec3c471'

function run() {
  const queue = queues.get(config.queues.names.scraping)
  queue.add({ pageUrl: url })
  return queue.close()
}

run().catch(console.error)
