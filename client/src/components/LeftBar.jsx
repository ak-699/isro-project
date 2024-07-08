import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useTheme } from '@mui/material';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';

const list = [
    {
        id: 1,
        name: "Dashboard",
        icon: <DashboardIcon />,
        link: "/user",
    },
    {
        id: 2,
        name: "Sign Up",
        icon: <PersonAddIcon />,
        link: "/sign-up",
    },
    {
        id: 3,
        name: "Login",
        icon: <LoginIcon />,
        link: "/login",
    },
    {
        id: 4,
        name: "Settings",
        icon: <SettingsIcon />,
        link: "/settings",
    },
];

const LeftBar = ({ drawerWidth, mobileOpen, setMobileOpen }) => {
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
                {list.map(item => (
                    <ListItem key={item.id} disablePadding>
                        <Link
                            to={item.link}
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
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} color='black' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}

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
