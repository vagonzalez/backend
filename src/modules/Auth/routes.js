import controllers from './controllers'
import RouterHelper from '../../router/RouterHelper'

// Quizá se podría inyectar dependencia y que RouterHelper estuviera disponible
// como una sola instancia routerHelper
const r = new RouterHelper(true)

// Modo sencillo y declarativo de como funcionan las rutas
// mantiene flexibilidad para agregar otro tipo de rutas a controladores
// especiales


r.addRoutesFromGeneric(controllers.Users)
r.addRoutesFromGeneric(controllers.Groups)


export default r.getRoutes()
