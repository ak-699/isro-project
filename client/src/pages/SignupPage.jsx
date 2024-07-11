import { Button } from '@mui/material';
import React, { useRef, useState } from 'react'

const SignupPage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState("");
    const mediaRecorderRef = useRef(null);
    const [recordedChunks, setRecordedChunks] = useState([ ]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true})
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0 ) {
                setRecordedChunks((prev) => [...prev, event.data]);
            }
        }
        mediaRecorder.start();
        setIsRecording(true);
    }
    const stopRecording = () => {

    }

    return (
        <div>
            <h1>audio recorder</h1>
            <Button variant='contained' onClick={isRecording? stopRecording: startRecording}>
                {
                    (isRecording)? "Stop Recording": "Start Recording"
                }
            </Button>
            {
                (audioURL) && (
                    <div>
                        <h2>recorded audio</h2>
                        <audio controls src={audioURL}/>
                    </div>
                )
            }
        </div>
    )
}

export default SignupPage
