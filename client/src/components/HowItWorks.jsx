import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel, StepContent, Paper } from '@mui/material';

const steps = [
  {
    label: 'Upload Audio',
    description: 'Upload your audio file or provide a link to the audio source.',
  },
  {
    label: 'Transcribe',
    description: 'Our Whisper AI model accurately transcribes the audio to text.',
  },
  {
    label: 'Summarize',
    description: 'The LLaMA 3 7B model generates a concise summary of the transcription.',
  },
  {
    label: 'Review and Download',
    description: 'Review the results and download your transcription and summary.',
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          How It Works
        </Typography>
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} active={true}>
              <StepLabel>
                <Typography variant="h6">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }} />
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  );
};

export default HowItWorks;