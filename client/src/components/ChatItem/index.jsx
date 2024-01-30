import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { LEAVE_CHAT } from '../../utils/mutations';
import { deleteChat } from '../../utils/slices/chatSlice';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { red, purple } from '@mui/material/colors';

export default function ChatItem({ chat }) {

  const [leaveChat] = useMutation(LEAVE_CHAT);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteChat = async (chatId) => {
    console.log(`going to leave chat (${chat.chatName})`, chatId);
    try {
      const chat = await leaveChat({ variables: { chatId } });
      dispatch(deleteChat({ id: chatId }));

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => navigate(`/chats/${chat._id}`)}>
        <ListItemIcon>
          <PeopleAltIcon sx={{
            marginTop: 1,
            marginBottom: 1,
            marginLeft: 1
          }} />
        </ListItemIcon>
        <Typography noWrap>{chat.chatName}</Typography>
      </ListItemButton>
      <IconButton onClick={() => handleDeleteChat(chat._id)}
        sx={{
          color: red[400],
          paddingRight: 4,
        }}>
        <DeleteOutlineIcon />
      </IconButton>
    </ListItem>
  )
}