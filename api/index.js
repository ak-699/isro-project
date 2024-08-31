import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import profileRoute from "./routes/profile.route.js";
import uploadRouter from "./routes/upload.route.js";
import summaryRouter from "./routes/summary.route.js";
import transcriptRouter from "./routes/transcript.route.js";
import filesRouter from "./routes/files.route.js";
import { uploadDir, transcriptDir, summaryDir } from "./utils/path.utils.js";
import { existsSync, mkdirSync } from "node:fs";

if (!existsSync(uploadDir)) {
  console.log("cerated upload dir");
  mkdirSync(uploadDir);
}
if (!existsSync(transcriptDir)) {
  console.log("created transcript dir");
  mkdirSync(transcriptDir);
}
if (!existsSync(summaryDir)) {
  console.log("created transcript dir");
  mkdirSync(summaryDir);
}

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/files", express.static(uploadDir));
console.log(uploadDir);

// MongoDB connection
await connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/", profileRoute);
app.use("/api/upload", uploadRouter);
app.use("/api/files", filesRouter);
app.use("/api/transcript", transcriptRouter);
app.use("/api/summary", summaryRouter);

app.get("/api/test", (req, res) => {
  res.send("this is response");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
