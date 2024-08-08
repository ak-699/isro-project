import React, { useContext, useState } from "react";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/Auth/AuthContext";
import LandingHeader from "../components/LandingHeader";
import SnackbarAlert from "../components/SnackbarAlert";
import axios from "../axios/axios";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/auth/register",
        { username, password },
        { withCredentials: true }
      );
      console.log(response.data);
      setIsAuthenticated(true);
      setUser(response.data.user);
      navigate(`/{response.data.user.username}`);
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <LandingHeader />
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
              maxWidth: "400px",
            }}
            noValidate
            autoComplete="off"
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              Sign Up
            </Typography>
            {/* <TextField id="name" label="Name" variant="outlined" fullWidth /> */}
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <TextField 
                            id="confirm-password" 
                            label="Confirm Password" 
                            variant="outlined" 
                            type="password" 
                            fullWidth
                        /> */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, p: 2 }}
              type="submit"
            >
              Sign Up
            </Button>
            {/* <Button
                            variant="contained"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            sx={{
                                mt: 2,
                                backgroundColor: '#4285F4',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#357ae8',
                                },
                            }}
                        >
                            Sign up with Google
                        </Button> */}
            <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account? <Link to="/login">Log in</Link>
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            background: "linear-gradient(to right, #a8c0ff, #3f2b96)",
            display: { xs: "none", sm: "block" },
            minHeight: "100vh",
          }}
        />
      </Grid>
      <SnackbarAlert
        open={snackbarOpen}
        close={() => setSnackbarOpen(false)}
        type={"error"}
      >
        {snackbarMessage}
      </SnackbarAlert>
    </Box>
  );
};

export default SignupPage;
