import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    likedPosts: [],
    likedComments: []
};

const favoriteSlice = createSlice({
    name: 'favoriteState',
    initialState: INITIAL_STATE,
    reducers: {
        
    }
})

export const {
    

} = favoriteSlice.actions;
export default favoriteSlice.reducer;