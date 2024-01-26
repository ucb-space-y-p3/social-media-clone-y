import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth';
import { CREATE_USER } from '../../utils/mutations';

function SignUp() {
    const [formState, setFormState] = useState({ email: '', password: '', username: '' });
    const [addUser] = useMutation(CREATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await addUser({
                variables: {
                    input: {
                        email: formState.email,
                        password: formState.password,
                        username: formState.username
                    }
                },
            });
            console.log(mutationResponse);
            const token = mutationResponse.data.createUser.token;
            Auth.login(token);
            // rtk here
            redirect('/');
        } catch (error) {
            console.log(error);
            // do a timed popup

        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const testChange = (event) => {
        console.log("test input change -", event.target.value);
    }

    // const defaultTheme = createTheme();

    return (
        // <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={12} sm={6}> */}
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        // {/* </ThemeProvider> */}
    );
};

export default SignUp;