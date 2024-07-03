import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Menu from '@mui/icons-material/Menu';
import PermanentDrawer from '../components/PermanentDrawer';
import AudioFile from '../components/AudioFile';

const HomePage = () => {
  return (
    <Box sx={{flexGrow:1}}>
        <PermanentDrawer />
    </Box>
  )
}

export default HomePage
