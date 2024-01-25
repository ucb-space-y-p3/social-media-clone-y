import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';


import { useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../../utils/auth';

const drawerWidth = 240;

function Sidebar({ children }) {
    // const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleLogOut = () => {
        // console.log('logging out');
        Auth.logout();
        redirect('/');
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={"testkb"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={"testkb1"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={"tatata"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={handleLogOut}>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Log Out"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>



            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>


            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
            >

                {children}

            </Box>
        </Box>
    );
};

export default Sidebar;