import mongoose, { Schema } from 'mongoose'

const GroupSchema = new Schema({
  name:  { type: String, required: true },
})

const Group = mongoose.model('Group', GroupSchema, 'Groups')

export default Group
