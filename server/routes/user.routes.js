import { Router } from "express";
import {createUser} from '../controllers/user.controller.js'
import {authJwt, verifySignup} from '../middleware/index.js'

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], verifySignup.checkRolesExisted, createUser)

export default router