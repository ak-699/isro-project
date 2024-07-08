import { spawn } from "node:child_process";

const transcribe = (media, model, output) => {

    console.log("Spawning whisper process...");
    const command = "whisper";
    const args = [media, "--model", model, "-o", output];
    const process = spawn(command, args);

    process.stdout.on("data", (data) => {
        console.log("stdout:", data.toString());
    });

    process.stderr.on("data", (data) => {
        console.error("stderr:", data.toString());
    });

};

export default transcribe;
