import genericControllerFactory from '../../../router/GenericControllerFactory'

// Genera un controller que incluye varias funcionalides básicas de CRUD
// en este caso para el modelo User

const ctrl = genericControllerFactory('User')

export default ctrl
