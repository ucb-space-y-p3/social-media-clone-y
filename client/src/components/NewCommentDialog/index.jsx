import { forwardRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDialogCommentBox, addComment } from '../../utils/slices/feedSlice';
import { CREATE_COMMENT } from '../../utils/mutations';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewCommentDialog({ }) {

  const [commentContent, setCommentContent] = useState('');

  const [createComment] = useMutation(CREATE_COMMENT);

  const dispatch = useDispatch();

  const isNewCommentDialogOpen = useSelector((state) => state.feedState.newComment.open);
  const currentPostId = useSelector((state) => state.feedState.currentPostId);

  const handleClose = () => {
    setCommentContent('');
    dispatch(toggleDialogCommentBox({}));
  };

  const handleSubmit = async () => {
    console.log('pushing new comment');
    dispatch(toggleDialogCommentBox({}));
    try {
      console.log('new comment content:', commentContent);
      // we also need the current post id!!
      const comment = await createComment({
        variables: { postId: currentPostId, content: commentContent },
      });
      console.log('newly created comment from backend', comment);
      setCommentContent('');
      dispatch(addComment({ comment: comment.data.createComment }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleContent = (event) => {
    // setContent(event.target.value)
    setCommentContent(event.target.value);
  }

  return (
    <Dialog
      open={isNewCommentDialogOpen}
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
      <DialogTitle>{"Create A New Comment"}</DialogTitle>
      <DialogContent >
        {/* <DialogContentText id="alert-dialog-slide-description">
    New Post
  </DialogContentText> */}
        <TextField
          focused
          autoFocus
          required
          margin="dense"
          id="newContent"
          name="content"
          label={"Text Here"}
          type="content"
          // value={newPostContent}
          fullWidth
          // onChange={handleContentChange}
          onChange={handleContent}
        // variant="standard"
        />
        {/* <TextArea /> */}
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={closePostModal}>Cancel</Button> */}
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit' >Comment</Button>
      </DialogActions>
    </Dialog>


  )
}