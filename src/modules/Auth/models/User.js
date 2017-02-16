import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  username:  { type: String, required: true },
  password: { type: String, required: true }, // bcrypt
  email: String,
  firstName: String,
  lastName: String,
  isSuper: { type: Boolean, default: false },
  isStaff: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now() },
  lastLogin: Date,
})

const User = mongoose.model('User', UserSchema, 'Users')

export default User
