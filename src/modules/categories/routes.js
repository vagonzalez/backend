import path from 'path'
import { Router } from 'express'
import { getDataModules } from '../../helpers/initialize'

const router = Router()
getDataModules(path.join(__dirname, 'controllers'))
.then((ctrls) => {
  router
  .post('/categories', ctrls.create)
  .get('/categories', ctrls.readList)
  .get('/categories/:id', ctrls.readInstance)
  .patch('/categories/:id', ctrls.update)
  .delete('/categories/:id', ctrls.remove)
})

export default router
