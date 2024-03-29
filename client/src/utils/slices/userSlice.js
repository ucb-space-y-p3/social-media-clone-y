import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    userId: '',
    username: '',
    firstInitial: '',
    lastInitial: '',
    email: '',
    posts: [],
    comments: [],
    friends: [],
    friendRequests: [],
    settings: {
        isDarkMode: true,

    },
    profile: {
        userId: '',
        username: '',
        firstInitial: '',
        lastInitial: '',
        friendCount: '',
        postCount: '',
    }
};

const userSlice = createSlice({
    name: 'userState',
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action) => {
            // console.log(action);
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.firstInitial = action.payload.firstInitial;
            state.lastInitial = action.payload.lastInitial;
            state.email = action.payload.email;
            state.posts = action.payload.posts;
            state.comments = action.payload.comments;
            state.friends = action.payload.friends;
            state.friendRequests = action.payload.friendRequests;
        },
        setProfile: (state, action) => {
            state.profile.userId = action.payload.userId;
            state.profile.username = action.payload.username;
            state.profile.firstInitial = action.payload.firstInitial;
            state.profile.lastInitial = action.payload.lastInitial;
            state.profile.friendCount = action.payload.friendCount;
            state.profile.postCount = action.payload.postCount;
            // state.profile.email = action.payload.email;
        },
        updateUser: (state, action) => {
            state.username = action.payload.username;
            state.firstInitial = action.payload.firstInitial;
            state.lastInitial = action.payload.lastInitial;
            state.email = action.payload.email;
        },
        updateUserSettings: (state, action) => {
            state.settings = { ...state.settings, ...action.payload.settings };
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
    setUser,
    setProfile,
    updateUser,
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
    setUserRefresher,

} = userSlice.actions;
export default userSlice.reducer;