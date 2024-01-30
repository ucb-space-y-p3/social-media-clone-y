import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';


import { GET_ME, GET_USER, } from '../../utils/queries';
import { REQUEST_FRIEND, } from '../../utils/mutations';

import { setProfile } from '../../utils/slices/userSlice';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

function UserProfile() {

    const dispatch = useDispatch();

    const { username } = useParams();

    const { loading, error, data, refetch } = useQuery(GET_USER, {
        fetchPolicy: 'no-cache',
        variables: {
            username
        }
    });

    const [value, setValue] = useState('post');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const userId = useSelector((state) => state.userState.profile.userId);
    const firstInitial = useSelector((state) => state.userState.profile.firstInitial);
    const lastInitial = useSelector((state) => state.userState.profile.lastInitial);
    const friendCount = useSelector((state) => state.userState.profile.friendCount);
    const postCount = useSelector((state) => state.userState.profile.postCount);


    useEffect(() => {
        if (!loading) {
            if (!error) {
                if (data) {
                    console.log('profile effect:', data);
                    dispatch(setProfile({
                        userId: data.getUser._id,
                        username: data.getUser.username,
                        firstInitial: data.getUser.firstInitial,
                        lastInitial: data.getUser.lastInitial,
                        friendCount: data.getUser.friendCount,
                        postCount: data.getUser.postCount,
                    }));
                }
            } else {
                // throw error on screen
                console.log('There was an error loading me!')
            }
        }

    }, [loading, error, data])

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container id="" maxWidth="md" sx={{
            height: '90vh',
            paddingBottom: 0
        }}>
            <Paper sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
            }}>
                <h1
                    id="back-to-top-anchor"
                    style={{ marginTop: '0.6em', textAlign: 'center', }}
                >{username}</h1>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 1,
                }}>
                    <Avatar>{`${firstInitial}${lastInitial}`}</Avatar>
                    <IconButton color="secondary"
                        sx={{
                            marginTop: 2,
                            marginBottom: 1,
                        }}>
                        <AddIcon sx={{ fontSize: 30 }}/>
                    </IconButton >
                    <Typography>Add User</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100'
                }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="post" label={`${postCount} Posts`} />
                        <Tab value="comment" label="Comments" />
                        <Tab value="request" label="Requests" />
                        <Tab value="friend" label={`${friendCount} Friends`} />
                    </Tabs>
                </Box>
                {/* <Stack
                    spacing={0.7}
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        overflow: 'auto',
                    }}
                >

                    {messages.length > 0 &&
                        messages.map((message, index) => (
                            <MessageItem key={index} message={message} />
                        ))
                    }

                </Stack> */}
            </Paper>
        </Container>
    );
};

export default UserProfile;