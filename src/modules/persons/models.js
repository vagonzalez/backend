/*
 * https://trello.com/c/YiU6caVX
 */
import err from '../../helpers/errors'
import { compare, hashAsync, sign } from './functions'
import isEmail from 'validator/lib/isEmail'
import mongoose, { Schema } from 'mongoose'

const PersonSchema = Schema({
  email: {
    required: [true, 'Ingresa un email'],
    type: String,
    unique: true,
    validate: [isEmail, 'Email no valido']
  },
  password: { type: String, required: [true, 'Ingresa un password'] },
  salutation: String,  // Mr Ms etc
  firstName: { type: String, required: [true, 'Campo requerido'] },
  lastName: { type: String, required: [true, 'Campo requerido'] },
  company: String,
  mobile: String,
  phone: String
}, { timestamps: true })

PersonSchema.pre('save', function (next) {
  hashAsync(this.password, 10)
  .then((hash) => {
    this.password = hash
    next()
  })
})

PersonSchema.statics.authenticate = function ({ password, email }) {
  if (!password || !email) return err.BAD_CREDENTIALS()
  return this.findOne({ email })
  .select('_id email password').lean().exec()
  .then((person) => person ? compare(password, person) : err.BAD_CREDENTIALS())
  .then((person) => person ? sign(person) : err.BAD_CREDENTIALS())
}

PersonSchema.statics.register = function (data) {
  return this.create(data)
}

export default mongoose.model('person', PersonSchema, 'persons')
