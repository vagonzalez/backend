import chalk from 'chalk'
import mongoose from 'mongoose'
import mongooseMiddleware from '../middlewares/mongoose'
import Promise from 'bluebird'

import initialize from './initialize'

const DISCONNECTED = 'Mongoose default connection disconnected'
const ERROR = 'Mongoose default connection errors: '
const OK = 'Mongoose connection open to mongodb://localhost/'

const getConnectionString = (settings) => {
  const auth = settings.user ? `${settings.user}:${settings.password}@` : ''
  const port = settings.port ? `:{settings.port}/` : '/'

  return `${auth}${settings.server}${port}${settings.db}`
}

const mongooseConnection = (dbSettings) => new Promise((resolve, reject) => {
  const connectionString = getConnectionString(dbSettings)

  mongoose.connect(`mongodb://${connectionString}`, (err) => {
    if (err) return reject(err)
    initialize('models')
    mongoose.middleware = mongooseMiddleware
    mongoose.Promise = Promise
    mongoose.connection.on('error', (err) => console.log(chalk.red(ERROR + err)))
    mongoose.connection.on('disconnedcted', () => console.log(chalk.red(DISCONNECTED)))
    console.log(chalk.green(OK + dbSettings.db))
    return resolve(mongoose)
  })
})

export default mongooseConnection
