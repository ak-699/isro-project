
import { spawn } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"



const summarize = async (input, output) => {

    const transcript = readFileSync(input).toString();
    console.log("Transcript: ", transcript)
    console.log("summarization started")
    const prompt = JSON.stringify({
        model: "llama3",
        prompt: `Genrate summary for following transcript: ${transcript}`,
        stream: false
    })
    let summary = "";
    const command = "curl"
    const args = ["http://localhost:11434/api/generate", "-d", prompt, "-H", "Content-Type: application/json"]
    await new Promise((resolve, reject) => {

        const process = spawn(command, args);
        process.stdout.on("data", (data) => {
            let obj = JSON.parse(data);
            summary += obj.response;
            console.log("summary: ",summary);
        })
        process.stderr.on("data", (data) => {
            console.log("Error: ", data.toString());
        })
        process.on("exit", (code) => {
            if (code === 0) {
                console.log("Summarization exited with code: ", code)
                resolve();
            } else {
                reject(new Error(`Process exited with code ${code}`));
            }
        })
    })
    writeFileSync(output, summary)

    console.log("Summarization Completed")
}

export default summarize;