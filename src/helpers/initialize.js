import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'

const getExport = (file, dir) => new Promise((resolve, reject) => {
  let fileName = path.basename(file, '.js')
  if (fileName !== 'index') {
    let ctrl = require(dir + '/' + fileName)
    resolve({ filename: fileName, ctrl: ctrl })
  }
  resolve(null)
})

export default (dir) => {
  const files = fs.readdirSync(dir)
  return Promise.all(files.map((file) => getExport(file, dir)))
  .then((responses) =>
    responses.reduce((response, row) => {
      if (row !== null) response[row.filename] = row.ctrl
      return response
    }, {})
  )
}
