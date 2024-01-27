import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Paper';

import Post from '../../components/Post';
import ScrollToTopMain from '../../components/ScrollToTopMain';

function Settings() {

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container id="" maxWidth="md" sx={{
            height: '90vh',
            paddingBottom: 0
        }}>
            <Paper sx={{
                height: '100%',

            }}>
                <Typography
                    sx={{
                        // height: 1
                    }}
                >Settings</Typography>
            </Paper>
        </Container>
    );
};

export default Settings;