import React, { useContext } from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecordPage from "./pages/RecordPage";
import UploadPage from "./pages/UploadPage";
import AudioAnalysisPage from "./pages/AudioAnalysisPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import AuthProvider from "./contexts/Auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectRoute from "./components/RedirectRoute";
import AuthContext from "./contexts/Auth/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/:user"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="record" element={<RecordPage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="files/:id" element={<AudioAnalysisPage />} />
            </Route>

            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <RedirectRoute>
                  <LoginPage />
                </RedirectRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <RedirectRoute>
                  <SignupPage />
                </RedirectRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
