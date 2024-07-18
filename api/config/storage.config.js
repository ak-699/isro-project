import multer from "multer";
import path from "node:path"

const rootDir = path.resolve();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(rootDir, "uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export default storage;