import boom from 'boom'
import { sign } from '../helpers/users'

export const auth = (req, res, next) =>
  req.models.user.authenticate(req.body)
  .then((jwt) => res.json(jwt))
  .catch((err) => {
    if (err.toString().match(/Bad Credentials/g)) return next(boom.wrap(err, 400))
    next(boom.wrap(err, 500))
  })

export const register = (req, res, next) =>
  req.models.user.register(req.body)
  .then((user) => sign(user))
  .then((jwt) => res.json(jwt))
  .catch(err => next(boom.wrap(err, 400)))
