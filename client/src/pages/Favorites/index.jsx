import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Post from '../../components/Post';
import ScrollToTopMain from '../../components/ScrollToTopMain';

function Favorites() {
    const [value, setValue] = useState('post');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container maxWidth="md" sx={{ paddingTop: 14 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100'
            }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    sx={{
                        // bgcolor: 'black',
                        position: 'fixed',
                        top: 80,
                    }}
                >
                    <Tab value="post" label="Posts" />
                    <Tab value="comment" label="Comments" disabled/>
                </Tabs>
            </Box>
            <Stack spacing={0.7}>
                <h1 id="back-to-top-anchor">Favorites</h1>
                {[...Array(20)].map((_, index) => (
                    <Post key={index} />
                ))}
                <h1>Last</h1>
            </Stack>
            <ScrollToTopMain />
        </Container>
    );
};

export default Favorites;