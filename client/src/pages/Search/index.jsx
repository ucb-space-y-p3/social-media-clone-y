import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';

import ScrollToTopMain from '../../components/ScrollToTopMain';

function Search() {
    const [value, setValue] = useState('user');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container id="" maxWidth="md" sx={{
            height: '90vh',
            paddingBottom: 0
        }}>
            <Paper id="back-to-top-anchor"
                sx={{
                    height: '100%',

                }}>
                {/* <Typography
                    sx={{
                        // height: 1
                    }}
                >Search</Typography> */}
                <Grid container >
                    <Grid item xs={12} sx={{
                        // display: 'flex',
                    }}>
                        <TextField label="Search" color="secondary" focused sx={{
                            // position: 'static',
                            // top: 0,
                            // right: 0,
                            // left: 0,
                        }} />
                    </Grid>
                </Grid>

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
                        <Tab value="user" label="Users" />
                        <Tab value="post" label="Posts" disabled/>
                        <Tab value="message" label="Messages" disabled/>
                    </Tabs>
                </Box>
            </Paper>
            <ScrollToTopMain />
        </Container>
    );
};

export default Search;