import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const LandingHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)', // for Safari
                boxShadow: 'none',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)', // Add this line for the border
                '& .MuiToolbar-root': {
                    color: 'black',
                },
            }}
        >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to={"/"} style={{textDecoration:"none", color:"inherit"}}>TranscribeSummarize AI</Link>
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>About</MenuItem>
                            <MenuItem onClick={handleClose}>Features</MenuItem>
                            <MenuItem onClick={handleClose}>Login</MenuItem>
                            <MenuItem onClick={handleClose}>Sign Up</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button color="inherit">About</Button>
                        <Button color="inherit">Features</Button>
                        <Link to={"/login"}><Button color="primary" variant="outlined" sx={{ ml: 1, mr: 1 }} >Login</Button></Link>
                        <Link to={"/signup"}><Button color="primary" variant="contained" >Sign Up</Button></Link>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default LandingHeader;