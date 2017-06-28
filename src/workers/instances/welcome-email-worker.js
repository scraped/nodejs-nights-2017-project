'use strict'

const config = require('../../modules/config')
const mailer = require('../../modules/mailer')
const log = require('../../modules/logging')
const users = require('../../modules/resources/users')

module.exports = {

  targetQueue: config.queues.names.welcomeEmails,

  async process(job) {

    const userId = job.data.userId
    log.info({ userId }, 'Sending welcome email.')

    const user = await users.getById(userId)
    const welcomeEmail = {
      from: {
        name: 'BookmarksApp',
        email: 'welcome@bookmarks.io',
      },
      to: user.email,
      subject: 'Welcome to BookmarksApp',
      templateId: config.emails.welcomeEmail.templateId,
      substitutions: {
        '-name-': `${user.firstName} ${user.lastName}`
      }
    }

    await mailer.send(welcomeEmail)
    log.info({ userId }, 'Welcome email sent.')
  }

}
