import { forwardRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDialogPostBox, updateNewPost, } from '../../utils/slices/feedSlice';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

import TextArea from '../TextArea';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewPostDialog({ }) {

  const isNewPostDialogOpen = useSelector((state) => state.feedState.newPost.open);
  const newPostContent = useSelector((state) => state.feedState.newPost.content);

  const dispatch = useDispatch();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    dispatch(toggleDialogPostBox({}))
  };

  const [content, setContent] = useState('');

  const handleSubmit = () => {
    console.log('pushing new post');
    dispatch(updateNewPost({ content: '' }));
    dispatch(toggleDialogPostBox({}));
  };

  const handleContent = (event) => {
    // setContent(event.target.value)
    dispatch(updateNewPost({ content: event.target.value }));
  }


  // const closePostModal = () => {
  //   // other logic here
  //   dispatch(toggleDialogPostBox({}))
  // }

  // const pushNewPost = () => {
  //   console.log('pushing new post');
  //   dispatch(updateNewPost({ content: '' }));
  //   dispatch(toggleDialogPostBox({}));
  // }

  // const handleContentChange = (event) => {
  //   console.log(event.target.value);
  //   dispatch(updateNewPost({ content: event.target.value }));
  // }

  return (
    <Dialog
      open={isNewPostDialogOpen}
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
          const content = formJson.content;
          console.log(content);
          // pushNewPost();
          handleSubmit();
        }
      }}
    >
      <DialogTitle>{"Create A New Post"}</DialogTitle>
      <DialogContent >
        {/* <DialogContentText id="alert-dialog-slide-description">
          New Post
        </DialogContentText> */}
        <TextField
          autoFocus
          required
          margin="dense"
          id="newContent"
          name="content"
          label={"Text Here"}
          type="content"
          value={newPostContent}
          fullWidth
          multiline
          rows={4}
          // onChange={handleContentChange}
          onChange={handleContent}
        // variant="standard"
        />
        {/* <TextArea /> */}
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={closePostModal}>Cancel</Button> */}
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit' >Post</Button>
      </DialogActions>
    </Dialog>
  )
}