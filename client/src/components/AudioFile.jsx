import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import audioWave from "../assets/sound.jpg";
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const AudioFile = ({ title, date, id }) => {
    const theme = useTheme();
    return (
        <Link to={`/user/files/${id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{
                border: 2,
                borderRadius: 3,
                borderColor: theme.palette.primary.main,

            }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="audio wave image"
                        image={audioWave}
                        height="100"
                        style={{ objectFit: 'contain', objectPosition: "center" }} // Correct usage of objectFit
                    />
                    <CardContent>
                        <Box
                        >
                            <Typography gutterBottom variant="subtitle1" component="div" noWrap>
                                {title}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {date}
                        </Typography>
                    </CardContent>
                </CardActionArea>

            </Card>
        </Link>
    );
};

export default AudioFile;
