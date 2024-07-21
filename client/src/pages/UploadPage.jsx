import React, { useContext, useState } from 'react';
import { Box, Button, Typography, TextField, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../components/SnackbarAlert';
import AuthContext from '../contexts/Auth/AuthContext';
import axios from '../axios/axios';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [snackbarState, setSnackbarState] = useState({ open: false, message: '', type: 'error' });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarState(prev => ({ ...prev, open: false }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileType = file?.type;

    if (fileType?.startsWith('audio/') || fileType?.startsWith('video/')) {
      setSelectedFile(file);
      setFileError('');
    } else {
      setSelectedFile(null);
      setFileError('Please upload a valid audio or video file.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      const { file } = response.data;
      navigate(`/${user.username}/files/${file._id}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setSnackbarState({
        open: true,
        message: 'Unable to connect to server. Please try again later.',
        type: 'error'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      // justifyContent="center"
      // minHeight="100vh"
      // bgcolor="#f5f5f5"
    >
      <Box
        width="100%"
        maxWidth="600px"
        p={4}
        sx={{
          backgroundColor: 'white',
          boxShadow: 3,
          borderRadius: 2,
          transition: 'box-shadow 0.3s',
          // '&:hover': { boxShadow: 6 }
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Upload Audio/Video
        </Typography>
        <Box mt={3}>
          <TextField
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileChange}
            fullWidth
            helperText={fileError}
            error={Boolean(fileError)}
            InputProps={{
              endAdornment: selectedFile && (
                <Typography variant="body2" color="textSecondary">
                  {selectedFile.name}
                </Typography>
              )
            }}
          />
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ minWidth: 120 }}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Box>
      </Box>
      <SnackbarAlert
        open={snackbarState.open}
        close={handleSnackbarClose}
        type={snackbarState.type}
      >
        {snackbarState.message}
      </SnackbarAlert>
    </Box>
  );
};

export default UploadPage;