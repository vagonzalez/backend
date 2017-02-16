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

  getRoutes = () => (R.clone(this.routes))

}

export default RouterHelper
