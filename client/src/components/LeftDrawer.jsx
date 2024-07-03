import Menu from '@mui/icons-material/Menu';
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import RightBar from './RightBar';
import AudioFile from './AudioFile';
import Header from './Header';

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


const LeftDrawer = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Header drawerWidth={drawerWidth} />
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
        </Box>
    )
}

export default LeftDrawer
