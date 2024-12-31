import {
    Box,
    Divider,
    Drawer as MuiDrawer,
    Grid2, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, styled
} from "@mui/material";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Settings from "./pages/Settings.jsx";
import React from "react";

import Tools from "./pages/Tools.jsx";
import {ChevronLeft, ChevronRight, Settings as SettingsIcon, SpaceDashboard} from "@mui/icons-material";
import theme from "./theme.js";

const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)})`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({open}) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({open}) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);


export default function App() {
    const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{display: 'flex'}}>
            <BrowserRouter>
                <Drawer
                    variant="permanent"
                    open={open}
                    onClose={e => setOpen(false)}
                >
                    <DrawerHeader>
                        <IconButton onClick={e => setOpen(!open)}>
                            {open ? <ChevronLeft/> : <ChevronRight/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                        <ListItem disablePadding component={Link} to="/">
                            <ListItemButton>
                                <ListItemIcon><SpaceDashboard/></ListItemIcon>
                                {open && <ListItemText primary="Tool dashboard"/>}
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem disablePadding component={Link} to="/settings">
                            <ListItemButton>
                                <ListItemIcon><SettingsIcon/></ListItemIcon>
                                {open && <ListItemText primary="Settings"/>}
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Box component="main" sx={{flexGrow: 1, p: 2}}>
                    <Routes>
                        <Route path="/" element={<Tools/>}/>
                        <Route path="/index.html" element={<Tools/>}/>
                        <Route path="settings" element={<Settings/>}/>
                    </Routes>
                </Box>
            </BrowserRouter>
        </Box>
    );
}
