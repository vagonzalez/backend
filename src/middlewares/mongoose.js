import mongoose from 'mongoose'

const mongooseMiddleware = (req, res, next) => {
  req.mongoose = mongoose
  req.models = mongoose.models
  return next()
}

export default mongooseMiddleware
