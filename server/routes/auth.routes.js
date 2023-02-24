import { Router } from "express";
import {signup, signin} from '../controllers/auth.controller.js' 
import * as verifySignup from '../middleware/verifySignup.js'

const router = Router()

router.post('/signup', [verifySignup.chekDuplicateUserNameOrEmail, verifySignup.checkRolesExisted], signup)
router.post('/signin', signin)


export default router