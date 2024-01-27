import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    publicPosts: [],
    circlePosts: [],
    newPost: {
        content: '',
    }
};

const feedSlice = createSlice({
    name: 'feedState',
    initialState: INITIAL_STATE,
    reducers: {
        
    }
})

export const {
    

} = feedSlice.actions;
export default feedSlice.reducer;