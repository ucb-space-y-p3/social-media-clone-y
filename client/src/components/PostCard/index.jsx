import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function PostCard({ post }) {

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {post.creator}
                </Typography>
                <Typography variant="h5" component="div">
                    {post.content}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {post.content}
                </Typography>
                <Typography variant="body2">
                    {post.likeCount} Likes
                    <br />
                    {post.createdAt}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">{post.commentCount} Comments</Button>
            </CardActions>
        </Card>
    );
};

export default PostCard;