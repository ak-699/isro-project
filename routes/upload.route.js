import express from "express"
import uploadFile from "../controllers/upload.controller.js";
import multer from "multer";
import storage from "../config/storage.config.js";
import authMiddleware from "../middleware/auth.middleware.js";

const upload = multer({ storage });
const router = express.Router();
router.use(authMiddleware)
router.post('/', upload.single('file'), uploadFile);

export default router;