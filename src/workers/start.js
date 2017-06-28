'use strict'

const log = require('../modules/logging')
const queues = require('../modules/queues')
const workers = require('./instances')

function registerWorkers() {
  log.info('Registering workers.')

  workers.forEach(worker => {
    log.info({ queue: worker.targetQueue }, 'Registering worker.')
    const queue = queues.get(worker.targetQueue)
      .process(job => worker.process(job))

    log.info({ queue: worker.targetQueue }, 'Worker registered.')
  })
}

registerWorkers()
