import { Router } from "express";
import {
  getBookCollection,
  createBook,
  updateBook,
  deleteBook,
  addToCollection,
  removeFromCollection,
  getDefaultBooks,
} from "../controllers/book.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateBookId, validateBookData } from "../middleware";

const router = Router();

// Routes
router.get("/", getDefaultBooks);
router.get("/collection", authenticate, getBookCollection);
router.post("/", authenticate, validateBookData, createBook);
router.put("/:id", authenticate, validateBookId, updateBook);
router.delete("/:id", authenticate, validateBookId, deleteBook);

// Manage user collection
router.put("/collection", authenticate, validateBookData, addToCollection);
router.delete(
  "/collection",
  authenticate,
  validateBookData,
  removeFromCollection
);

export default router;
