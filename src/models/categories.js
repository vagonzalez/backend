import mongoose, { Schema } from 'mongoose'

const CategorySchema = Schema({
  name: { type: String, required: true }
})

export default mongoose.model('category', CategorySchema, 'categories')
