import { Router } from 'express'
import chalk from 'chalk'
import R from 'ramda'
import { err, notFound } from '../middlewares/errors'

import { moduleRoutesCombiner } from './RouterFactory'

const vRouter = Router()

// TODO: Esto debería poder ser configurable
// Son los verbos HTTP permitidos
const allowedHttpVerbs = ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD'] //...

// TODO: Esto debería poder ser configurable
const defaultRoutes = [{
  method: 'get',
  route: '*',
  controller: notFound,
  auth: null
}]


moduleRoutesCombiner().then(
  routes => {
    //routes.push(defaultRoutes) // Añade las rutas por defecto
    routes.map(route => {
      if (Array.isArray(route)) {
        route.map(r => {
          if (r.method && R.any(R.equals(r.method.toUpperCase()))(allowedHttpVerbs)) {
            vRouter[r.method](r.route, r.controller)
            console.log(chalk.red.bold('vRouter: route added', r.route))
          } else {
            console.log(chalk.red.bold('## vRouter: invalid route', JSON.stringify(r)))
          }
        })
      } else {
        console.log(chalk.red.bold('## vRouter: invalid route', JSON.stringify(route)))
      }
      vRouter.use('*', notFound)
    })
  }
).catch(error => console.log(chalk.red.bold(`## vRouter error: ${error}`)))

export default vRouter
