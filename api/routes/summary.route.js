import express from "express"
import { getSummary, startSummarization } from "../controllers/summary.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware)
router.post("/", startSummarization)
router.get("/:id", getSummary)

export default router;