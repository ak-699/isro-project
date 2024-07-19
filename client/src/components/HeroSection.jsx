import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, #3f2b96 30%, #a8c0ff 90%)',
        color: 'white',
        height: '98vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            '& > *': {
              animation: `${fadeIn} 1s ease-out`,
            },
          }}
        >
          <Typography 
            variant="h2"
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            AI-Powered Transcription & Summarization
          </Typography>
          <Typography 
            variant="h5" 
            paragraph
            sx={{ 
              mb: 6,
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Transform speech to text and get concise summaries in seconds
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              mt: 2,
              py: 1.5,
              px: 4,
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              }
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;