import { Router } from "express";
import {
  register,
  login,
  getProfile,
  removeFromCollection,
  addToCollection,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import {
  validateUserCreation,
  validateBookId,
  validateLoginAuth,
} from "../middleware";

const router = Router();

router.post("/register", validateUserCreation, register);
router.post("/login", validateLoginAuth, login);
router.get("/profile", authenticate, getProfile);

// Manage user collection
router.put("/savedBooks/:id", authenticate, validateBookId, addToCollection);
router.delete(
  "/savedBooks/:id",
  authenticate,
  validateBookId,
  removeFromCollection
);

export default router;
