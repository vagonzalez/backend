import { Router } from 'express'
import ctrls from './controllers'

const router = Router()
.post('/login', ctrls.auth)
.post('/register', ctrls.register)

export default router
