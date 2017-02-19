import R from 'ramda'
import chalk from 'chalk'

// Un helper que facilita la creación de rutas en los módulos

class RouterHelper {
  constructor(debug = false) {
    this.routes = []
    this.debug = debug
  }

  addRoute = (method, route, controller, auth = null) => {
    this.routes.push({ method, route, controller, auth })
    if (this.debug) {
      console.log(
        chalk.cyan.bold('Route pushed to routes stack: '),
        chalk.cyan(method.toUpperCase(), route)
      )
    }
  }

  addRoutesFromGeneric = (genericController, auth = null) => {
    const model = genericController.model.toLowerCase()

    this.addRoute('get', `/${model}s`, genericController.list, auth)
    this.addRoute('get', `/${model}/:id`, genericController.retrieve, auth)
    this.addRoute('post', `/${model}/:id`, genericController.create, auth)
    this.addRoute('patch', `/${model}/:id`, genericController.update, auth)
    this.addRoute('delete', `/${model}/:id`, genericController.remove, auth)
  }

  getRoutes = () => (R.clone(this.routes))

}

export default RouterHelper
