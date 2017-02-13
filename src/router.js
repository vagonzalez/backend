import { Router } from 'express'

import { err, notFound } from './middlewares/errors'
import ctrlPromise from './controllers/'

const router = Router()
ctrlPromise.then((ctrl) => {
  router
  .get('/categories', ctrl.categories.readList)
  .post('/categories', ctrl.categories.create)
  .use('*', notFound)
  .use(err)
})
.catch((err) => console.log(err))

export default router
