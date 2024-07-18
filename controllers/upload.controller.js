import File from "../models/File.model.js"
import path from "node:path"
import { __dirname } from "../utils/path.utils.js";

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileURL = req.file.path;
    const transcriptStatus = "not-available";
    const transcriptURL = "";
    const summaryStatus = "not-available";
    const summaryURL = "";

    try {
        const file = new File({
            fileName: req.file.filename,
            fileURL,
            transcriptStatus,
            transcriptURL,
            summaryStatus,
            summaryURL,
            userID: req.user.id, // need to add user here
        });
        await file.save()
        res.status(200).json({ message: "File uploaded succesfully: ", file });
    } catch (error) {
        res.status(500).json({ message: "Error saving the file", error });
    }

}

export default uploadFile;