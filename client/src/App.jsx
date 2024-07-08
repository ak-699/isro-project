import React from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecordPage from './pages/RecordPage';
import UploadPage from './pages/UploadPage';
import AudioAnalysisPage from './pages/AudioAnalysisPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  return (
    <>


      <BrowserRouter>

        <Routes>
          {/* Routes that include the common layout */}
          <Route path="/user" element={<Layout />}>
            {/* Nested routes within the Layout */}
            <Route index element={<DashboardPage />} />
            <Route path="record" element={<RecordPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="files/:id" element={<AudioAnalysisPage />} />
          </Route>

          {/* Add a route for the root or other pages if needed */}
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
