import { spawn } from "node:child_process";

const transcribe = async (media, model, output) => {
    console.log("Spawning whisper process...");
    const whisper_vnev = "";
    const command = "whisper";
    const args = [media, "--model", model, "-o", output];

    await new Promise((resolve, reject) => {
        const process = spawn(command, args);

        process.stdout.on("data", (data) => {
            console.log("stdout:", data.toString());
        });

        process.stderr.on("data", (data) => {
            console.error("stderr:", data.toString());
        });

        process.on("exit", (code) => {
            console.log("process exited with code: ", code);
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Process exited with code ${code}`));
            }
        });

        process.on("error", (error) => {
            console.log("process error: ", error);
            reject(error);
        });
    });

    console.log("Transcription finished");
};

export default transcribe;
