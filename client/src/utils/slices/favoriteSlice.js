import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    likedPosts: [],
    likedComments: [],
};

const favoriteSlice = createSlice({
    name: 'favoriteState',
    initialState: INITIAL_STATE,
    reducers: {
        addLikedPost: (state, action) => {
            state.likedPosts = [...state.likedPosts, action.payload];
        },
        addLikedComment: (state, action) => {
            state.likedComments = [...state.likedComments, action.payload];
        },
        removeLikedPost: (state, action) => {
            state.likedPosts = state.likedPosts.filter((post) => post._id !== action.payload.id);
        },
        removeLikedComment: (state, action) => {
            state.likedComments = state.likedComments.filter((comment) => comment._id !== action.payload.id);
        },
    }
})

export const {
    addLikedPost,
    addLikedComment,
    removeLikedPost,
    removeLikedComment,

} = favoriteSlice.actions;
export default favoriteSlice.reducer;