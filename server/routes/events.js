import express from 'express'
import EventRouter from "../controllers/events.js"

const router = express.Router()

router.get('/', EventRouter.getEvents)
router.get('/:eventId',EventRouter.getEventsById)

export default router