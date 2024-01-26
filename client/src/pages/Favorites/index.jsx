import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Post from '../../components/Post';

function Favorites() {

    return (
        <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
            <Stack id='testkb' spacing={2}>
                <h1>Favorites</h1>
                {[...Array(20)].map((_, index) => (
                    <Post key={index} />
                ))}
                <h1>Last</h1>
            </Stack>

        </Container>
    );
};

export default Favorites;