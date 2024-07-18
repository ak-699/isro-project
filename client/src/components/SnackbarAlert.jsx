import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const SnackbarAlert = ({ open, close, type, children, duration = 6000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={close}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ maxWidth: '600px', width: 'auto' }} // Ensure Snackbar has adequate width
    >
      <Alert
        onClose={close}
        severity={type}
        variant='filled'
        sx={{ width: '100%', boxSizing: 'border-box' }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
