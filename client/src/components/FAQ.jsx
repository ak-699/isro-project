import React from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What file formats do you support for transcription?",
    answer:
      "We support a wide range of audio and video formats, including MP3, WAV, MP4, and more. If you have a specific format, please contact our support team.",
  },
  {
    question: "How accurate is the transcription?",
    answer:
      "Our Whisper AI model achieves high accuracy rates, typically above 95% for clear audio. However, factors like audio quality, accents, and background noise can affect accuracy.",
  },
  {
    question: "Can I edit the transcriptions and summaries?",
    answer:
      "Yes, you can edit both the transcriptions and summaries directly in our platform. We provide an easy-to-use editor for making any necessary corrections or adjustments.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We take data security very seriously. All uploads are encrypted, and we do not store your audio files after processing. Please refer to our privacy policy for more details.",
  },
];

const FAQ = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default FAQ;
