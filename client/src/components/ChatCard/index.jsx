import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { LEAVE_CHAT } from '../../utils/mutations';
import { deleteChat } from '../../utils/slices/chatSlice';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { red, purple } from '@mui/material/colors';

function ChatCard({ chat }) {

    const [leaveChat] = useMutation(LEAVE_CHAT);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteChat = async (chatId) => {
        console.log(`going to leave chat (${chat.chatName})`, chatId);
        try {
            const post = await leaveChat({ variables: { chatId } });
            dispatch(deleteChat({ id: chatId }));

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card sx={{ minWidth: 275 }} >
            <CardContent>
                <Typography variant="h6" component="div">
                    {chat.chatName}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {chat.messageCount} Messages
                </Typography>
                <Typography variant="body2">
                    {chat.userCount} Recipients
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/chats/${chat._id}`)}>Go To Chat</Button>

                <IconButton onClick={() => handleDeleteChat(chat._id)}
                    sx={{
                        color: red[400],
                        // position: 'fixed',
                        // right: { xs: 100, lg: 400 }
                    }}>
                    <DeleteOutlineIcon />
                </IconButton>

            </CardActions>
        </Card>
    );
};

export default ChatCard;