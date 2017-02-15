import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import Promise from 'bluebird'

export const { hashAsync } = Promise.promisifyAll(bcrypt)
export const { signAsync } = Promise.promisifyAll(jsonwebtoken)

export const compare = (user, password) => new Promise((resolve, reject) =>
  bcrypt.compare(password, user.password, (err, res) => {
    if (err) return reject(new Error(err))
    return resolve(user)
  }))

export const sign = (user) =>
  signAsync({ _id: user._id, email: user.email }, 'secreteKey123', {})
