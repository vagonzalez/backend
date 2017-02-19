import chalk from 'chalk'

const MessageMiddleware = (settings = {}) => (req, res, next) => {
  req.debug = settings.debug || false
}

export default MessageMiddleware
