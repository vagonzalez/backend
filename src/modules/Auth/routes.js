import controllers from './controllers'
import RouterHelper from '../../router/RouterHelper'

// Quizá se podría inyectar dependencia y que RouterHelper estuviera disponible
// como una sola instancia routerHelper
const r = new RouterHelper(true)

// Modo sencillo y declarativo de como funcionan las rutas
// mantiene flexibilidad para agregar otro tipo de rutas a controladores
// especiales

// Se podrá hacer r.addGenericRoutes('user', controllers.User)
// Que generaría las rutas para un CRUD: get /users post /user patch /user ...

r.addRoute('get', '/users', controllers.Users.list)
r.addRoute('get', '/groups', controllers.Groups.list)


export default r.getRoutes()
