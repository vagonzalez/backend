import mongoose, { Schema } from 'mongoose'
const BADREQUEST = (msg) => Promise.reject(new Error(msg))

const CategorySchema = Schema({
  name: { type: String, required: true }
})

CategorySchema.statics.update = function ({ _id, name, description, slug }) {
  if (!_id || !name || !slug) return BADREQUEST('Bad request.')
  return this.findOneAndUpdate({ _id }, {name, description, slug}, { new: true }).exec()
}

export default mongoose.model('category', CategorySchema, 'categories')
