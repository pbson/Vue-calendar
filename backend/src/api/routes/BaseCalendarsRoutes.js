import { Router } from "express";
import controller from '../controllers/BaseCalendarsControllers'
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.post("/add",verifyToken, controller.add );
router.delete('/delete',verifyToken, controller.delete);
router.put("/update",verifyToken, controller.update);
router.post("/get",verifyToken, controller.get)

module.exports = router;
