import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    publicPosts: [],
    circlePosts: [],
    currentComments: [],
    currentPostId: '',
    newPost: {
        content: '',
        open: false,
    },
    newComment: {
        open: false,
    },
    currentFeed: 'public',
};

const feedSlice = createSlice({
    name: 'feedState',
    initialState: INITIAL_STATE,
    reducers: {
        addPublicPost: (state, action) => {
            state.publicPosts = [action.payload, ...state.publicPosts];
        },
        populatePublicPosts: (state, action) => {
            // state.publicPosts = [...state.publicPosts, ...action.payload.posts];
            state.publicPosts = [...action.payload.posts];
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
        toggleDialogCommentBox: (state) => {
            state.newComment.open = !state.newComment.open;
        },
        setFeed: (state, action) => {
            state.currentFeed = action.payload.feed;
        },
        setCurrentComments: (state, action) => {
            state.currentComments = action.payload.currentComments;
        },
        removeComment: (state, action) => {
            state.currentComments = state.currentComments.filter((comment) => comment._id !== action.payload.id);
        },
        addComment: (state, action) => {
            state.currentComments = [...state.currentComments, action.payload.comment];
        },
        setCurrentPostId: (state, action) => {
            state.currentPostId = action.payload.currentPostId;
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
    toggleDialogCommentBox,
    setFeed,
    setCurrentComments,
    removeComment,
    addComment,
    setCurrentPostId,

} = feedSlice.actions;
export default feedSlice.reducer;