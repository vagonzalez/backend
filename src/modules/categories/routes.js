import path from 'path'
import { Router } from 'express'
import { getDataModules } from '../../helpers/initialize'

const router = Router()
getDataModules(path.join(__dirname, 'controllers'))
.then((ctrls) => {
  router
  .post('/categories', ctrls.categories.create)
  .get('/categories', ctrls.categories.readList)
  .get('/categories/:id', ctrls.categories.readInstance)
  .patch('/categories/:id', ctrls.categories.update)
  .delete('/categories/:id', ctrls.categories.remove)
})

export default router
