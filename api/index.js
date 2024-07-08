import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Media from "./models/Media.js"
import { spawn } from "node:child_process"
import { readFileSync } from "node:fs"
import transcribe from './scripts/transcript.js';
import summarize from './scripts/summary.js';
import { existsSync } from 'fs';

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pythonScriptPath = path.join(__dirname, 'scripts', 'process_audio.py');


app.use(cors());
app.use(bodyParser.json());
app.use("/user", express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
// const url = "mongodb+srv://kumar699abhishek:r24bn7RN1w19SKGk@mern-isro.jfcoqbh.mongodb.net/?retryWrites=true&w=majority&appName=mern-isro"
const url = "mongodb://localhost:27017/mern-isro"
mongoose.connect(url)
    .then(() => console.log("connected to mongodb!"))
    .catch((err) => console.log(err))

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Routes

app.post('/upload', upload.single('media'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const transcriptStatus = "not-available";
    const transcriptURL = "";
    const summaryStatus = "not-available";
    const summaryURL = "";

    const newAudio = new Media({
        mediaName: req.file.filename,
        mediaURL: path.join(__dirname, req.file.path),
        transcriptStatus,
        transcriptURL,
        summaryStatus,
        summaryURL
    });
    try {
        const doc = await newAudio.save()
        res.status(200).json({ message: "File uploaded succesfully: ", doc });
    } catch (error) {
        res.status(400).json({ message: "Error saving the file", error });
    }

});

app.get("/media", async (req, res) => {
    try {
        const files = await Media.find({});
        res.json(files);
    } catch (error) {
        console.error('Error fetching media files:', error);
        res.status(500).json({ message: 'Error fetching media files', error });
    }
});

app.get('/media/:id', async (req, res) => {
    try {
        const doc = await Media.findById(req.params.id)
        if (!doc) {
            return res.status(404).json({ message: "File does not exist" })
        }
        res.status(200).json({ message: "File fetched successfully", doc });
    } catch (error) {
        res.status(500).json({ message: "Error fetching media file", error });
    }
});

app.post("/summarize", async (req, res) => {
    const { id } = req.body;
    let doc = await Media.findById(id);
    if (!doc) {
        return res.status(404).json({ message: "File not found" });
    }

    if (doc.transcriptStatus !== "available") {
        return res.json({ message: "Please transcribe the media first", summaryStatus: doc.summaryStatus });
    }

    if (doc.summaryStatus === "available") {
        return res.json({ message: `${doc.mediaName}: Has already been summarized`, summaryStatus: doc.summaryStatus });
    } else if (doc.summaryStatus === 'in-progress') {
        return res.json({ message: `${doc.mediaName}: Summarization is in progress`, summaryStatus: doc.summaryStatus })
    }

    const mediaPathInfo = path.parse(doc.mediaName);
    const transcriptURL = doc.transcriptURL;
    const summaryURL = path.join(__dirname, "summary", `${mediaPathInfo.name}.txt`);
    doc.summaryStatus === "in-progress";
    await doc.save()
    res.json({ message: "Summarization started...", summaryStatus: doc.summaryStatus });


    try {

        console.log("Starting summarization...")
        await summarize(transcriptURL, summaryURL);
        doc.summaryStatus = "available";
        doc.summaryURL = summaryURL;
        await doc.save();
    } catch (error) {
        doc.summaryStatus = "not-available"
        await doc.save();
        console.log("ERROR: error while summaring file: ", error);
    }
})

app.post("/transcribe", async (req, res) => {
    const { id } = req.body;
    console.log(`Received request to transcribe media with id: ${id}`);

    let doc = await Media.findById(id);
    if (!doc) {
        console.error("File not found for id:", id);
        return res.status(404).json({ message: "File not found" });
    }

    console.log(`Found media document: ${doc.mediaName}`);
    if (doc.transcriptStatus === "available") {
        console.log(`Media already transcribed: ${doc.mediaName}`);
        return res.json({ message: `${doc.mediaName}: Has already been transcribed`, transcriptStatus: doc.transcriptStatus });
    } else if (doc.transcriptStatus === "in-progress") {
        console.log(`Transcription in progress for media: ${doc.mediaName}`);
        return res.json({ message: `${doc.mediaName}: Transcription is in progress`, transcriptStatus: doc.transcriptStatus });
    }

    const mediaPathInfo = path.parse(doc.mediaName);
    const transcriptDir = path.join(__dirname, "transcript", mediaPathInfo.name);

    console.log(`Setting transcription status to in-progress for media: ${doc.mediaName}`);
    doc.transcriptStatus = "in-progress";
    await doc.save();

    res.json({ message: "Transcription started...", transcriptStatus: doc.transcriptStatus });

    try {
        console.log("Starting transcription process...");
        transcribe(doc.mediaURL, "small", transcriptDir);
        console.log("Finished transcription process");

        const transcriptURL = path.join(transcriptDir, `${mediaPathInfo.name}.txt`);
        doc.transcriptStatus = "available";
        doc.transcriptURL = transcriptURL;
        await doc.save();
        console.log("Updated status to available and saved document");
    } catch (error) {
        console.error("Error during transcription, setting status to not available", error);
        doc.transcriptStatus = "not-available";
        await doc.save();
    }
});


app.get("/summary/:id", async (req, res) => {
    const { id } = req.params;
    const doc = await Media.findById(id);
    if (!doc) {
        return res.status(404).json({ message: "File does not exist" });
    }
    if (doc.summaryStatus === "available") {
        if (existsSync(doc.summaryURL)) {

            const summary = readFileSync(doc.summaryURL);
            return res.json({ summary });
        }
        return res.status(500).json({ message: "cannot find file" })
    } else if (doc.summaryStatus === "in-progress") {
        return res.json({ message: "Summarization in progress" });
    } else {
        return res.json({ message: "Summary does not exit, start summarization" });
    }
})

app.get("/transcript/:id", async (req, res) => {
    const { id } = req.params;
    const doc = await Media.findById(id);
    if (!doc) {
        return res.status(404).json({ message: "File does not exist" });
    }
    if (doc.transcriptStatus === "available") {
        if (existsSync(doc.transcriptURL)) {

            const transcript = readFileSync(doc.transcriptURL);
            return res.json({ transcript });
        }
        return res.status(500).json("server error")
    } else if (doc.transcriptStatus === "in-progress") {
        return res.json({ message: "Transcription in progress" });
    } else {
        return res.json({ message: "Transcription does not exit, start Transcription" });
    }
})

app.get("/test", (req, res) => {
    res.send("this is response")

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
