/* Funciones que retorna todos los ficheros .js dentro de un modulo.
 * pueden ser ficheros tipo controller o model.
 * - Hay que recorrer todos los folders dentro de `modules`,
 * - Recorrer los archivos del folder [`controllers` || `models`]
 * - Ejemplo, Cargar los controllers:
 * - modules >> [ categories, users (-index.js) ] >> [ files.js (-index.js) ]
 */
import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import { ERROR } from './errors'

const filterFiles = (f) => !['index.js'].includes(f)

const reduceExports = (res, row) => {
  res[row.filename] = row.fun
  return res
}

// const reduceModules = (res, row) => {
//   res['filename'] = row.filename
//   res['fun'] = row.fun
//   return res
// }

const reduceModule = (res, row) => {
  Object.keys(row.fun).forEach((key) => {
    res[key] = row.fun[key]
  })
  return res
}

const getExport = (dir, file) => new Promise((resolve, reject) => {
  let filename = path.basename(file, '.js')
  let fun = require(dir + '/' + filename)
  resolve({ filename, fun })
})

export const getDataModules = (moduleDir, reducer = reduceModule) => {
  const files = fs.readdirSync(moduleDir).filter(filterFiles)
  return Promise.all(files.map((file) => getExport(moduleDir, file)))
  .then((responses) => responses.reduce(reducer, {}))
}

const loader = (kind = null) => {
  if (!['controllers', 'models'].includes(kind)) return ERROR('controllers or models?')
  const modulesDir = path.join(__dirname, '../modules/')
  const modules = fs.readdirSync(modulesDir).filter(filterFiles)
  return Promise.all(modules.map((module) => getExport(path.join(modulesDir, module), `${kind}.js`)))
  .then((responses) => responses.reduce(reduceExports, {}))
}

module.exports = loader
