import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'  // eslint-disable-line
import morgan from 'morgan'

import authentication from './middlewares/AuthenticationMiddleware'
import SettingsMiddleware from './middlewares/SettingsMiddleware'
import mongooseConnection from './helpers/connection'
import { router } from './router'
import settings from './settings'

const app = express()

mongooseConnection(settings.db)
  .then((mongoose) => {
    app
    .use(cors())
    .use(urlencoded({ extended: false }))
    .use(json())
    .use(SettingsMiddleware())
    .use(MessageMiddleware(settings))
    .use(authentication(true))
    .use(mongoose.middleware)
    .use(morgan('dev'))
    .use('/', router)
    .listen(settings.port, () => {
      console.log(`http://localhost:${settings.port}/`)
    })
  })
  .catch((err) => console.log(err))
