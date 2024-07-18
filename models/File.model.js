import {Schema, model} from "mongoose"

const FileSchema = new Schema({
    fileName: String,
    fileURL: String,
    transcriptStatus: String,
    transcriptURL: String,
    summaryStatus: String,
    summaryURL : String,
    userID: {
        type:Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const File = model("File", FileSchema);

export default File