import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'  // eslint-disable-line
import morgan from 'morgan'

import mongooseConnection from './helpers/connection'
// import router from './router'

const app = express()
mongooseConnection('dev')
  .then((mongoose) => {
    app
    .use(cors())
    .use(urlencoded({ extended: false }))
    .use(json())
    .use(mongoose.middleware)
    .use(morgan('dev'))
    // .use('/', router)
    .listen(3000, () => console.log('http://localhost:3000/'))
  })
  .catch((err) => console.log(err))
