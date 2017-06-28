/* eslint-disable no-console, max-len */

'use strict'

const queues = require('../modules/queues')
const config = require('../modules/config')

// const imageUrl = 'https://cdn-images-1.medium.com/max/1200/1*3xPJvmwsdp2ImfSAAdP2DA.png'
// const imageUrl = 'https://www.seznam.cz/media/img/logo_v2.png'
// const imageUrl = 'https://cdn-images-1.medium.com/max/800/1*YXiclXZdJQVJZ0tQHCv5zw.png'
// const imageUrl = 'https://cdn-images-1.medium.com/fit/t/1600/1280/desat/multiply/grey/overlay/grey/gradv/29/81/55/1*8TtHryL_POyDWNcVtV6aMA.jpeg'
const imageUrl = 'https://www.strv.com/fb-share.png'

function run() {
  const queue = queues.get(config.queues.names.imageResizing)
  queue.add({ imageUrl })
  return queue.close()
}

run().catch(console.error)
