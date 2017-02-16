import boom from 'boom'
import { sign } from './functions'

const auth = (req, res, next) =>
  req.models.person.authenticate(req.body)
  .then((jwt) => res.json(jwt))
  .catch((err) => {
    if (err.toString().match(/Bad Credentials/g)) return next(boom.wrap(err, 400))
    next(boom.wrap(err, 500))
  })

const register = (req, res, next) =>
  req.models.person.register(req.body)
  .then((person) => sign(person))
  .then((jwt) => res.json(jwt))
  .catch(err => next(boom.wrap(err, 400)))

module.exports = { auth, register }
