import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Post from '../../components/Post';

function Notifications() {

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container maxWidth="sm" sx={{}}>
            <Stack spacing={2}>
                <h1>Nofitications</h1>
                {[...Array(20)].map((_, index) => (
                    <Post key={index} />
                ))}
                <h1>Last</h1>
            </Stack>
        </Container>
    );
};

export default Notifications;