import { Router } from "express";
import {
  getUserProfileBooks,
  createBook,
  updateBook,
  deleteBook,
  getDefaultBooks,
} from "../controllers/book.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateBookId, validateBookData } from "../middleware";

const router = Router();

// Routes
router.get("/", getDefaultBooks);
router.get("/user-books", authenticate, getUserProfileBooks);
router.post("/", authenticate, validateBookData, createBook);
router.put("/:id", authenticate, validateBookId, updateBook);
router.delete("/:id", authenticate, validateBookId, deleteBook);

export default router;
