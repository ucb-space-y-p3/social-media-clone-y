import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  posts: [],
  friends: [],
  friendRequests: [],
  activeChats: [],
  notifications: [],
  settings: {}
};

const userSlice = createSlice({
    name: 'userState',
    initialState: INITIAL_STATE,
    reducers: {
        updateUserSettgings: (state, action) => {
            state.settings = {...action.payload};
        },
    }
})

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;