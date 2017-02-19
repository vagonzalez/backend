import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import chalk from 'chalk'
import settings from '../settings'

// Combina arrays
export const combineArrays = (...routes) => Array.prototype.concat(...routes)


// 'importa' las rutas de un módulo y las devuelve
// Las rutas deben ser exportadas como default en el módulo
const getExport = (file, dir) => new Promise((resolve, reject) => {
  const fileName = path.basename(file, '.js')

  if (fileName === 'routes') {
    const routes = require(dir + fileName)

    resolve(routes.default)
  }

  resolve(null)
})


// Combina las rutas de cada módulo en un array de rutas para ser procesadas
// y entregadas al router de express
export const moduleRoutesCombiner = () => {

  // Obtiene los directorios dentro del 'modules'
  const dirs = fs.readdirSync(`${__dirname}/../modules`)

  return Promise.all(dirs.map(dir => {
    console.log(chalk.cyan.bold(`Module: ${dir}`))
    return getExport('routes', `${__dirname}/../modules/${dir}/`).then(
      response => response
    )
  }))
}

///////////////////////////////////////////////////////////////////////////////
