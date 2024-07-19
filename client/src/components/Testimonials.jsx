import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Content Creator',
    content: 'This AI tool has revolutionized my workflow. Transcriptions are incredibly accurate, and the summaries save me hours of work!',
  },
  {
    name: 'Sarah Lee',
    role: 'Journalist',
    content: 'I\'ve tried many transcription services, but this one stands out. The AI-powered summaries are a game-changer for my research.',
  },
  {
    name: 'Mike Chen',
    role: 'Podcast Host',
    content: 'Transcribing and summarizing my podcasts used to be a chore. Now it\'s a breeze with this platform. Highly recommended!',
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" paragraph>
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">{testimonial.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;