import { Router } from 'express'
import ctrlPromise from './controllers/'

const router = Router()
ctrlPromise.then((ctrl) => {
  router
  .get('/categories', ctrl.categories.readList)
  .post('/categories', ctrl.categories.create)
})
.catch((err) => console.log(err))

export default router
