import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../components/SnackbarAlert';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    const fileType = file.type;

    if (fileType.startsWith('audio/') || fileType.startsWith('video/')) {
      setSelectedFile(file);
      setFileError('');
    } else {
      setSelectedFile(null);
      setFileError('Please upload a valid audio or video file.');
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('media', selectedFile);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method:"POST",
          body:formData,
        })
        const data = await response.json();
        console.log(data);
        navigate(`/user/files/${data.doc._id}`);
      } catch (error) {
        console.error('Error uploading file:', error);
        setFileError("Cannot connect to server")
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position={"relative"}
      justifyContent="center"
      sx={{  p: 4 }}
    >
      <Box
        width="100%"
        maxWidth="600px"
        
        p={4}
        sx={{ backgroundColor: 'white', boxShadow: 3, borderRadius: 2,
          
         }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Upload Audio/Video
        </Typography>
        <Box mt={2}>
          <TextField
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileChange}
            fullWidth
            helperText={fileError}
            error={Boolean(fileError)}
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Box>
      </Box>
      <SnackbarAlert open={snackbarOpen} close={handleSnackbarClose} type={"error"}>Unable to connect to server</SnackbarAlert>
    </Box>
  );
};

export default UploadPage;
