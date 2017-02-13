import { Router } from 'express'

import { err, notFound } from './middlewares/errors'
import ctrlPromise from './controllers/'

const router = Router()
ctrlPromise.then((ctrl) => {
  router
  .post('/categories', ctrl.categories.create)
  .get('/categories', ctrl.categories.readList)
  .get('/categories/:id', ctrl.categories.readInstance)
  .patch('/categories/:id', ctrl.categories.update)
  .delete('/categories/:id', ctrl.categories.remove)
  .use('*', notFound)
  .use(err)
})
.catch((err) => console.log(err))

export default router
