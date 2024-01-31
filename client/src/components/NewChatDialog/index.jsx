import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { CREATE_CHAT } from '../../utils/mutations';
import { toggleDialogChatBox, setFirstMessage, resetNewChat, setNewName, addChat, } from '../../utils/slices/chatSlice';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewChatDialog({ }) {

  const [createChat] = useMutation(CREATE_CHAT);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isNewChatDialogOpen = useSelector((state) => state.chatState.newChat.open);
  const firstMessage = useSelector((state) => state.chatState.newChat.firstMessage);
  const newChatName = useSelector((state) => state.chatState.newChat.newChatName);
  const newRecipients = useSelector((state) => state.chatState.newChat.newRecipients);
  const friends = useSelector((state) => state.userState.friends);
  const userId = useSelector((state) => state.userState.userId);

  const newRecipientString = friends.map((friend, index) => {
    if (index === (friends.length - 1)) {
      return friend.username;
    }
    return `${friend.username}, `;
  }).join('');

  const handleClose = () => {
    dispatch(resetNewChat({}));
  }

  // fix bug in here
  const handleSubmit = async () => {
    try {
      console.log('creating new chatroom');
      // const chat = await 
      const { data: { createChat: chat}} = await createChat({
        variables: { chatName: newChatName, recipients: [...newRecipients, userId] },
      });

      dispatch(resetNewChat({}));

      console.log('chat response:', chat);

      dispatch(addChat({ newChat: { _id: chat._id, chatName: chat.chatName, userCount: chat.userCount, messageCount: chat.messageCount } }));

      navigate(`/chats/${chat._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNameChange = (event) => {
    dispatch(setNewName({ newChatName: event.target.value }));
  }

  const handleContentChange = (event) => {
    dispatch(setFirstMessage({ firstMessage: event.target.value }));
  }

  return (
    <Dialog
      open={isNewChatDialogOpen}
      TransitionComponent={Transition}
      // keepMounted
      scroll='paper'
      fullWidth
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Create A New Chatroom"}</DialogTitle>
      <DialogContent>

        <TextField label="New Chat Name" variant="standard" value={newChatName} color="secondary" autoFocus focused onChange={handleNameChange} />

        <TextField
          id="outlined-read-only-input"
          label="New Recipients"
          value={newRecipientString}
          InputProps={{
            readOnly: true,
          }}
          sx={{
            marginTop: 1,
            marginBottom: 1,
          }}
        />

        <TextField label="First Message" variant="filled" color="secondary" onChange={handleContentChange} value={firstMessage} />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create Chat</Button>
      </DialogActions>
    </Dialog>
  )
}