import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HeroSection from "../components/HeroSection.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import PricingPlans from "../components/PricingPlans.jsx";
import Testimonials from "../components/Testimonials.jsx";
import FAQ from "../components/FAQ.jsx";
import Footer from "../components/Footer";
import LandingHeader from "../components/LandingHeader.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f2b96",
    },
    secondary: {
      main: "#a8c0ff",
    },
  },
});

function LandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      {/* <PricingPlans /> */}
      <Testimonials />
      <FAQ />
      <Footer />
    </ThemeProvider>
  );
}

export default LandingPage;
