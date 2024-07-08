import Mic from '@mui/icons-material/Mic'
import { Button, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import UploadIcon from '@mui/icons-material/Upload';
import TranscribeIcon from '@mui/icons-material/Transcribe';

const RightBar = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Link to={"/user/record"}>
                    <Button
                        variant='contained'
                        sx={{ width: "100%" }}
                        startIcon = {<Mic />}
                    >
                        Record Audio
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12} >
                <Link to={"/user/upload"}>
                    <Button 
                        variant='contained' 
                        startIcon={<UploadIcon />}
                        sx={{ width: "100%" }}
                    >
                        Upload Audio
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Link to={"/user/record"}>
                    <Button 
                    variant='contained' 
                    startIcon={<TranscribeIcon />}
                    sx={{ width: "100%" }}
                    disabled
                    >
                        Transcribe Live Meeting
                    </Button>
                </Link>
            </Grid>

        </Grid>
    )
}

export default RightBar
