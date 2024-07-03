import React from 'react';
import { Card, Typography } from '@mui/material';
import soundUrl from '../assets/sound.jpg';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 1,
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
    },
    image: {
        height: '120px',
        objectFit: 'cover',
    },
};

const AudioFile = ({audioName, audioDate, id}) => {
  return (
    <Link to={`/all-files/${id}`} style={styles.card}>
      <Card sx={{ width: 240, ...styles.card }}>
        <img src={soundUrl} alt="this is sound image" style={styles.image} />
        
        <Typography sx={{ width: '100%' }}>{audioName}</Typography>
        <Typography variant='body2' sx={{ width: '100%' }}>{audioDate}</Typography>
      </Card>
    </Link>
  );
};

export default AudioFile;
