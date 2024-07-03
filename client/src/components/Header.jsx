import { AppBar, Toolbar } from '@mui/material'
import React from 'react'

const Header = ({drawerWidth}) => {
    return (
        <AppBar position='fixed' sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: drawerWidth }}>
            <Toolbar>
                Permanent Drawer
            </Toolbar>
        </AppBar>
    )
}

export default Header
