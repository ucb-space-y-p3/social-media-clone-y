import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { DELETE_POST } from '../../utils/mutations';
import { removePublicPost } from '../../utils/slices/feedSlice';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { red, purple } from '@mui/material/colors';

function PostCard({ post, feedState, isDirect }) {

    const [deletePost] = useMutation(DELETE_POST);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeletePost = async (postId) => {
        console.log('going to delete post', postId);
        try {
            const post = await deletePost({ variables: { postId } });
            dispatch(removePublicPost({ id: postId }));

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Card sx={{ minWidth: 275 }} >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {feedState === 'circle' ?
                        post.creator :
                        `${post.creatorFirstInitial}${post.creatorLastInitial}`
                    }
                </Typography>
                <Typography variant="h6" component="div">
                    {post.content}
                </Typography>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {post.content}
                </Typography> */}
                <Typography variant="body2">
                    {post.likeCount} Likes
                    <br />
                    {post.createdAt}
                </Typography>
            </CardContent>
            <CardActions>
                {isDirect ?
                    <Button size="small" >{post.commentCount} Comments</Button> :
                    <Button size="small" onClick={() => navigate(`/posts/${post._id}`)}>{post.commentCount} Comments</Button>

                }

                <IconButton onClick={() => handleDeletePost(post._id)}
                    sx={{
                        color: red[400],
                    }}>
                    <DeleteOutlineIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default PostCard;