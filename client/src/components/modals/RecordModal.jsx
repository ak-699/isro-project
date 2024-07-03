import React, { useState, useRef } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RecordModal = ({ open, handleClose }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const navigate = useNavigate();

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
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  const uploadAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        navigate(`/all-files/${response.data._id}`);
        handleClose();
      } catch (error) {
        console.error('Error uploading audio:', error);
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Audio Recorder
        </Typography>
        <Box mt={2}>
          {recording ? (
            <Button variant="contained" color="secondary" onClick={stopRecording}>
              Stop Recording
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={startRecording}>
              Start Recording
            </Button>
          )}
        </Box>
        {audioBlob && (
          <Box mt={2}>
            <audio controls src={URL.createObjectURL(audioBlob)} />
            <Button variant="contained" color="success" onClick={uploadAudio} sx={{ mt: 2 }}>
              Upload Audio
            </Button>
          </Box>
        )}
        <Box mt={2}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RecordModal;
