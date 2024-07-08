import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Badge, Box, IconButton } from '@mui/material'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@emotion/react'

const Header = ({ drawerWidth, mobileOpen, setMobileOpen }) => {
    const theme = useTheme();
    return (
        <Box >
            <AppBar
                position="fixed"
                color="primary"
                sx={{
                    width: {
                        sm: `calc(100% - ${drawerWidth}px)`
                    },
                    ml: {
                        sm: `${drawerWidth}px`
                    }
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                    <IconButton
                        onClick={() => setMobileOpen(!mobileOpen)}
                        sx={{
                            display: { xs: "block", sm: "none" }
                        }}
                    >
                        <MenuIcon color='inherit' fontSize='large' />
                    </IconButton>

                    <Typography variant="h6" component={"h1"}>
                        Transcripto
                    </Typography>

                    <Box >

                        <IconButton>
                            <Badge badgeContent={4} color='secondary' >
                                <CircleNotificationsIcon color={theme.palette.common.white} />
                            </Badge>
                        </IconButton>

                        <IconButton>
                            <AccountCircleIcon />
                        </IconButton>

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
