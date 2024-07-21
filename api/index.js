import "dotenv/config"
import express from 'express';
import cors from 'cors';
import authRouter from "./routes/auth.route.js"
import connectDB from './config/db.config.js';
import cookieParser from "cookie-parser";
import profileRoute from "./routes/profile.route.js"
import uploadRouter from "./routes/upload.route.js"
import summaryRouter from "./routes/summary.route.js"
import transcriptRouter from "./routes/transcript.route.js"
import filesRouter from "./routes/files.route.js"
import { uploadDir } from "./utils/path.utils.js";

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
    origin: ["http://localhost:5173","https://ak-699.in" ],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())
app.use("/files", express.static(uploadDir));
console.log(uploadDir)

// MongoDB connection
await connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api", profileRoute);
app.use("/api/upload", uploadRouter);
app.use("/api/files", filesRouter)
app.use("/api/transcript", transcriptRouter);
app.use("/api/summary", summaryRouter);

app.get("/test", (req, res) => {
    res.send("this is response")
})

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
