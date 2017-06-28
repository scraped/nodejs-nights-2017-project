'use strict'

const sendgrid = require('sendgrid-mailer')
const config = require('../config')

const mailer = sendgrid.config(config.emails.apiKey)
module.exports = mailer
