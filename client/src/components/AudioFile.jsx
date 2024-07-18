import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useContext } from 'react';
import audioWave from "../assets/sound.jpg";
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import AuthContext from '../contexts/Auth/AuthContext';
import { format } from 'date-fns';

const AudioFile = ({ title, date, id }) => {
    const { user } = useContext(AuthContext)
    const theme = useTheme();
    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMMM dd, yyyy, HH:mm aa");
    };
    return (
        <Link to={`/${user.username}/files/${id}`} style={{ textDecoration: 'none' }}>
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
                            {formatDate(date)}
                        </Typography>
                    </CardContent>
                </CardActionArea>

            </Card>
        </Link>
    );
};

export default AudioFile;
