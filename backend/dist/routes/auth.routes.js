"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.post("/register", middleware_1.validateUserCreation, auth_controller_1.register);
router.post("/login", middleware_1.validateLoginAuth, auth_controller_1.login);
router.get("/profile", auth_middleware_1.authenticate, auth_controller_1.getProfile);
// Manage user collection
router.put("/savedBooks/:id", auth_middleware_1.authenticate, middleware_1.validateBookId, auth_controller_1.addToCollection);
router.delete("/savedBooks/:id", auth_middleware_1.authenticate, middleware_1.validateBookId, auth_controller_1.removeFromCollection);
exports.default = router;
