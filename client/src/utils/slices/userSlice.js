import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  posts: [],
  comments: [],
  friends: [],
  settings: {
    mode: 'dark',

  }
};

const userSlice = createSlice({
    name: 'userState',
    initialState: INITIAL_STATE,
    reducers: {
        updateUserSettings: (state, action) => {
            state.settings = {...action.payload};
        },
        toggleThemeMode: (state) => {
            if(state.settings.mode === 'light') {
                state.settings.mode = 'dark';
            } else {
                state.settings.mode = 'light';
            }
        },
        addPost: (state, action) => {
            state.posts = [...state.posts, action.payload.post];
        },
        addPosts: (state, action) => {
            state.posts = [...state.posts, ...action.payload.posts];
        }
    }
})

export const {
    updateUserSettings,
    toggleThemeMode,

} = userSlice.actions;
export default userSlice.reducer;