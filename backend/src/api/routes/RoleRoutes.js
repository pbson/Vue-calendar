import { Router } from "express";
import controller from '../controllers/RoleControllers'

const router = Router();

router.post("/get", controller.get)

module.exports = router;
