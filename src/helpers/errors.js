import Promise from 'bluebird'

const ERROR = (msg) => Promise.reject(new Error(msg))
const BAD_CREDENTIALS = () => ERROR('Bad Credentials')
const BAD_REQUEST = () => ERROR('Bad request')

module.exports = { ERROR, BAD_CREDENTIALS, BAD_REQUEST }
