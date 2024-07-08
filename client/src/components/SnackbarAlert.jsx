import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const SnackbarAlert = ({open, close, type, children, duration = 6000}) => {
    return (

        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={close}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
                onClose={close}
                severity={type}
                variant='filled'
                sx={{ width: '100%' }}
            >
                {children}
            </Alert>
        </Snackbar>

    )
}

export default SnackbarAlert
