import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Box,
  Card,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import AudioFile from "../components/AudioFile";
import RightBar from "../components/RightBar";
import axios from "../axios/axios";
const data = [
  { id: 1, title: "Kendall-Tamiami Executive Airport", date: "08/24/2023" },
  { id: 2, title: "Ruston Regional Airport", date: "08/22/2023" },
  { id: 3, title: "Municipal José Figueiredo Airport", date: "07/27/2023" },
  { id: 4, title: "Luiza Airport", date: "05/08/2024" },
  { id: 5, title: "N'Djamena International Airport", date: "02/22/2024" },
  { id: 6, title: "Kemmerer Municipal Airport", date: "10/01/2023" },
  { id: 7, title: "Ekwok Airport", date: "04/11/2024" },
  { id: 8, title: "Varrelbusch Airport", date: "10/25/2023" },
  { id: 9, title: "Kärdla Airport", date: "08/20/2023" },
  { id: 10, title: "Zapatoca Airport", date: "05/29/2024" },
  { id: 11, title: "Sumbe Airport", date: "09/03/2023" },
  { id: 12, title: "Cascais Airport", date: "09/14/2023" },
  { id: 13, title: "Marshfield Municipal Airport", date: "11/13/2023" },
  { id: 14, title: "Bourke Airport", date: "05/17/2024" },
  {
    id: 15,
    title: "Cincinnati Municipal Airport Lunken Field",
    date: "06/06/2024",
  },
  { id: 16, title: "Hatbox Field", date: "10/18/2023" },
  { id: 17, title: "El Gora Airport", date: "03/20/2024" },
  { id: 18, title: "Gallatin Field", date: "10/24/2023" },
  { id: 19, title: "Osh Airport", date: "01/03/2024" },
];

const DashboardPage = () => {
  const [files, setFiles] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/files", {
          withCredentials: true,
        });
        // console.log(response)
        setFiles(response.data.files);
        // console.log(response.data.files);
      } catch (error) {
        setSnackbarMessage(
          "Error occured while fetching files! Refresh after some time!"
        );
        setSnackbarOpen(true);
      }
    };

    fetchData();
  }, []);
  return (
    <Box>
      <Grid container p={3} spacing={3}>
        <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
          <Grid container spacing={2}>
            {files && files.length > 0 ? (
              files.map((item) => (
                <Grid item xs={12} sm={6} lg={4} key={item._id}>
                  <AudioFile
                    title={item.fileName}
                    date={item.createdAt}
                    id={item._id}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="90vh"
                  textAlign="center"
                >
                  <Typography variant="h6">
                    📁 No files found! 🌟 Start recording a new audio to dive
                    into transcription and summarization. Your next project
                    awaits! 🚀
                  </Typography>
                </Box>
              </Grid>
            )}

            {/* {
                            data.map(item => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    lg={4}
                                    key={item.id}
                                    
                                >
                                    <AudioFile title={item.title} date={item.date} />
                                </Grid>
                            ))
                        } */}
          </Grid>
        </Grid>

        <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
          <RightBar />
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardPage;
