import {Schema, model} from "mongoose"

const AudioSchema = new Schema({
    filename: String,
    path: String,
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const Audio = model("Audio", AudioSchema);

export default Audio