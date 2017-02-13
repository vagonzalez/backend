import { Router } from 'express'
import ctrl from './controllers/'

const router = Router()
.post('/categories', ctrl.categories.create)
.get('/categories', ctrl.categories.readList)
// .get('/categories', ctrl.categories.readInstance)

export default router
