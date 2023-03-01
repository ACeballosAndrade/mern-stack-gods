import { Router } from "express";
import {getGods, createGod, updateGod, deleteGod, getGod} from '../controllers/gods.controllers.js'

import {authJwt} from '../middleware/index.js'

const router = Router()

router.get('/dioses', getGods)
router.post('/dioses', createGod)
router.put('/dioses/:id', [authJwt.verifyToken, authJwt.isAdmin], updateGod)
router.delete('/dioses/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteGod)
router.get('/dioses/:id', getGod)

export default router