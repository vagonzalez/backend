import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import Promise from 'bluebird'
import omit from 'lodash/omit'

export const { hashAsync } = Promise.promisifyAll(bcrypt)
export const { signAsync } = Promise.promisifyAll(jsonwebtoken)

export const compare = (password, person) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(password, person.password, (err, res) => {
      if (err) return reject(new Error(err))
      return resolve(res)
    }))

export const sign = (person) =>
  signAsync(omit(person, ['password']), 'secreteKey123', {})
