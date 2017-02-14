import { Router } from 'express'

import { err, notFound } from './middlewares/errors'
import categories from './modules/categories/routes'

const router = Router()
.use(categories)
.use('*', notFound)
.use(err)

export default router
