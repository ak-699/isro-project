import Menu from '@mui/icons-material/Menu';
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import DataTable from './DataTable';
import RightBar from './RightBar';
import AudioFile from './AudioFile';
import { useEffect, useState } from 'react';

const drawerWidth = 280;

const topList = [
    {
        id: 1,
        name: "Dashboard",
        icon: <DashboardIcon />
    },
    {
        id: 2,
        name: "All Files",
        icon: <FolderIcon />
    },
    {
        id: 3,
        name: "Settings",
        icon: <SettingsIcon />
    }
];

const bottomList = [
    {
        id: 1,
        name: "Profile",
        icon: <PersonIcon />,
    },
    {
        id: 2,
        name: "Settings",
        icon: <SettingsIcon />,
    }
]

const PermanentDrawer = () => {

    const [files, setFiles] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/all-files");
            if (!response.ok) {
                throw new Error("error occured while fetching files");
            }
            const result = await response.json();
            setFiles(result);
            console.log(result);
        }

        fetchData();
    }, [])

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position='fixed' sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: drawerWidth }}>
                <Toolbar>
                    Permanent Drawer

                </Toolbar>
            </AppBar>
            <Drawer sx={{
                width: drawerWidth,
                "& .MuiPaper-root": {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                }
            }} variant='permanent' anchor='left'>
                <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton>
                        <Menu />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List>
                    <Box>

                        {
                            topList.map(item => (
                                <ListItem key={item.id}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </Box>

                    <Divider />
                    <Box>

                        {
                            bottomList.map(item => (
                                <ListItem key={item.id}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </Box>




                </List>
            </Drawer>
            <Box sx={{ p: 3, flexGrow: 1 }}>
                <Toolbar />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ flexGrow: 1, mr: 3, display:"flex", gap:2, flexWrap:"wrap" }}>
                        {
                            files?.map(file => (
                                <AudioFile audioName={file.filename} audioDate={file.updatedAt} id={file._id} />
                            ))
                        }
                    </Box>
                    <RightBar />
                </Box>
            </Box>
        </Box>
    )
}

export default PermanentDrawer
