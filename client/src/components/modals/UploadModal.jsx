import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
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

const UploadModal = ({ open, handleClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        console.log()
        navigate(`/all-files/${response.data._id}`);
        handleClose();
      } catch (error) {
        console.error('Error uploading audio:', error);
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Upload Audio
        </Typography>
        <Box mt={2}>
          <TextField
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            fullWidth
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadModal;
