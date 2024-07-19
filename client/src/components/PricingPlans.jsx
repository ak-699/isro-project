import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardHeader, Button } from '@mui/material';

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['5 transcriptions/month', '3 summaries/month', 'Basic support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      'Unlimited transcriptions',
      'Unlimited summaries',
      'Priority support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: [
      'Unlimited transcriptions',
      'Unlimited summaries',
      'Custom AI model training',
      '24/7 support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

const PricingPlans = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Pricing Plans
        </Typography>
        <Grid container spacing={4} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                  <Button fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingPlans;