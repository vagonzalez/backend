import fs from 'fs'
import path from 'path'

export const initialize = (dir) => {
  let files = fs.readdirSync(dir)
  files.forEach((file) => {
    let fileName = path.basename(file, '.js')
    if (fileName !== 'index') exports[fileName] = require(dir + '/' + fileName)
  })
  return exports
}
