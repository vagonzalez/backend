import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail'
import jsonwebtoken from 'jsonwebtoken'
import mongoose, { Schema } from 'mongoose'
import omit from 'lodash/omit'
import Promise from 'bluebird'

const { hashAsync } = Promise.promisifyAll(bcrypt)
const { signAsync } = Promise.promisifyAll(jsonwebtoken)
const BADCREDENTIALS = () => Promise.reject(new Error('Bad Credentials'))

const compare = (user, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) return reject(new Error(err))
      return resolve(user)
    })
  })
}

const UserSchema = Schema({
  email: { type: String, required: [true, 'Ingresa un email'], validate: [isEmail, 'Email no valido'] },
  firstName: { type: String, required: [true, 'Campo requerido'] },
  lastName: { type: String, required: [true, 'Campo requerido'] },
  password: { type: String, required: [true, 'Ingresa un password'] }
}, { timestamps: true })

export default mongoose.model('user', UserSchema, 'users')

UserSchema.pre('save', function (next) {
  hashAsync(this.password, 10)
  .then((hash) => {
    this.password = hash
    if (!this.emailVerification.verified) {
      hashAsync(this.email, 10)
      .then((hash) => {
        this.emailVerification.hash = hash
        next()
      })
    }
  })
})

UserSchema.statics.authenticate = function ({ password, email }) {
  if (!password || !email) return BADCREDENTIALS()
  return this.findOne({ email })
  .select('_id password username email').lean().exec()
  .then((user) => user ? compare(user, password) : BADCREDENTIALS())
  .then((user) => user ? signAsync(omit(user, ['password']), 'blackGoku', {}) : BADCREDENTIALS())
}

UserSchema.statics.register = function (data) {
  return this.create(data)
}
