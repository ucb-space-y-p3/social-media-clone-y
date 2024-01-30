import { useState } from 'react';
import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChatUserBox, setCurrentRecipients } from '../../utils/slices/chatSlice';

import { ADD_USER_TO_CHAT } from '../../utils/mutations';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewChatUserDialog({ }) {

  const [newUsername, setNewUser] = useState('');

  const [addUserToChat] = useMutation(ADD_USER_TO_CHAT);

  const dispatch = useDispatch();

  const isChatUserDialogOpen = useSelector((state) => state.chatState.currentChat.openDialog);
  const chatId = useSelector((state) => state.chatState.currentChat.id);

  const handleClose = () => {
    dispatch(toggleChatUserBox({}));
  };

  const handleSubmit = async () => {
    console.log('adding new user to chat');
    dispatch(toggleChatUserBox({}));
    try {
      console.log('user being added:', newUsername);
      const { data: { addUserToChat:  returnedChat } } = await addUserToChat({
        variables: { chatId, username: newUsername },
      });
      console.log('new chat users', returnedChat);
      setNewUser('');
      dispatch(setCurrentRecipients({ recipients: returnedChat.recipients }))
    } catch (error) {
      console.log(error);
    }
  };

  const handleContent = (event) => {
    // setContent(event.target.value)
    setNewUser(event.target.value);
  }

  return (
    <Dialog
      open={isChatUserDialogOpen}
      TransitionComponent={Transition}
      // keepMounted
      fullWidth
      // maxWidth={'md'}
      // onClose={() => dispatch(toggleDialogPostBox({}))}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          // const content = formJson.content;
          handleSubmit();
        }
      }}
    >
      <DialogTitle>{"Add To Chat"}</DialogTitle>
      <DialogContent >
        <TextField
          autoFocus
          required
          margin="dense"
          id="newContent"
          name="content"
          label={"New User"}
          type="content"
          value={newUsername}
          fullWidth
          // onChange={handleContentChange}
          onChange={handleContent}
        // variant="standard"
        />
        {/* <TextArea /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit' >Add User</Button>
      </DialogActions>
    </Dialog>


  )
}