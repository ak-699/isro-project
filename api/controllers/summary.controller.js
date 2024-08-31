import {readFileSync, existsSync} from "node:fs"
import File from "../models/File.model.js";
import path from "path"
import { __dirname } from "../utils/path.utils.js";
import summarize from "../scripts/summary.js";

const getSummary = async (req, res) => {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) {
        return res.status(404).json({ message: "File does not exist" });
    }
    if (file.summaryStatus === "available") {
        if (existsSync(file.summaryURL)) {

            const summary = readFileSync(file.summaryURL);
            return res.json({ summary, file });
        }
        return res.status(500).json({ message: "cannot find file" })
    } else if (file.summaryStatus === "in-progress") {
        return res.json({ message: "Summarization in progress", file });
    } else {
        return res.json({ message: "Summary does not exit, start summarization", file });
    }
}

const startSummarization =  async (req, res) => {
    const { id } = req.body;
    let file = await File.findById(id);
    if (!file) {
        return res.status(404).json({ message: "File not found" });
    }

    if (file.transcriptStatus !== "available") {
        return res.json({ message: "Please transcribe the media first", summaryStatus: file.summaryStatus });
    }

    if (file.summaryStatus === "available") {
        return res.json({ message: `${file.fileName}: Has already been summarized`, summaryStatus: file.summaryStatus });
    } else if (file.summaryStatus === 'in-progress') {
        return res.json({ message: `${file.fileName}: Summarization is in progress`, summaryStatus: file.summaryStatus })
    }
    // if summaryStatus === "not-available"
    const filePathInfo = path.parse(file.fileName);
    const transcriptURL = file.transcriptURL;
    const summaryURL = path.join(__dirname, "summary", `${filePathInfo.name}.txt`);
    file.summaryStatus = "in-progress";
    await file.save()
    res.json({ message: "Summarization started...", summaryStatus: file.summaryStatus });

    try {
        console.log("Starting summarization...")
        await summarize(transcriptURL, summaryURL);
        console.log("exited summarization")
        file.summaryStatus = "available";
        file.summaryURL = summaryURL;
        await file.save();
    } catch (error) {
        file.summaryStatus = "not-available"
        await file.save();
        console.log("ERROR: error while summaring file: ", error);
    }
}

export {getSummary, startSummarization}