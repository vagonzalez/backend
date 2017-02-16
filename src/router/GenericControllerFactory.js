// Factory: Genera controladores genéricos

const list = (models, modelName) => (req, res, next) => {
  models[modelName].find().exec()
    .then(objs => res.json(objs))
    .catch(err => next(boom.wrap(err, 500)))
}

const byID = (models, modelName) => (req, res, next) => {
  models[modelName].find({ _id: req.params.id }).exec()
    .then(objs => res.json(objs))
    .catch(err => next(boom.wrap(err, 500)))
}

const genericControllerFactory = (models, modelName) => ({
  list: list(models, modelName),
  byID: byID(models, modelName),
})


export default genericControllerFactory
