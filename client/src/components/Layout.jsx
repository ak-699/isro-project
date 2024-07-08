import { Box, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import LeftBar from './LeftBar'
import { Outlet } from 'react-router-dom'
import { useTheme } from '@emotion/react'
import Header from './Header'

const Layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box>

            <Header drawerWidth={240} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            <Box sx={
                {
                    display:"flex",
                    flexShrink: 0,
                }
            }>
                <LeftBar drawerWidth={240} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
                <Box sx={{
                    flexGrow:1,
                    p:3,
                    width:"calc(100% - 240px)"
                }}>
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>

        </Box>
    )
}

export default Layout
