import File from "../models/File.model.js";

const getFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id)
        if (!file) {
            return res.status(404).json({ message: "File does not exist" })
        }
        res.status(200).json({ message: "File fetched successfully", file });
    } catch (error) {
        res.status(500).json({ message: "Error fetching media file", error });
    }
}

const getFiles = async (req, res) => {
    console.log("reached files controller")
    try {
        const userID = req.user.id;
        const files = await File.find({ userID });
        res.status(200).json({ message: "Successful", files });
    } catch (error) {
        console.error('Error fetching media files:', error);
        res.status(500).json({ message: 'Error fetching media files', error });
    }
}

const deleteFile = async (req, res) => {
    console.log("Deletion controller");
    const id = req.params.id;
    try {
        const file = await File.findByIdAndDelete(id);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        console.log(error)
        res.send(500).json({ message: "Internal server error" });
    }
}

export { getFiles, getFile, deleteFile }