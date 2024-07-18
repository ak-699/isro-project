import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#3f2b96",
}));

const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: "linear-gradient(to right, #a8c0ff, #3f2b96)",
  color: theme.palette.common.white,
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const HeroText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: '2.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: theme.spacing(1, 3),
  },
}));

const LandingPage = () => {
  return (
    <div>
      <Header position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Transcription & Summarization
          </Typography>
        </Toolbar>
      </Header>
      <HeroSection>
        <HeroText variant="h3">
          Welcome to Your Transcription and Summarization Platform using AI
        </HeroText>
        <Box>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <StyledButton variant="contained" color="secondary">
              Login
            </StyledButton>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <StyledButton variant="outlined" color="secondary">
              Signup
            </StyledButton>
          </Link>
        </Box>
      </HeroSection>
    </div>
  );
};

export default LandingPage;
