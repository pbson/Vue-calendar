import { Router } from "express";
import controller from '../controllers/FacultyControllers'
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.post("/add",verifyToken, controller.add)
router.put("/update",verifyToken, controller.update)
router.get("/getall",verifyToken, controller.getAll)
// router.get("/get",verifyToken, controller.get)

module.exports = router;
