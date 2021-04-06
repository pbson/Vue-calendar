import { Router } from "express";
import controller from '../controllers/UserControllers'

const router = Router();

router.post("/register", controller.register );
router.post('/register-admin',controller.registerAdmin);
router.post("/login", controller.login);

module.exports = router;
