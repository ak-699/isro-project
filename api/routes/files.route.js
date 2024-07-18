import express from "express"
import { deleteFile, getFile, getFiles } from "../controllers/files.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware);
router.get("/", getFiles);
router.get('/:id', getFile);
router.delete("/:id", deleteFile);
export default router;
