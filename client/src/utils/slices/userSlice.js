import { createSlice } from "@reduxjs/toolkit";
import useMediaQuery from '@mui/material/useMediaQuery';

// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


const INITIAL_STATE = {
  posts: [],
  friends: [],
  friendRequests: [],
  activeChats: [],
  notifications: [],
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
        }
    }
})

export const {
    updateUserSettings,
    toggleThemeMode,

} = userSlice.actions;
export default userSlice.reducer;