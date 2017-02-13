import boom from 'boom'

export const create = (req, res, next) =>
  req.models.category.create(req.body)
  .then((category) => res.json(category))
  .catch((err) => next(boom.wrap(err, 400)))

export const readList = (req, res, next) =>
  req.models.category.find({ })
  .exec()
  .then((categories) => res.json(categories))
  .catch((err) => next(boom.wrap(err, 500)))
