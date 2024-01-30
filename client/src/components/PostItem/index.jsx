import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { DELETE_POST } from '../../utils/mutations';
import { removePublicPost } from '../../utils/slices/feedSlice';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { red, purple } from '@mui/material/colors';

function PostItem({ post }) {

  const [deletePost] = useMutation(DELETE_POST);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const alignment = message.creatorId === userId ? 'end' : 'start';

  const handleDeletePost = async (postId) => {
    console.log('going to delete post', postId);
    try {
      const post = await deletePost({ variables: { postId } });
      dispatch(removePublicPost({ id: postId }));
      dispatch(removePublicPost({ id: postId }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ListItem sx={{
      // justifyContent: alignment,
      // textAlign: alignment,
      paddingLeft: 2,
    }}>
      <Box>
        <Avatar
        >{`${post.creatorFirstInitial}${post.creatorLastInitial}`}</Avatar>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {post.creator}
        </Typography>
        <Typography variant="h6" component="div">
          {post.content}
        </Typography>
        <Typography variant="body2">
          {post.likeCount} Likes
          <br />
          {post.createdAt}
        </Typography>
        <Button size="small" onClick={() => navigate(`/posts/${post._id}`)}>{post.commentCount} Comments</Button>
        <IconButton onClick={() => handleDeletePost(post._id)}
          sx={{
            color: red[400],
          }}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default PostItem;