import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  CircularProgress,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
import SnackbarAlert from "../components/SnackbarAlert";
import { format } from "date-fns";
import axios from "../axios/axios";

const AVAILABLE = "available";
const NOT_AVAILABLE = "not-available";
const IN_PROGRESS = "in-progress";

const AudioAnalysisPage = () => {
  const { id } = useParams();
  const [view, setView] = useState("transcript");
  const [file, setFile] = useState(null);
  const [transcriptStatus, setTranscriptStatus] = useState("not-available");
  const [transcript, setTranscript] = useState(null);
  const [summaryStatus, setSummaryStatus] = useState("not-available");
  const [summary, setSummary] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("no message");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`/api/files/${id}`, {
          withCredentials: true,
        });
        console.log(response);
        setFile(response.data.file);
        setTranscriptStatus(response.data.file.transcriptStatus);
        setSummaryStatus(response.data.file.summaryStatus);

        console.log("Requested file has been fetched", response.data.file);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFile();
  }, [id]);

  useEffect(() => {
    if (transcriptStatus === AVAILABLE) getTranscript();
  }, [transcriptStatus]);
  useEffect(() => {
    if (summaryStatus === AVAILABLE) getSummary();
  }, [summaryStatus]);

  const handleSnackbarClose = (event, reason) => {
    setSnackbarOpen(false);
  };

  const handleCopy = () => {
    if (view === "transcript") {
      navigator.clipboard.writeText(transcript);
    } else {
      navigator.clipboard.writeText(summary);
    }
  };

  const handleTranscribe = async () => {
    console.log("clicked transcribe");

    if (transcriptStatus === "available") {
      setSnackbarOpen(true);
      setSnackbarMessage(`Transcription Status: AVAILABLE `);
      return;
    }
    try {
      const response = await axios.post(
        "/api/transcript",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(data);
      const { transcriptStatus, message } = data;

      if (transcriptStatus !== "not-available") {
        setTranscriptStatus(transcriptStatus);
        setSnackbarOpen(true);
        setSnackbarMessage(message);
      }
    } catch (error) {
      setTranscriptStatus("not-available");
      setSnackbarOpen(true);
      setSnackbarMessage(error.message);
      console.log(error);
    }
  };

  const handleSummary = async () => {
    console.log("clicked summarize");

    if (summaryStatus === AVAILABLE) {
      setSnackbarMessage("Media already summarized");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        "/api/summary",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data);
      setSnackbarMessage(data?.message);
      setSnackbarOpen(true);
      setSummaryStatus(data?.summaryStatus);
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const renderTranscription = () => {
    if (transcriptStatus === NOT_AVAILABLE) {
      return "transcript not available";
    }
    if (transcriptStatus === IN_PROGRESS) {
      return (
        <Box>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="0%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
        </Box>
      );
    } else if (transcriptStatus === AVAILABLE) {
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
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="0%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
        </Box>
      );
    } else if (summaryStatus === "available") {
      return summary;
    }
  };

  const getTranscript = async () => {
    console.log("transcript clicked");
    // if (transcriptStatus === AVAILABLE && transcript !== null) return;
    try {
      const response = await axios.get(`/api/transcript/${id}`, {
        withCredentials: true,
      });

      // console.log(data);
      if (response.data.transcript) {
        const str = response.data.transcript.data
          ?.map((char) => String.fromCharCode(char))
          .join("");
        console.log(str);
        setTranscript(str);
        setTranscriptStatus(AVAILABLE);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSummary = async () => {
    console.log("clicked summary");
    // if (summaryStatus === AVAILABLE ) return;
    try {
      const response = await axios.get(`/api/summary/${id}`, {
        withCredentials: true,
      });
      if (response) {
        const data = response.data;
        console.log(data);
        if (data.summary) {
          const str = data.summary.data
            ?.map((char) => String.fromCharCode(char))
            .join("");
          console.log(str);
          setSummary(str);
          setSummaryStatus(AVAILABLE);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const staticFileURL = `http://localhost:5000/files/${file?.fileName}`;
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy, HH:mm aa");
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Audio Analysis
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ pb: 1 }}>
            <video controls src={staticFileURL} style={{ width: "100%" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    marginBottom: 1,
                  }}
                >
                  {file?.fileName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  {file?.createdAt ? formatDate(file?.createdAt) : "nodate"}
                </Typography>
              </Box>
              <Box>
                <Button onClick={handleTranscribe}>Transcribe</Button>
                <Button
                  disabled={transcriptStatus !== "not-available" ? false : true}
                  onClick={handleSummary}
                  mr={2}
                >
                  Summarize
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexFlow: { xs: "column", md: "row" },
                justifyContent: { xs: "space-between" },
              }}
            >
              <Box alignSelf={"center"}>
                <Button
                  variant={view === "transcript" ? "contained" : "outlined"}
                  onClick={() => {
                    getTranscript();
                    setView("transcript");
                  }}
                  sx={{ m: 1 }}
                >
                  Transcript
                </Button>
                <Button
                  variant={view === "summary" ? "contained" : "outlined"}
                  onClick={() => {
                    getSummary();
                    setView("summary");
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
              {view === "transcript" ? (
                <Typography
                  variant="body1"
                  component="div"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {renderTranscription()}
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

      <SnackbarAlert
        open={snackbarOpen}
        close={handleSnackbarClose}
        type={"success"}
      >
        {snackbarMessage}
      </SnackbarAlert>
    </Box>
  );
};

export default AudioAnalysisPage;
