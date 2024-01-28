import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    publicPosts: [],
    circlePosts: [],
    newPost: {
        content: '',
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
            state.newPost = action.payload;
        }
    }
})

export const {
    addPublicPost,
    addCirclePost,
    removePublicPost,
    removeCircleComment

} = feedSlice.actions;
export default feedSlice.reducer;