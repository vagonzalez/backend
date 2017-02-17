import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'  // eslint-disable-line
import morgan from 'morgan'

import authentication from './middlewares/AuthenticationMiddleware'
import SettingsMiddleware from './middlewares/SettingsMiddleware'
import mongooseConnection from './helpers/connection'
import { vRouter, router } from './router'
import settings from './settings'

const app = express()

mongooseConnection(settings.db)
  .then((mongoose) => {
    app
    .use(cors())
    .use(urlencoded({ extended: false }))
    .use(json())
    .use(SettingsMiddleware())
    .use(authentication(true))
    .use(mongoose.middleware)
    .use(morgan('dev'))
    .use('/', vRouter)
    .listen(3000, () => {
      console.log('http://localhost:3000/')
    })
  })
  .catch((err) => console.log(err))
