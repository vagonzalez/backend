import Promise from 'bluebird'

export const ERROR = (msg) => Promise.reject(new Error(msg))
