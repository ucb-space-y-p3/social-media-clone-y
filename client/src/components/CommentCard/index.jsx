import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_COMMENT } from '../../utils/mutations';
import { removeComment, } from '../../utils/slices/feedSlice';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { red, purple } from '@mui/material/colors';

function CommentCard({ comment, isDirect }) {

    const [deleteComment] = useMutation(DELETE_COMMENT);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector((state) => state.userState.userId);

    const handleDeleteComment = async (commentId) => {
        console.log('going to delete comment', commentId);
        try {
            const comment = await deleteComment({ variables: { commentId } });

            if (!isDirect) {
                dispatch(removeComment({ id: commentId }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card sx={{ minWidth: 275 }} >
            <CardContent>
                <Avatar
                    onClick={() => navigate(`/user/${comment.creatorId}`)}
                >{`${comment.creatorFirstInitial}${comment.creatorLastInitial}`}</Avatar>
                <Typography variant="h6" component="div">
                    {comment.content}
                </Typography>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {comment.content}
                </Typography> */}
                <Typography variant="body2">
                    {comment.likeCount} Likes
                    <br />
                    {comment.createdAt}
                </Typography>
            </CardContent>
            <CardActions>
                {isDirect &&
                    <Button size="small" onClick={() => navigate(`/comments/${comment._id}`)}>Go To Post</Button>
                }

                {comment.creatorId === userId &&
                    <IconButton onClick={() => handleDeleteComment(comment._id)}
                        sx={{
                            color: red[400],
                        }}>
                        <DeleteOutlineIcon />
                    </IconButton>}

            </CardActions>
        </Card>
    );
};

export default CommentCard;