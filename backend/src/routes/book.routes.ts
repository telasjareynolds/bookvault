import { Router } from "express";
import {
  getBookCollection,
  createBook,
  updateBook,
  deleteBook,
  addToCollection,
  removeFromCollection,
} from "../controllers/book.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateBookId, validateBookData } from "../middleware";

const router = Router();

router.use(authenticate);

// Routes
router.get("/collection", getBookCollection);
router.post("/", validateBookData, createBook )
router.put("/:id", validateBookId, updateBook);
router.delete("/:id", validateBookId, deleteBook);

// Manage user collection
router.put("/collection", validateBookData, addToCollection);
router.delete("/collection", validateBookData, removeFromCollection)

export default router;
