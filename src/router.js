import { Router } from 'express'

import { err, notFound } from './middlewares/errors'
import personRoutes from './modules/persons/'

const router = Router()
router
.use(personRoutes)
.use('*', notFound)
.use(err)

export default router
