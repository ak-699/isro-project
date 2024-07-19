import React from 'react';
import { Box, Grid, Typography, Container, Paper } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SummarizeIcon from '@mui/icons-material/Summarize';

const Feature = ({ icon, title, description }) => (
  <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      {icon}
      <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Paper>
);

const FeaturesSection = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Feature
              icon={<MicIcon fontSize="large" color="primary" />}
              title="Whisper AI Transcription"
              description="State-of-the-art speech recognition for accurate transcriptions"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Feature
              icon={<SummarizeIcon fontSize="large" color="primary" />}
              title="LLaMA 3 7B Summarization"
              description="Advanced language model for concise and accurate summaries"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;