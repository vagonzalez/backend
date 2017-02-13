import fs from 'fs'
import path from 'path'

const getExports = async (dir, files) => {
  await files.forEach(async (file) => {
    let fileName = await path.basename(file, '.js')
    if (fileName !== 'index') exports[fileName] = await require(dir + '/' + fileName)
  })
  return exports
}

async function initialize (dir) {
  const files = fs.readdirSync(dir)
  return getExports(dir, files)
}

export default initialize
