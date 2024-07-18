
import { fileURLToPath } from 'url';
import path from "node:path"

const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads")

export {__dirname, uploadDir}