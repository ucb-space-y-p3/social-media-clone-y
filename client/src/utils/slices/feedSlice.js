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
    publicPostsRefresher: () => {},
    circlePostsRefresher: () => {},
};

const feedSlice = createSlice({
    name: 'feedState',
    initialState: INITIAL_STATE,
    reducers: {
        addPublicPost: (state, action) => {
            state.publicPosts = [...state.publicPosts, action.payload];
        },
        addCirclePost: (state, action) => {
            state.circlePosts = [...state.circlePosts, action.payload];
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
        setPublicRefresher: (state, action) => {
            state.publicPostsRefresher = action.payload.publicRefresher;
        },
        setCircleRefresher: (state, action) => {
            state.circlePostsRefresher = action.payload.circleRefresher;
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
    }
})

export const {
    addPublicPost,
    addCirclePost,
    removePublicPost,
    removeCircleComment,
    updateNewPost,
    updateNewComment,
    setPublicRefresher,
    setCircleRefresher,
    toggleDialogPostBox,
    openDialogCommentBox,
    closeDialogCommentBox,
    
} = feedSlice.actions;
export default feedSlice.reducer;