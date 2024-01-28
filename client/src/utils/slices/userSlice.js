import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    username: '',
    posts: [],
    comments: [],
    friends: [],
    friendRequests: [],
    settings: {
        isDarkMode: true,

    },
    userRefresher: () => {},
};

const userSlice = createSlice({
    name: 'userState',
    initialState: INITIAL_STATE,
    reducers: {
        updateUserSettings: (state, action) => {
            state.settings = { ...state.settings, ...action.payload };
        },
        toggleThemeMode: (state) => {
            state.settings.isDarkMode = !state.settings.isDarkMode;
        },
        addPost: (state, action) => {
            state.posts = [...state.posts, action.payload.post];
        },
        populatePosts: (state, action) => {
            state.posts = [...state.posts, ...action.payload.posts];
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload.id);
        },
        addComment: (state, action) => {
            state.comments = [...state.comments, action.payload.post];
        },
        populateComments: (state, action) => {
            state.comments = [...state.comments, ...action.payload.comments];
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter((post) => post._id !== action.payload.id);
        },
        addFriend: (state, action) => {
            state.friends = [...state.friends, action.payload.friend];
        },
        populateFriends: (state, action) => {
            state.friends = [...state.friends, ...action.payload.friends];
        },
        deleteFriend: (state, action) => {
            state.friends = state.friends.filter((post) => post._id !== action.payload.id);
        },
        addFriendRequest: (state, action) => {
            state.friendRequests = [...state.friendRequests, action.payload.friendRequest];
        },
        populateFriendRequests: (state, action) => {
            state.friendRequests = [...state.friendRequests, ...action.payload.friendRequests];
        },
        deleteFriendRequest: (state, action) => {
            state.friendRequests = state.friendRequests.filter((post) => post._id !== action.payload.id);
        },
    }
})

export const {
    updateUserSettings,
    toggleThemeMode,
    addPost,
    populatePosts,
    deletePost,
    addComment,
    populateComments,
    deleteComment,
    addFriendRequest,
    populateFriendRequests,
    deleteFriendRequest,

} = userSlice.actions;
export default userSlice.reducer;