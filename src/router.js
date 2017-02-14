import { Router } from 'express'

import { err, notFound } from './middlewares/errors'
import controllers from './controllers/'

const router = Router()

controllers.then((ctrls) => {
  router
  // Categories
  .post('/categories', ctrls.categories.create)
  .get('/categories', ctrls.categories.readList)
  .get('/categories/:id', ctrls.categories.readInstance)
  .patch('/categories/:id', ctrls.categories.update)
  .delete('/categories/:id', ctrls.categories.remove)
  // Users
  .post('/login', ctrls.users.auth)
  .post('/register', ctrls.users.register)
  // Errores & 404
  .use('*', notFound)
  .use(err)
})
.catch((err) => console.log(err))

export default router
