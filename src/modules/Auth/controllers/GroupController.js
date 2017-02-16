import models from '../models'
import genericControllerFactory from '../../../router/GenericControllerFactory'

const ctrl = genericControllerFactory(models, 'Group')

export default ctrl
