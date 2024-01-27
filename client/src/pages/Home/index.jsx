import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { redirect } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import PostCard from '../../components/PostCard';
import ScrollToTopMain from '../../components/ScrollToTopMain';

function Home() {
    const [value, setValue] = useState('public');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container id="ooooooee" maxWidth="md" sx={{ paddingTop: 14 }}>
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
                    <Tab value="public" label="The Public" />
                    <Tab value="circle" label="My Circle" />
                </Tabs>
            </Box>
            <Stack spacing={0.7}>
                <h1 id="back-to-top-anchor">Home</h1>
                {[...Array(20)].map((_, index) => (
                    <PostCard key={index} />
                ))}
                <h1>Last</h1>
            </Stack>
            <ScrollToTopMain />
            <Fab color="primary" aria-label="add" sx={{
                position: "fixed",
                bottom: { xs: 100, md: 90, lg: 80 },
                right: { xs: 40, md: 60, lg: 380 }
            }}>
                <AddIcon />
            </Fab>
        </Container>
    );
};

export default Home;
