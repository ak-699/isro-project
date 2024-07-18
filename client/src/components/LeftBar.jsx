import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/Auth/AuthContext';


const LeftBar = ({ drawerWidth, mobileOpen, setMobileOpen }) => {
    const {user, logout} = useContext(AuthContext);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const theme = useTheme();

    const drawerList = (
        <Box sx={{
            width: drawerWidth,
        }}>
            <Toolbar />
            <Divider />
            <List>
                
                    <ListItem disablePadding>
                        <Link
                            to={`/${user?.username}`}
                            style={{ width: '100%', textDecoration: 'none' }}
                        >
                            <ListItemButton
                                onClick={handleDrawerToggle}
                                sx={{
                                    color: theme => theme.palette.primary.main,
                                    "& .MuiListItemIcon-root": {
                                        color: theme => theme.palette.primary.main, // Icon color on hover
                                    },
                                    "& .MuiListItemText-primary": {
                                        color: theme => theme.palette.primary.main, // Text color on hover
                                    },

                                    "&:hover": {
                                        bgcolor: theme => theme.palette.primary.main, // Background color on hover
                                        color: theme => theme.palette.common.white, // Text color on hover
                                        "& .MuiListItemIcon-root": {
                                            color: theme => theme.palette.common.white, // Icon color on hover
                                        },
                                        "& .MuiListItemText-primary": {
                                            color: theme => theme.palette.common.white, // Text color on hover
                                        },
                                    },
                                    "&.Mui-selected": {
                                        bgcolor: theme => theme.palette.primary.light, // Background color when selected
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"} color='black' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link
                            onClick={logout}
                            to={`/login`}
                            style={{ width: '100%', textDecoration: 'none' }}
                        >
                            <ListItemButton
                                onClick={handleDrawerToggle}
                                sx={{
                                    color: theme => theme.palette.primary.main,
                                    "& .MuiListItemIcon-root": {
                                        color: theme => theme.palette.primary.main, // Icon color on hover
                                    },
                                    "& .MuiListItemText-primary": {
                                        color: theme => theme.palette.primary.main, // Text color on hover
                                    },

                                    "&:hover": {
                                        bgcolor: theme => theme.palette.primary.main, // Background color on hover
                                        color: theme => theme.palette.common.white, // Text color on hover
                                        "& .MuiListItemIcon-root": {
                                            color: theme => theme.palette.common.white, // Icon color on hover
                                        },
                                        "& .MuiListItemText-primary": {
                                            color: theme => theme.palette.common.white, // Text color on hover
                                        },
                                    },
                                    "&.Mui-selected": {
                                        bgcolor: theme => theme.palette.primary.light, // Background color when selected
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Logout"} color='black' />
                            </ListItemButton>
                        </Link>
                    </ListItem>

            </List>
        </Box>
    );

    return (
        <>
            <Drawer
                variant='permanent'
                anchor='left'
                open
                sx={{
                    width: drawerWidth,
                    display: {
                        xs: "none",
                        sm: "block",
                    },
                    bgcolor: theme.palette.primary.light,
                }}
            >
                {drawerList}
            </Drawer>

            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    }
                }}
            >
                {drawerList}
            </Drawer>
        </>
    );
};

export default LeftBar;
