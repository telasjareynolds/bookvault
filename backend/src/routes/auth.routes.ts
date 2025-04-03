import { Router } from "express";
import { register, login, getProfile } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateUserCreation, validateLoginAuth } from "../middleware";

const router = Router();

router.post("/register", validateUserCreation, register);
router.post("/login", validateLoginAuth, login);
router.get("/profile", authenticate, getProfile);

export default router;
