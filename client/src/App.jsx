// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoPage from './components/VideoPage';
import HomePage from './pages/HomePage';
import { CssBaseline } from '@mui/material';
import AudioAnalysisPage from './pages/AudioAnalysisPage';
import LeftDrawer from './components/LeftDrawer';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-files" element={<div>all files</div>} />
        <Route path="/all-files/:id" element={<AudioAnalysisPage />} />
        <Route path="/left" element={<LeftDrawer/>} />
      </Routes>
    </Router>
  );
}

export default App;
