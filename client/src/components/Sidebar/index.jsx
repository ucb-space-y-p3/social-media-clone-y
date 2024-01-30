import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import Auth from '../../utils/auth';
import { GET_CHATS, } from '../../utils/queries';

import { toggleThemeMode, } from '../../utils/slices/userSlice';
import { toggleDialogChatBox, populateChats, } from '../../utils/slices/chatSlice';

// import ScrollToTopSide from '../ScrollToTopSide';
import ChatItem from '../ChatItem';

// import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import GroupsIcon from '@mui/icons-material/Groups';
import CottageIcon from '@mui/icons-material/Cottage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import LoopIcon from '@mui/icons-material/Loop';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
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


// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });


function Sidebar({ children }) {

    const dispatch = useDispatch()

    const isDarkMode = useSelector((state) => state.userState.settings.isDarkMode);
    const username = useSelector((state) => state.userState.username);
    const firstInitial = useSelector((state) => state.userState.firstInitial);
    const lastInitial = useSelector((state) => state.userState.lastInitial);
    const activeChats = useSelector((state) => state.chatState.activeChats);

    const { loading, error, data, refetch } = useQuery(GET_CHATS, {
        fetchPolicy: 'no-cache', // Used for first execution
        nextFetchPolicy: 'no-cache', // Used for subsequent executions
    });

    // const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (!loading) {
            if (!error) {
                if (data) {
                    // console.log('chats effect:', data);
                    dispatch(populateChats({ chats: data.me.activeChats }));
                }
            } else {
                // throw error on screen
                console.log('There was an error loading me!')
            }
        }

    }, [loading, error, data])


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
    }

    const handleDirection = (newPage) => {
        // console.log(`/${newPage}`)
        navigate(`/${newPage}`);
    }


    const handleRefresh = async () => {
        try {
            // console.log('handling refresh');
            const data = await refetch();
            console.log('data from refresh hopefully', data);
            dispatch(populateChats({ chats: data.data.me.activeChats }));
        } catch (error) {
            console.log('sidebar chats refetch error', error);
        }
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
                <Avatar>{`${firstInitial}${lastInitial}`}</Avatar>
                <Typography noWrap>{username}</Typography>
                <IconButton onClick={() => dispatch(toggleThemeMode())}
                    sx={{}}>
                    {isDarkMode ?
                        <LightModeIcon color="secondary" />
                        :
                        <ModeNightIcon color="secondary" />
                    }
                </IconButton>
            </Stack>
            <Divider />
            <List>
                <ListItem disablePadding onClick={(() => handleDirection(''))}>
                    <ListItemButton>
                        <ListItemIcon>

                            <CottageIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={(() => handleDirection('notifications'))}>
                    <ListItemButton>
                        <ListItemIcon>

                            <NotificationsIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={"Notifications"} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={(() => handleDirection('search'))}>
                    <ListItemButton>
                        <ListItemIcon>

                            <SearchIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={"Search"} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={(() => handleDirection('favorites'))}>
                    <ListItemButton>
                        <ListItemIcon>

                            <FavoriteIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={"Favorites"} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={(() => handleDirection(`user/${username}`))}>
                    <ListItemButton>
                        <ListItemIcon>

                            <PersonIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} />

                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding onClick={(() => handleDirection('me/settings'))}>
                    <ListItemButton>
                        <ListItemIcon>

                            <TuneIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={"Settings"} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={handleLogOut}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={"Log Out"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const chatsDrawer = (
        <Box >
            <AppBar
                position="fixed"
                sx={{
                    height: 65,
                    width: {
                        md: `${meduimDrawerWidth}px`,
                        lg: ` ${largeDrawerWidth}px`
                    },
                    left: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Toolbar sx={{
                    // flexGrow: 1,
                    justifyContent: "center"
                }}>
                    <Typography noWrap>Chatrooms</Typography>
                    <IconButton color="secondary" onClick={handleRefresh}
                        sx={{
                            display: { xs: 'none', md: 'inline-flex', },
                            position: "absolute",
                            top: 12,
                            left: { xs: 40, md: 150, lg: 150 }
                        }}>
                        <LoopIcon />
                    </IconButton >

                </Toolbar>

                {/* <Typography noWrap>Chatrooms</Typography> */}

            </AppBar>
            {/* <Divider id="back-to-top-chat-anchor" /> */}

            {/* <ScrollToTopSide /> */}

            <List sx={{ paddingTop: 8, paddingBottom: 24 }}>

                {activeChats?.length > 0 &&
                    activeChats.map((chat, index) => (
                        <Box key={index}>
                            <Divider />
                            <ChatItem chat={chat} />
                        </Box>
                    ))
                }

            </List>

        </Box>
    );

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


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
                        <Avatar>{`${firstInitial}${lastInitial}`}</Avatar>
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
                        <Avatar>{`${firstInitial}${lastInitial}`}</Avatar>
                    </IconButton>

                    <img src={Y} alt="y logo" width="80" style={{
                        position: 'absolute',
                        top: -35,
                    }} />

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
                    <Fab variant="extended" color="secondary" onClick={() => dispatch(toggleDialogChatBox({}))}
                        sx={{
                            position: "fixed",
                            bottom: { md: 65 },
                            left: { md: 55, lg: 95 }
                        }}>
                        Create New Room
                        <GroupsIcon sx={{ ml: 1 }} />
                    </Fab>
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