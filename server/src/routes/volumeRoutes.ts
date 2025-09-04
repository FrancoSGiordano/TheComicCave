import { Router } from 'express'
import { VolumeController } from '../controllers/VolumeController.js'


const router = Router()

router.get("/volumes/:issueId",
   VolumeController.getVolumeById
)

router.get("/volumes/publisher/:publisherId",
    VolumeController.getVolumeByPublisher
)

router.get("/volumes/publisher/:publisherId/featured",
    VolumeController.getFeaturedVolumesByPublisher
)

export default router