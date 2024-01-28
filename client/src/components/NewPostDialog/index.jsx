import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDialogPostBox, } from '../../utils/slices/feedSlice';

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

export default function NewPostDialog({ }) {
  
  const isNewPostDialogOpen = useSelector((state) => state.feedState.newPost.open);
  
  const dispatch = useDispatch();


  return (
    <Dialog
      open={isNewPostDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => dispatch(toggleDialogPostBox({}))}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          New Post
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={() => dispatch(toggleDialogPostBox({}))}>Disagree</Button> */}
        <Button onClick={() => dispatch(toggleDialogPostBox({}))}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}