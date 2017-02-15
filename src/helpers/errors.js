import Promise from 'bluebird'

export const ERROR = (msg) => Promise.reject(new Error(msg))

export const BAD_CREDENTIALS = ERROR('Bad Credentials')
