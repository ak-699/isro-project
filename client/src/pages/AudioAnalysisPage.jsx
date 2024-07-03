import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Grid, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AudioAnalysisPage = () => {
    const { id } = useParams(); // Extract the filename from the URL parameters
    const [view, setView] = useState('transcript'); // 'transcript' or 'summary'
    const [transcript, setTranscript] = useState("This is transcript");
    const [summary, setSummary] = useState("This is summary");
    const [file, setFile] = useState(null);

    const handleCopy = () => {
        if (view === "transcript") {
            navigator.clipboard.writeText(transcript);
        } else {
            navigator.clipboard.writeText(summary);
        }
    };

    const handleTranscribe = () => {
        console.log("Transcription started...", file.filename);
        const response = fetch("http://localhost:5000/transcribe", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                filename: file.filename
            })
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    const handleSummary = () => {
        console.log("Summary started");
        const response = fetch("http://localhost:5000/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filename: file.filename,
            })
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/all-files/${id}`);
                setFile(res.data);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFile();
    }, [id]);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Audio Analysis
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        
                            <video controls src={`http://localhost:5000/${file?.filename}`} style={{ width: '100%' }} />
                        
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography>{file?.filename}</Typography>
                                <Typography variant='body2'>{file?.updatedAt}</Typography>
                            </Box>
                            <Box>
                                <Button>Download</Button>
                                <Button onClick={handleTranscribe}>Transcribe</Button>
                                <Button onClick={handleSummary}>Summarize</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box>
                                <Button
                                    variant={view === 'transcript' ? 'contained' : 'outlined'}
                                    onClick={() => setView('transcript')}
                                    sx={{ mr: 1 }}
                                >
                                    Transcript
                                </Button>
                                <Button
                                    variant={view === 'summary' ? 'contained' : 'outlined'}
                                    onClick={() => setView('summary')}
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
                                <Typography variant="body1" component="p" style={{ whiteSpace: 'pre-wrap' }}>
                                    {transcript}
                                </Typography>
                            ) : (
                                <Typography variant="body1" component="p">
                                    {summary}
                                </Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AudioAnalysisPage;
