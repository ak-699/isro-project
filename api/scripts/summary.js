
import { spawn } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"



const summarize = async (input , output) => {

    const transcript = readFileSync(input).toString();
    console.log("Transcript: ", transcript)
    console.log("summarization started")
    const prompt = JSON.stringify({
        model: "llama3",
        prompt: `Genrate summary for following transcript: ${transcript}`,
        stream: false
    })
    const command = "curl"
    const args = ["http://localhost:11434/api/generate", "-d", prompt, "-H", "Content-Type: application/json"]
    const process = spawn(command, args);
    process.stdout.on("data", (data) => {
        let obj = JSON.parse(data);
        const res = obj.response;
        console.log(res);
        writeFileSync(output, res)
    })
    process.stderr.on("data", (data) => {
        console.log("Error: ", data.toString());
    })
}

export default summarize;