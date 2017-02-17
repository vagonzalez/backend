import boom from 'boom'

// Factory: Genera controladores genéricos

const list = (modelName) => (req, res, next) => {
  req.models[modelName].find().exec()
    .then(objs => res.json(objs))
    .catch(err => next(boom.wrap(err, 500)))
}

const byID = (modelName) => (req, res, next) => {
  req.models[modelName].find({ _id: req.params.id }).exec()
    .then(objs => res.json(objs))
    .catch(err => next(boom.wrap(err, 500)))
}

const genericControllerFactory = (modelName) => ({
  list: list(modelName),
  byID: byID(modelName),
})


export default genericControllerFactory
