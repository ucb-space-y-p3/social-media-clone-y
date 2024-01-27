import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Post from '../../components/Post';
import ScrollToTopMain from '../../components/ScrollToTopMain';

function Notifications() {
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
                    <Tab value="comment" label="Comments" disabled />
                    <Tab value="message" label="Messages" disabled />
                </Tabs>
            </Box>
            <Stack spacing={0.7}>
                <h1 id="back-to-top-anchor">Nofitications</h1>
                {[...Array(20)].map((_, index) => (
                    <Post key={index} />
                ))}
                <h1>Last</h1>
            </Stack>
            <ScrollToTopMain />
            <Fab color="primary" aria-label="add" disabled
            sx={{
                position: "fixed",
                bottom: { xs: 100, md: 90, lg: 80 },
                right: { xs: 40, md: 60, lg: 380 }
            }}>
                <AddIcon />
            </Fab>
        </Container>
    );
};

export default Notifications;