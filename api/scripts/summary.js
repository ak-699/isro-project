
import { spawn } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import ollama from 'ollama'


const summarize = async (input, output) => {

    const transcript = readFileSync(input).toString();
    console.log("Transcript: ", transcript)
    console.log("summarization started")

    const prompt = `Genrate summary for following transcript: ${transcript}`;
    const response = await ollama.chat({
        model: 'llama3',
        messages: [{ role: 'user', content: prompt }],
    })

    let summary = response.message.content;
    
    writeFileSync(output, summary)

    console.log("Summarization Completed")
}

export default summarize;