import chalk from 'chalk'
import settings from '../settings'


const SettingsMiddleware = (debug = false) => (req, res, next) => {
  req.settings = settings
  next()
}

export default SettingsMiddleware
