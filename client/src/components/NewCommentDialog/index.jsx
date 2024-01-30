import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openDialogCommentBox, closeDialogCommentBox } from '../../utils/slices/feedSlice';

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

export default function NewCommentDialog({ }) {
  
  const isNewCommentDialogOpen = useSelector((state) => state.feedState.newComment.open);
  
  const dispatch = useDispatch();


  return (
    <Dialog
      open={isNewCommentDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => dispatch(closeDialogCommentBox({}))}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          New Comment
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={() => dispatch(closeDialogCommentBox({}))}>Disagree</Button> */}
        <Button onClick={() => dispatch(closeDialogCommentBox({}))}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}