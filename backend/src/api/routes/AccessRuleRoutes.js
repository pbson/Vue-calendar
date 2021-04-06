import { Router } from "express";
import controller from '../controllers/AccessRuleControllers'

const router = Router();

router.post("/getAll", controller.get)

module.exports = router;
