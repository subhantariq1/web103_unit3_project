// server/routes/locations.js
import express from 'express'
import { getLocations, getLocationsById } from '../controllers/locations.js'

const router = express.Router()

router.get('/', getLocations)
router.get('/:locationId', getLocationsById)

export default router
