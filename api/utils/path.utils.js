
import { fileURLToPath } from 'url';
import path from "node:path"

const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads")
const transcriptDir = path.join(__dirname, "transcript");
const summaryDir = path.join(__dirname, "summary");

export {__dirname, uploadDir, transcriptDir, summaryDir}