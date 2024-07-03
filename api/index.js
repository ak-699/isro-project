import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Audio from "./models/Audio.js"
import { spawn } from 'child_process';

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pythonScriptPath = path.join(__dirname, 'scripts', 'process_audio.py');


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const url = "mongodb+srv://kumar699abhishek:r24bn7RN1w19SKGk@mern-isro.jfcoqbh.mongodb.net/?retryWrites=true&w=majority&appName=mern-isro"
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
app.post('/upload', upload.single('file'), (req, res) => {
    const newAudio = new Audio({
        filename: req.file.filename,
        path: req.file.path,
    });

    newAudio.save()
        .then(audio => res.json(audio))
        .catch(err => res.status(400).json(err));
    // console.log(req.file.path)
});

app.get('/all-files/:id', (req, res) => {
    Audio.findById(req.params.id)
        .then(audio => res.json(audio))
        .catch(err => res.status(400).json(err));
});

app.post("/transcribe", (req, res) => {
    const { filename } = req.body;
    res.json({ filename });

    // Start transcription workflow
    const pythonProcess = spawn('python3', [pythonScriptPath, path.join(__dirname, "uploads", filename)]);

    // Handle stdout data from the Python script
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data.toString()}`);
    });

    // Handle stderr data from the Python script
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data.toString()}`);
    });

    // Handle Python script completion
    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
    });
});

app.post("/summarize", (req, res) => {
    res.json("ok");
    const {filename} = req.body;


    // start summary workflow if transcription is generated
})

app.get("/all-files", async (req, res) => {
    const files = await Audio.find({});
    res.json(files);
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
