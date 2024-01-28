import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    publicPosts: [],
    circlePosts: [],
    newPost: {
        content: '',
        open: false,
    },
    newComment: {
        content: '',
        open: false,
    },
    currentFeed: 'public',
};

const feedSlice = createSlice({
    name: 'feedState',
    initialState: INITIAL_STATE,
    reducers: {
        addPublicPost: (state, action) => {
            state.publicPosts = [...state.publicPosts, action.payload];
        },
        populatePublicPosts: (state, action) => {
            state.publicPosts = [...state.publicPosts, ...action.payload.posts];
        },
        addCirclePost: (state, action) => {
            state.circlePosts = [...state.circlePosts, action.payload];
        },
        populateCirclePosts: (state, action) => {
            state.circlePosts = [...state.circlePosts, ...action.payload.posts];
        },
        removePublicPost: (state, action) => {
            state.publicPosts = state.publicPosts.filter((post) => post._id !== action.payload.id);
        },
        removeCircleComment: (state, action) => {
            state.circlePosts = state.circlePosts.filter((comment) => comment._id !== action.payload.id);
        },
        updateNewPost: (state, action) => {
            state.newPost.content = action.payload.content;
        },
        updateNewComment: (state, action) => {
            state.newComment.content = action.payload.content;
        },
        toggleDialogPostBox: (state) => {
            state.newPost.open = !state.newPost.open;
        },
        openDialogCommentBox: (state) => {
            state.newComment.open = true;
        },
        closeDialogCommentBox: (state) => {
            state.newComment.open = true;
            state.newPost.content = '';
        },
        setFeed: (state, action) => {
            state.currentFeed = action.payload.feed;
        },
    }
})

export const {
    addPublicPost,
    addCirclePost,
    populatePublicPosts,
    populateCirclePosts,
    removePublicPost,
    removeCircleComment,
    updateNewPost,
    updateNewComment,
    toggleDialogPostBox,
    openDialogCommentBox,
    closeDialogCommentBox,
    setFeed,

} = feedSlice.actions;
export default feedSlice.reducer;