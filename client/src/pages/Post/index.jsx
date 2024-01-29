import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { GET_POST, } from '../../utils/queries';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Paper';

import ScrollToTopMain from '../../components/ScrollToTopMain';
import PostCard from '../../components/PostCard';
import { toggleDialogCommentBox } from '../../utils/slices/feedSlice';

function Post() {

    const dispatch = useDispatch();

    const { postId } = useParams();
    const feedState = useSelector((state) => state.feedState.currentFeed);

    const { loading, error, data } = useQuery(GET_POST, {
        fetchPolicy: 'no-cache',
        variables: {
            postId
        }
    });

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>

        <Container maxWidth="md" sx={{ paddingTop: 10 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100'
            }}>

            </Box>
            <Typography
                sx={{
                    // height: 1
                }}
            >Post - {postId}</Typography>


            {!loading && <PostCard post={data?.getPost} isDirect />}

            <Stack spacing={0.7}>
                <h1 id="back-to-top-anchor">Post</h1>

                {/* {publicPosts.length > 0 &&
                    publicPosts.map((post, index) => (
                        <PostCard key={index} post={post} feedState={feedState} />
                    ))
                } */}

                <h1>Last</h1>
            </Stack>
            <ScrollToTopMain />
            <Fab color="secondary" aria-label="add" onClick={() => dispatch(toggleDialogCommentBox({}))}
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

export default Post;