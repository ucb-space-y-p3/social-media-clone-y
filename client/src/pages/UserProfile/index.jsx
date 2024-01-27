import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Paper';


function UserProfile() {

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
                >Profile</Typography>
            </Paper>
        </Container>
    );
};

export default UserProfile;