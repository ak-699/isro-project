import File from "../models/File.model.js";
import { readFileSync, existsSync } from "node:fs"
import { __dirname } from "../utils/path.utils.js";
import path from "node:path"
import transcribe from "../scripts/transcript.js"

const startTranscription = async (req, res) => {
    const { id } = req.body;
    let file = await File.findById(id);
    if (!file) {
        return res.status(404).json({ message: "File not found" });
    }

    if (file.transcriptStatus === process.env.AVAILABLE) {
        return res.json({ message: `${file.fileName}: Has already been transcribed`, transcriptStatus: file.transcriptStatus });
    } else if (file.transcriptStatus === process.env.IN_PROGRESS) {
        return res.json({ message: `${file.fileName}: Transcription is in progress`, transcriptStatus: file.transcriptStatus });
    }

    const filePathInfo = path.parse(file.fileName);
    const transcriptDir = path.join(__dirname, "transcript", filePathInfo.name);

    file.transcriptStatus = process.env.IN_PROGRESS;
    await file.save();

    res.json({ message: "Transcription started...", transcriptStatus: file.transcriptStatus });

    try {
        await transcribe(file.fileURL, "small", transcriptDir);

        const transcriptURL = path.join(transcriptDir, `${filePathInfo.name}.txt`);
        file.transcriptStatus = process.env.AVAILABLE;
        file.transcriptURL = transcriptURL;
        await file.save();
    } catch (error) {
        file.transcriptStatus = process.env.NOT_AVAILABLE;
        await doc.save();
    }
}


const getTranscript = async (req, res) => {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) {
        return res.status(404).json({ message: "File does not exist" });
    }
    if (file.transcriptStatus === process.env.AVAILABLE) {
        if (existsSync(file.transcriptURL)) {

            const transcript = readFileSync(file.transcriptURL);
            return res.json({ transcript, file });
        }
        return res.status(500).json({ message: "server error" })
    } else if (file.transcriptStatus === process.env.IN_PROGRESS) {
        return res.json({ message: "Transcription in progress", file });
    } else {
        return res.json({ message: "Transcription does not exit, start Transcription", file });
    }
}

export { getTranscript, startTranscription }