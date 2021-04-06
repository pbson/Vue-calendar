import { Router } from "express";
import controller from '../controllers/ColorControllers'

const router = Router();

router.post("/get", controller.get)
router.post("/getAll", controller.getAll)

module.exports = router;
