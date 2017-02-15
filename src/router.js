import { Router } from 'express'

import { err, notFound } from './middlewares/errors'
import userRoutes from './modules/users/'

const router = Router()
.use(userRoutes)
.use('*', notFound)
.use(err)

export default router
