import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { GET_CHATS, } from '../../utils/queries';

import { toggleDialogChatBox, populateChats, } from '../../utils/slices/chatSlice';

import ChatCard from '../../components/ChatCard';
import ScrollToTopMain from '../../components/ScrollToTopMain';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import LoopIcon from '@mui/icons-material/Loop';
import GroupsIcon from '@mui/icons-material/Groups';

function Chats() {
    const dispatch = useDispatch()

    const activeChats = useSelector((state) => state.chatState.activeChats);

    const { loading, error, data, refetch } = useQuery(GET_CHATS, {
        fetchPolicy: 'no-cache', // Used for first execution
        nextFetchPolicy: 'no-cache', // Used for subsequent executions
    });

    useEffect(() => {
        // console.log('testing graphql fetching');

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

    const handleRefresh = async () => {
        try {
            // console.log('handling refresh');
            const data = await refetch();
            console.log('data from refresh hopefully', data);
            dispatch(populateChats({ chats: data.data.me.activeChats }));
        } catch (error) {
            console.log('chats refetch error', error);
        }
    }

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container maxWidth="md" sx={{}}>
            <Stack spacing={0.7}>
                <h1 id="back-to-top-anchor">Chats</h1>

                {activeChats?.length > 0 &&
                    activeChats.map((chat, index) => (
                        <ChatCard key={index} chat={chat} />
                    ))
                }

                {/* <h1>Last</h1> */}
            </Stack>
            <ScrollToTopMain />
            <Fab
                onClick={() => dispatch(toggleDialogChatBox({}))}
                variant="extended"
                color="secondary"
                sx={{
                    position: "fixed",
                    bottom: { xs: 100, md: 90, lg: 80 },
                    right: { xs: 40, md: 60, lg: 380 }
                }}>
                Create New Room
                <GroupsIcon sx={{ ml: 1 }} />
            </Fab>
            <IconButton color="secondary" onClick={handleRefresh}
                sx={{
                    position: "fixed",
                    top: 100,
                    right: { xs: 40, md: 60, lg: 380 }
                }}>
                <LoopIcon />
            </IconButton >
        </Container>
    );
};

export default Chats;