import {Schema, model} from "mongoose"

const MediaSchema = new Schema({
    mediaName: String,
    mediaURL: String,
    transcriptStatus: String,
    transcriptURL: String,
    summaryStatus: String,
    summaryURL : String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Media = model("Media", MediaSchema);

export default Media