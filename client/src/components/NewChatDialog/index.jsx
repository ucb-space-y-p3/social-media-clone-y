import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDialogChatBox, } from '../../utils/slices/chatSlice';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewChatDialog({ }) {
  
  const isNewChatDialogOpen = useSelector((state) => state.chatState.newChat.open);
  
  const dispatch = useDispatch();


  return (
    <Dialog
      open={isNewChatDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => dispatch(toggleDialogChatBox({}))}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          New Chatroom
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(toggleDialogChatBox({}))}>Disagree</Button>
        <Button onClick={() => dispatch(toggleDialogChatBox({}))}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}