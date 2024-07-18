import express from "express"
import { login, logout, register, verify } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout)
router.get("/verify", authMiddleware, verify)

export default router;
