import React, { useContext, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../components/SnackbarAlert';
import AuthContext from '../contexts/Auth/AuthContext';
import axios from '../axios/axios';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {user} = useContext(AuthContext);
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
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('/api/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );
            const data = response.data;
            console.log(data);
            navigate(`/${user.username}/files/${data.file._id}`);
        } catch (error) {
            console.error('Error uploading file:', error);
            setFileError("Cannot connect to server");
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
