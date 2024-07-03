// src/components/VideoPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/videos/${id}`);
        setVideo(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideo();
  }, [id]);

  return (
    <Container>
      {video && (
        <>
          <Typography variant="h4">{video.filename}</Typography>
          <video width="600" controls>
            <source src={`http://localhost:5000/${video.path}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Typography variant="body1">This is some text about the video.</Typography>
        </>
      )}
    </Container>
  );
};

export default VideoPage;
