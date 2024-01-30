import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentComments, setCurrentPostId } from '../../utils/slices/feedSlice';
import { GET_POST, } from '../../utils/queries';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import LoopIcon from '@mui/icons-material/Loop';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Paper';

import ScrollToTopMain from '../../components/ScrollToTopMain';
import PostCard from '../../components/PostCard';
import CommentCard from '../../components/CommentCard';
import { toggleDialogCommentBox } from '../../utils/slices/feedSlice';

function Post() {

    const dispatch = useDispatch();

    const { postId } = useParams();

    const currentComments = useSelector((state) => state.feedState.currentComments);

    const { loading, error, data, refetch } = useQuery(GET_POST, {
        fetchPolicy: 'no-cache',
        variables: {
            postId
        }
    });

    useEffect(() => {
        if (!loading) {
            if (!error) {
                if (data) {
                    // console.log('home effect:', data);
                    dispatch(setCurrentPostId({ currentPostId: data.getPost._id }));
                    dispatch(setCurrentComments({ currentComments: data.getPost.comments }));
                }
            } else {
                // throw error on screen
                console.log('There was an error loading post!')
            }
        }

    }, [loading, error, data])

    const handleRefresh = async () => {
        try {
            // console.log('handling refresh');
            const data = await refetch();
            // console.log('data from refresh hopefully', data);
            dispatch(setCurrentComments({ currentComments: data.data.getPost.comments }));
        } catch (error) {
            console.log('post refetch error', error);
        }
    }

    return (
        <Container maxWidth="md" sx={{ paddingTop: 7 }}>
            <h1 id="back-to-top-anchor">Post</h1>

            {!loading && <PostCard post={data?.getPost} isDirect />}

            <h1>Comments</h1>
            <Stack spacing={0.7}>

                {currentComments?.length > 0 &&
                    currentComments.map((comment, index) => (
                        <CommentCard key={index} comment={comment} />
                    ))
                }

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
            <IconButton color="secondary" onClick={handleRefresh}
                sx={{
                    position: "fixed",
                    // top: { xs: 120, md: 120, lg: 120 },
                    top: 120,
                    right: { xs: 40, md: 60, lg: 380 }
                }}>
                <LoopIcon sx={{ fontSize: 30 }} />
            </IconButton >
        </Container>
    );
};

export default Post;