import { getTranscript, startTranscription } from "../controllers/transcript.controller.js";
import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware)
router.post("/", startTranscription);
router.get("/:id", getTranscript);

export default router;