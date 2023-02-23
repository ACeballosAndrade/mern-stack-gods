import { Router } from "express";
import {getGods, createGod, updateGod, deleteGod, getGod} from '../controllers/gods.controllers.js'

const router = Router()

router.get('/dioses', getGods)
router.post('/dioses', createGod)
router.put('/dioses/:id', updateGod)
router.delete('/dioses/:id', deleteGod)
router.get('/dioses/:id', getGod)

export default router