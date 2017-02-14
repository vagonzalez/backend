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

export const readInstance = (req, res, next) =>
  req.models.category.findOne({ _id: req.params.id }).exec()
  .then((category) => res.json(category))
  .catch((err) => next(boom.wrap(err, 400)))

export const update = (req, res, next) =>
  req.models.category.update({ _id: req.params.id, ...req.body })
  .then((cat) => res.json(cat))
  .catch((err) => next(boom.wrap(err, 400)))

export const remove = (req, res, next) =>
  req.models.category.remove({ _id: req.params.id }).exec()
  .then((ress) => res.json(ress))
  .catch((err) => next(boom.wrap(err, 400)))
