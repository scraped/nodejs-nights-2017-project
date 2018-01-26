'use strict'

/* eslint-disable no-process-env */

const pkg = require('../../../package.json')

const tokenOptions = {
  algorithm: 'HS256',
  issuer: `com.strv.bookmarks-api.${env}`,
}

module.exports = env => ({
  env,
  appName: pkg.name,
  server: {
    port: process.env.PORT || 3000,
    bodyParser: {
      multipart: true,
    },
    cors: {
      origin: '*',
      exposeHeaders: [
        'Authorization',
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'ETag',
      ],
      maxAge: 3600,
    },
  },
  logging: {
    stdout: {
      enabled: true,
      level: 'debug',
    },
  },
  validation: {
    shortTextLength: 300,
  },
  database: {
    connectionString: process.env.DATABASE_URL
      || 'postgres://postgres@localhost:5432/bookmarks-db',
    options: {
      dialect: 'postgres',
      dialectOptions: {
        ssl: false,
      },
      logging: false,
    },
  },
  auth: {
    secret: process.env.AUTH_SECRET
      || 'wPlwdiDMLthMSQUcEgRQDSM2gBbW0chWv/gE8YVP1L6iWYaRKolm7UoXClFjPAQb',
    saltRounds: 10,
    createOptions: {
      // expires in 1h
      expiresIn: 60 * 60,
      ...tokenOptions,
    },
    verifyOptions: {
      ...tokenOptions
    },
  },
  queues: {
    connectionString: process.env.QUEUE_CONNECTION_STRING
      || 'redis://127.0.0.1:6379',
    names: {
      welcomeEmails: 'welcome-email',
      scraping: 'scraping',
      imageResizing: 'image-resizing',
    }
  },
  emails: {
    apiKey: process.env.SENDGRID_API_KEY,
    welcomeEmail: {
      templateId: 'a8a6b1df-700b-4093-87e4-896ae0a6cdca',
    },
  },
})
