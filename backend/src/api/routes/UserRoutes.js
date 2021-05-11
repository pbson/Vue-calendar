import { Router } from "express";
import controller from '../controllers/UserControllers'
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.post("/register", controller.register );
router.post('/register-admin',controller.registerAdmin);
router.post("/login", controller.login);
router.get("/search", controller.search);
router.post("/invite",verifyToken, controller.sendInvitation);

module.exports = router;
