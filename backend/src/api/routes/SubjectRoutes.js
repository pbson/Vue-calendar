import { Router } from "express";
import controller from '../controllers/SubjectControllers'
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.post("/add",verifyToken, controller.add)
router.put("/update",verifyToken, controller.update)
router.delete("/delete",verifyToken, controller.delete)
router.get("/getall",verifyToken, controller.getAll)
router.get("/getbyfaculty",verifyToken, controller.getByFaculty)

module.exports = router;
