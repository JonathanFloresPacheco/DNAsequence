import { Router } from 'express'
import sendCtrl from '../controllers/dnasequence.ctrl'
export const dnasequenceRouter = Router()
dnasequenceRouter
.get('/stats',sendCtrl.dnasequence)
.post('/mutation', sendCtrl.sendsequence)
.post('/token', sendCtrl.token)

 
 