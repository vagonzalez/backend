/*
 * Los agentes inmobiliarios son los usuarios de nuestro sistema.
 */
import { BAD_CREDENTIALS } from '../../helpers/errors'
import { compare, hashAsync, signAsync } from './functions'
import isEmail from 'validator/lib/isEmail'
import mongoose, { Schema } from 'mongoose'
import omit from 'lodash/omit'

const UserSchema = Schema({
  email: { type: String, required: [true, 'Ingresa un email'], validate: [isEmail, 'Email no valido'] },
  password: { type: String, required: [true, 'Ingresa un password'] },
  firstName: { type: String, required: [true, 'Campo requerido'] },
  lastName: { type: String, required: [true, 'Campo requerido'] },
  cellPhone: String,
  phone: String
}, { timestamps: true })

UserSchema.pre('save', (next) => hashAsync(this.password, 10).then((hash) => { this.password = hash }))

UserSchema.statics.register = (data) => this.create(data)

UserSchema.statics.authenticate = ({ password, email }) => {
  if (!password || !email) return BAD_CREDENTIALS
  return this.findOne({ email })
  .select('_id password username email').lean().exec()
  .then((user) => user ? compare(user, password) : BAD_CREDENTIALS)
  .then((user) => user ? signAsync(omit(user, ['password']), 'blackGoku', {}) : BAD_CREDENTIALS)
}

export default mongoose.model('user', UserSchema, 'users')
