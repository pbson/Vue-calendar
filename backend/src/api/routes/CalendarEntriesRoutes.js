import { Router } from "express";
import controller from '../controllers/CalendarEntriesControllers'

const router = Router();

router.post("/add", controller.register );
router.post('/delete',controller.registerAdmin);
router.post("/update",controller.login);
router.post("/get", controller.logout)
router.post("/getAll", controller.logout)

module.exports = router;
