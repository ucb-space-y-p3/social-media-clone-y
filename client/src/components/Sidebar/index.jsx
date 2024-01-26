import { useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../../utils/auth';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import CottageIcon from '@mui/icons-material/Cottage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';

import Y from '../../assets/fancy_Y.svg';

// import { createSvgIcon } from '@mui/material/utils';

// const YIcon = createSvgIcon(Y);


const largeDrawerWidth = 400;
const meduimDrawerWidth = 320;
const smallDrawerWidth = 240;


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

    const settingsDrawer = (
        <div style={{ paddingLeft: 8 }}>
            {/* <Toolbar /> */}
            {/* <Container sx={{
                display: 'flex',
                justifyContent: 'center',

            }}>

            </Container> */}
            <Stack spacing={2} direction="row" alignItems="center" justifyContent=""
                sx={{
                    padding: 2,
                }}>
                <Avatar>WX</Avatar>
                <Typography noWrap>TesterGuy</Typography>
            </Stack>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>

                            <CottageIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>

                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Notifications"} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>

                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Search"} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>

                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Favorites"} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>

                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} />

                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>

                            <TuneIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Settings"} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={handleLogOut}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Log Out"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const chatsDrawer = (
        <Box style={{ zIndex: 10000000000 }}>
            <Paper elevation={10} sx={{
                // padding: 2,
                position: 'sticky',
                top: 0,
                
                // backgroundColor: 'red'
            }}>
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="center"
                    sx={{
                        // padding: 2,
                        // position: 'sticky',
                        // top: 0
                    }}>
                    <Typography noWrap>Chatrooms</Typography>
                </Stack>
            </Paper>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar>WXZ</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={"testkb"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar></Avatar>
                        </ListItemIcon>
                        {/* make the list item text turn into ellipsis */}
                        <ListItemText primary={"person 1, person 2, person 3"} />
                    </ListItemButton>
                </ListItem>
            </List>
            {/* <List>
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
            </List>  */}
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    height: 80,
                    width: {
                        md: `calc(100% - ${meduimDrawerWidth}px)`,
                        lg: `calc(100% - ${meduimDrawerWidth + largeDrawerWidth}px)`
                    },
                    ml: { md: `${meduimDrawerWidth}px`, lg: `${largeDrawerWidth}px` },
                    mr: { lg: `${meduimDrawerWidth}px` },
                }}
            >
                <Toolbar sx={{
                    flexGrow: 1,
                    justifyContent: "center"
                }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { md: 'none' },
                            position: "absolute",
                            top: 15,
                            left: 40
                        }}
                    >
                        {/* <MenuIcon /> */}
                        <Avatar>WX</Avatar>
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'block', lg: 'none' },
                            position: "absolute",
                            top: 15,
                            right: 25
                        }}
                    >
                        {/* <MenuIcon /> */}
                        <Avatar>WX</Avatar>
                    </IconButton>

                    <img src={Y} alt="y logo" width="80" style={{
                        position: 'absolute',
                        top: -35,
                    }} />

                    {/* <YIcon /> */}

                    {/* <Typography variant="h6" noWrap component="div">
                        Y
                    </Typography> */}


                </Toolbar>
            </AppBar>



            <Box
                component="nav"
                sx={{ width: { md: meduimDrawerWidth, lg: largeDrawerWidth }, flexShrink: { md: 0 } }}
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
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: smallDrawerWidth },
                    }}
                >
                    {settingsDrawer}
                </Drawer>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    anchor="right"
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'none', md: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: smallDrawerWidth },
                    }}
                >
                    {settingsDrawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { md: meduimDrawerWidth, lg: largeDrawerWidth } },
                    }}
                    open
                >
                    {chatsDrawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    anchor="right"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: meduimDrawerWidth },
                    }}
                    open
                >
                    {settingsDrawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mr: { lg: `${meduimDrawerWidth}px` },
                }}
            >
                {children}
            </Box>
        </Box >
    );
};

export default Sidebar;