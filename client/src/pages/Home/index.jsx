import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { GET_PUBLIC_POSTS, } from '../../utils/queries';

import { setFeed } from '../../utils/slices/feedSlice';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import LoopIcon from '@mui/icons-material/Loop';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PostCard from '../../components/PostCard';
import ScrollToTopMain from '../../components/ScrollToTopMain';
import { populatePublicPosts, populateCirclePosts, toggleDialogPostBox } from '../../utils/slices/feedSlice';

function Home() {

    const dispatch = useDispatch();

    const feedState = useSelector((state) => state.feedState.currentFeed);
    const publicPosts = useSelector((state) => state.feedState.publicPosts);

    const { loading, error, data, refetch } = useQuery(GET_PUBLIC_POSTS, {
        fetchPolicy: 'no-cache', // Used for first execution
        nextFetchPolicy: 'no-cache', // Used for subsequent executions
    });

    useEffect(() => {
        // console.log('testing graphql fetching');

        if (!loading) {
            if (!error) {
                if (data) {
                    console.log('test effect:', data);
                    dispatch(populatePublicPosts({ posts: data.getAllPosts }));
                }
            } else {
                // throw error on screen
                console.log('There was an error loading me!')
            }
        }

    }, [loading, error, data])


    const handleRefresh = async () => {
        try {
            // console.log('handling refresh');
            const data = await refetch();
            // console.log('data from refresh hopefully', data);
            dispatch(populatePublicPosts({ posts: data.data.getAllPosts }));
        } catch (error) {
            console.log('refetch error', error);
        }
    }


    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container maxWidth="md" sx={{ paddingTop: 14 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100'
            }}>
                <Tabs
                    value={feedState}
                    onChange={(event, newValue) => dispatch(setFeed({ feed: newValue }))}
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
                    <Tab value="circle" label="My Circle" disabled />
                </Tabs>
            </Box>
            <Stack spacing={0.7}>
                <h1 id="back-to-top-anchor">Home</h1>

                {publicPosts.length > 0 &&
                    publicPosts.map((post, index) => (
                        <PostCard key={index} post={post} feedState={feedState} />
                    ))
                }

                {/* {data?.getAllPosts?.length > 0 &&
                    data.getAllPosts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))
                } */}

                {/* <h1>Last</h1> */}
            </Stack>
            <ScrollToTopMain />
            <Fab color="secondary" aria-label="add" onClick={() => dispatch(toggleDialogPostBox({}))}
                sx={{
                    position: "fixed",
                    bottom: { xs: 100, md: 90, lg: 80 },
                    right: { xs: 40, md: 60, lg: 380 }
                }}>
                <AddIcon />
            </Fab>
            {/* <IconButton color="secondary" onClick={() => triggerRefresh(!refresh)} */}
            <IconButton color="secondary" onClick={handleRefresh}
                sx={{
                    position: "fixed",
                    // top: { xs: 120, md: 120, lg: 120 },
                    top: 120,
                    right: { xs: 40, md: 60, lg: 380 }
                }}>
                <LoopIcon />
            </IconButton >
        </Container>
    );
};

export default Home;
