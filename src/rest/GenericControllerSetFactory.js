import boom from 'boom'

// Factory: Genera controladores genéricos

const list = (modelName) => (req, res, next) => {
  req.models[modelName].find().exec()
    .then(objs => res.json(objs))
    .catch(err => next(boom.wrap(err, 500)))
}

const retrieve = (modelName) => (req, res, next) => {
  req.models[modelName].find({ _id: req.params.id }).exec()
    .then(obj => res.json(obj))
    .catch(err => next(boom.wrap(err, 500)))
}

const create = (modelName) => (req, res, next) => {
  req.models[modelName].create(req.params.data).exec()
    .then(obj => res.json(obj))
    .catch(err => next(boom.wrap(err, 500)))
}

const update = (modelName) => (req, res, next) => {
  req.models[modelName].findOneAndUpdate(
    { _id: req.params.id },
    req.params.data,
    { new: true }
  ).exec()
    .then(obj => res.json(obj))
    .catch(err => next(boom.wrap(err, 500)))
}

const remove = (modelName) => (req, res, next) => {
  req.models[modelName].findByIdAndRemove(req.params.id).exec()
    .then(obj => res.json(obj))
    .catch(err => next(boom.wrap(err, 500)))
}

const genericControllerSetFactory = (modelName) => ({
  model: modelName,
  create: create(modelName),      // C
  list: list(modelName),          // R
  retrieve: retrieve(modelName),  // R
  update: update(modelName),      // U
  remove: remove(modelName)       // D
})

export default genericControllerSetFactory
