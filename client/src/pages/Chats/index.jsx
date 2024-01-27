import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import GroupsIcon from '@mui/icons-material/Groups';

import Post from '../../components/Post';
import ScrollToTopMain from '../../components/ScrollToTopMain';

function Chats() {

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container maxWidth="md" sx={{}}>
            <Stack spacing={0.7}>
                <h1 id="back-to-top-anchor">Chats</h1>
                {[...Array(20)].map((_, index) => (
                    <Post key={index} />
                ))}
                <h1>Last</h1>
            </Stack>
            <ScrollToTopMain />
            <Fab variant="extended" color="primary" sx={{
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