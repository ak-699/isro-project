import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Grid, IconButton, CircularProgress, Skeleton, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SnackbarAlert from '../components/SnackbarAlert';


const AudioAnalysisPage = () => {
    const { id } = useParams();
    const [view, setView] = useState('transcript');
    const [file, setFile] = useState(null);
    const [transcript, setTranscript] = useState("no transcript available");
    const [transcriptStatus, setTranscriptStatus] = useState("not-available");
    const [summary, setSummary] = useState("no summary available");
    const [summaryStatus, setSummaryStatus] = useState("not-available");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("no message");

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/media/${id}`);
                const data = await response.json();
                setFile(data.doc);
                setTranscriptStatus(data.doc.transcriptStatus)
                setSummaryStatus(data.doc.summaryStatus);
                if (transcriptStatus === "available") getTranscript();
                if (summaryStatus === "available") getSummary();
                console.log("Requested file has been fetched", data.doc);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFile();
    }, [id]);

    const handleSnackbarClose = (event, reason) => {
        setSnackbarOpen(false);
    }

    const handleCopy = () => {
        if (view === "transcript") {
            navigator.clipboard.writeText(transcript);
        } else {
            navigator.clipboard.writeText(summary);
        }
    };

    const handleTranscribe = async () => {
        console.log("Transcription started...", file.mediaName);

        try {
            const response = await fetch("http://localhost:5000/transcribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id })
            })

            const data = await response.json();
            console.log(data)
            const { transcriptStatus, message } = data;
            if (transcriptStatus !== "not-available")
                setTranscriptStatus(transcriptStatus);
            setSnackbarOpen(true);
            setSnackbarMessage(message);

        } catch (error) {
            setTranscriptStatus("not-available");
            setSnackbarOpen(true);
            setSnackbarMessage(error);
            console.log(error)
        }

    }

    const handleSummary = async () => {
        console.log("Summary started");
        try {

            const response = await fetch("http://localhost:5000/summarize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id })
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSnackbarMessage(data.message);
                setSnackbarOpen(true);
                setSummaryStatus(data.summaryStatus);
            }
        } catch (error) {
            console.log(error)
            setSnackbarMessage(error)
            setSnackbarOpen(true);
            setSummaryStatus(data.summaryStatus);
        }

    }

    const renderTranscription = () => {
        if (transcriptStatus === "not-available") {
            return "transcript not available";
        }
        if (transcriptStatus === "in-progress") {
            return (
                <Box>
                    <Skeleton variant='text' width="100%" />
                    <Skeleton variant='text' width="100%" />
                    <Skeleton variant='text' width="60%" />
                    <Skeleton variant='text' width="0%" />
                    <Skeleton variant='text' width="100%" />
                    <Skeleton variant='text' width="100%" />
                    <Skeleton variant='text' width="60%" />
                </Box>
            );
        } else if (transcriptStatus === "available") {
            return transcript;
        }

    };

    const renderSummary = () => {
        if (summaryStatus === "not-available") {
            return "summary not available";
        }

        if (summaryStatus === "in-progress") {
            return (
                <Box>
                    <Skeleton variant='text' width="100%" />
                    <Skeleton variant='text' width="100%" />
                    <Skeleton variant='text' width="60%" />
                    <Skeleton variant='text' width="0%" />
                    <Skeleton variant='text' width="100%" />
                    <Skeleton variant='text' width="100%" />
                    <Skeleton variant='text' width="60%" />
                </Box>
            );
        }
        else if (summaryStatus === "available") {
            return summary;
        }
    }

    const getTranscript = async () => {
        console.log("transcript clicked")
        const response = await fetch(`http://localhost:5000/transcript/${id}`)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (data.transcript) {
                var enc = new TextDecoder("utf-8");

                const str = data.transcript.data.toString();
                console.log(str);
                setTranscript(str);
            }
        }
    }

    const getSummary = async () => {
        console.log("clicked summary");
        try {
            const response = await fetch(`http://localhost:5000/summary/${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data.summary) {

                    const str = data.summary?.data?.toString();
                    console.log(str);
                    setSummary(str);
                }
            }
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <Box >
            <Typography variant="h4" component="h1" gutterBottom>
                Audio Analysis
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <Paper elevation={3} sx={{ pb: 1 }}>

                        <video controls src={`http://localhost:5000/user/${file?.mediaName}`} style={{ width: '100%' }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography>{file?.mediaName}</Typography>
                                <Typography variant='body2'>{file?.createdAt}</Typography>
                            </Box>
                            <Box >
                                <Button onClick={handleTranscribe}>Transcribe</Button>
                                <Button disabled={(transcriptStatus !== "not-available") ? false : true} onClick={handleSummary} mr={2} >Summarize</Button>
                            </Box>

                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", flexFlow: { xs: "column", md: "row" }, justifyContent: { xs: "space-between" } }}>
                            <Box alignSelf={"center"}>
                                <Button
                                    variant={view === 'transcript' ? 'contained' : 'outlined'}
                                    onClick={() => {
                                        getTranscript();
                                        setView("transcript")
                                    }}
                                    sx={{ m: 1 }}
                                >
                                    Transcript
                                </Button>
                                <Button
                                    variant={view === 'summary' ? 'contained' : 'outlined'}
                                    onClick={() => {
                                        getSummary();
                                        setView("summary")
                                    }}
                                    sx={{ m: 1 }}
                                >
                                    Summary
                                </Button>
                            </Box>
                            <Box sx={{ ml: "auto" }}>
                                <IconButton onClick={handleCopy}>
                                    <ContentCopyIcon />
                                </IconButton>
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box mt={2}>
                            {view === 'transcript' ? (
                                <Typography variant="body1" component="div" style={{ whiteSpace: 'pre-wrap' }}>
                                    {
                                        renderTranscription()
                                    }
                                </Typography>
                            ) : (
                                <Typography variant="body1" component="div">
                                    {renderSummary()}
                                </Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <SnackbarAlert open={snackbarOpen} close={handleSnackbarClose} type={"success"}>
                {snackbarMessage}
            </SnackbarAlert>
        </Box>
    );
};

export default AudioAnalysisPage;
