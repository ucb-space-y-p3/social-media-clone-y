import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { toggleDialogChatBox, } from '../../utils/slices/chatSlice';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import GroupsIcon from '@mui/icons-material/Groups';

import PostCard from '../../components/PostCard';
import ScrollToTopMain from '../../components/ScrollToTopMain';

function Chats() {
    const dispatch = useDispatch()

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container maxWidth="md" sx={{}}>
            <Stack spacing={0.7}>
                <h1 id="back-to-top-anchor">Chats</h1>

                

                <h1>Last</h1>
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
        </Container>
    );
};

export default Chats;