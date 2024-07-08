import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, IconButton, Grid, Tooltip, Zoom, styled } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import DownloadIcon from '@mui/icons-material/Download';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useTheme } from '@emotion/react';
import SnackbarAlert from '../components/SnackbarAlert';


const RecordPage = () => {
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [uploaded, setUploaded] = useState(false);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
    const intervalRef = useRef(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if ((recording || audioBlob) && !uploaded) {
                const message = 'You have an ongoing recording. If you leave, your recording will be lost.';
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [recording, audioBlob, uploaded]);

    useEffect(() => {
        if (recording && !paused) {
            intervalRef.current = setInterval(() => {
                setRecordingTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [recording, paused]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        audioChunks.current = [];

        mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.current.push(event.data);
            }
        };

        mediaRecorder.current.onstop = () => {
            const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
            setAudioBlob(blob);
        };

        mediaRecorder.current.start();
        setRecording(true);
        setPaused(false);
        setRecordingTime(0);
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
        console.log("media recorder stopped")
        setRecording(false);
        setPaused(false);
    };

    const pauseRecording = () => {
        if (mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.pause();
            setPaused(true);
        } else if (mediaRecorder.current.state === 'paused') {
            mediaRecorder.current.resume();
            setPaused(false);
        }
    };

    const downloadRecording = () => {
        const url = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recording.wav';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const uploadRecording = () => {
        const formData = new FormData();
        formData.append("media", audioBlob, "recording.wav")
        const response = fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
        });
        response
            .then(res => res.json())
            .then(data => {
                console.log("File uploaded successfully: ", data)
                setUploaded(true);
                navigate(`/user/files/${data._id}`)
            })
            .catch(err => {
                console.log("Error occured while uploading", err);
                setUploaded(false);
                setSnackbarOpen(true);
            })
    }

    const formatTime = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const handleCancel = () => {
        if ((recording || audioBlob) && !uploaded) {
            const confirmLeave = window.confirm("You have an unsaved recording. Are you sure you want to leave? Your recording will be lost.");
            if (!confirmLeave) return;
        }
        navigate("/user");
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            position={"relative"}
            justifyContent="center"
            alignItems="center"
        >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom my={4}>
                    Record Audio
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" position="relative" mb={4}>
                    <IconButton
                        color={recording ? 'error' : 'default'}
                        sx={{
                            color: "error",
                            fontSize: '200px',
                            transition: 'all 0.3s ease-in-out',
                            '&.Mui-disabled': {
                                color: 'grey.500',
                            }
                        }}
                        onClick={startRecording}
                        disabled={!!audioBlob}
                    >
                        <MicIcon fontSize="inherit" />
                    </IconButton>
                </Box>

                <Box
                    bgcolor="background.paper"
                    sx={{
                        border: 3,
                        borderColor: 'divider',
                        borderRadius: 3,
                        display: "flex",
                        bgcolor: theme.palette.primary.light,
                        width: {
                            md: "50vw",
                        },
                        m: "auto",
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        p={1}
                        justifyContent={"center"}
                        alignItems="center"
                    >
                        {recording && (
                            <Grid item >
                                <Typography variant="body1">
                                    {formatTime(recordingTime)}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item>
                            {recording ? (
                                <>
                                    <IconButton color="error" onClick={stopRecording}>
                                        <StopIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton color="white" onClick={pauseRecording}>
                                        {paused ? <MicIcon fontSize="large" /> : <PauseIcon fontSize="large" />}
                                    </IconButton>
                                </>
                            ) : (
                                <Tooltip title="Start Recording" TransitionComponent={Zoom} TransitionProps={{ timeout: 150 }}>
                                    <IconButton color="white" onClick={startRecording} disabled={!!audioBlob}>
                                        <MicIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Grid>
                        {audioBlob && (

                            <Grid item>

                                <Tooltip
                                    title="Upload Audio"
                                    TransitionComponent={Zoom}
                                    TransitionProps={{ timeout: 150 }}
                                >

                                    <IconButton color="white" onClick={uploadRecording}>
                                        <FileUploadIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip
                                    title="Download Audio"
                                    TransitionComponent={Zoom}
                                    TransitionProps={{ timeout: 150 }}
                                >

                                    <IconButton color="white" onClick={downloadRecording}>
                                        <DownloadIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>

                            </Grid>
                        )}
                        <Grid item>
                            <Tooltip title="Cancel" TransitionComponent={Zoom} TransitionProps={{ timeout: 150 }}>
                                <IconButton color="error" onClick={handleCancel}>
                                    <CancelIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
                {audioBlob && (
                    <Box mt={4} width={{ md: "50vw" }} mx="auto" >
                        <audio controls src={URL.createObjectURL(audioBlob)} style={{ width: '100%' }} />
                    </Box>
                )}
            </Box>
            <SnackbarAlert open={snackbarOpen} close={handleSnackbarClose} type={"error"}>Unable to connect to server</SnackbarAlert>

        </Box>
    );
};

export default RecordPage;
