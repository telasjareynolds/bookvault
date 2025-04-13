"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
// Routes
router.get("/", book_controller_1.getDefaultBooks);
router.get("/user-books", auth_middleware_1.authenticate, book_controller_1.getUserProfileBooks);
router.post("/", auth_middleware_1.authenticate, middleware_1.validateBookData, book_controller_1.createBook);
router.put("/:id", auth_middleware_1.authenticate, middleware_1.validateBookId, book_controller_1.updateBook);
router.delete("/:id", auth_middleware_1.authenticate, middleware_1.validateBookId, book_controller_1.deleteBook);
exports.default = router;
