import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { redirect } from 'react-router-dom';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Post from '../../components/Post';


function Home() {

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container id="ooooooee" maxWidth="sm" sx={{}}>
            <Stack spacing={2}>
                <h1>Home</h1>
                {[...Array(20)].map((_, index) => (
                    <Post key={index} />
                ))}
                <h1>Last</h1>
            </Stack>
        </Container>
    );
};

export default Home;
