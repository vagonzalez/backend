import chalk from 'chalk'
import mongoose from 'mongoose'
import mongooseMiddleware from '../middlewares/mongoose'
import Promise from 'bluebird'

import load from './load'

const DISCONNECTED = 'Mongoose default connection disconnected'
const ERR = 'Mongoose default connection errors: '
const OK = 'Mongoose connection open to mongodb://localhost/'

const mongooseConnection = (dbName) => new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost/' + dbName, (err) => {
    if (err) return reject(err)
    load('models')
    mongoose.middleware = mongooseMiddleware
    mongoose.Promise = Promise
    mongoose.connection.on('error', (err) => console.log(chalk.red(ERR + err)))
    mongoose.connection.on('disconnedcted', () => console.log(chalk.red(DISCONNECTED)))
    console.log(chalk.green(OK + dbName))
    return resolve(mongoose)
  })
})

export default mongooseConnection
