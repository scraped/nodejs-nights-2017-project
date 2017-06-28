'use strict'

const Queue = require('bull')
const config = require('../config')
const log = require('../logging')

const listeners = {
  ready() {
    log.info({ queue: this.name }, 'Queue ready.')
  },
  active(job) {
    log.info({ queue: this.name, job }, 'Job started.')
  },
  stalled(job) {
    log.warn({ queue: this.name, job }, 'Job stalled.')
  },
  completed(job) {
    log.info({ queue: this.name, job }, 'Job completed.')
  },
  failed(job, err) {
    log.error({ queue: this.name, job, err }, 'Job failed.')
  },
}

module.exports = {

  get(queueName) {
    log.info({ queueName }, 'Creating queue.')

    const queue = new Queue(queueName, config.queues.connectionString)
    Object.entries(listeners)
      .forEach(([eventName, listener]) => queue.on(eventName, listener))

    return queue
  }

}
