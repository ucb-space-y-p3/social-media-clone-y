import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    activeChats: [],
    currentChat: {
        messages: [],
        recipients: [],
        draftMessage: ''
    },
    newChat: {
        firstMessage: '',
        newRecipients: []
    },
    activeChatsRefresher: () => {},
    currentChatRefresher: () => {},
};

const chatSlice = createSlice({
    name: 'chatState',
    initialState: INITIAL_STATE,
    reducers: {
        addChat: (state, action) => {
            state.activeChats = [...state.activeChats, action.payload.newChat];
        },
        populateChats: (state, action) => {
            state.activeChats = [...state.activeChats, ...action.payload.chats];
        },
        deleteChat: (state, action) => {
            state.activeChats = state.activeChats.filter((chat) => chat._id !== action.payload.id);
        },
        addMessage: (state, action) => {
            state.currentChat.messages = [...state.currentChat.messages, action.payload.message]
        },
        populateMessages: (state, action) => {
            state.currentChat.messages = [...state.currentChat.messages, ...action.payload.message]
        },
        deleteMessages: (state, action) => {
            state.currentChat.messages = state.currentChat.messages.filter((message) => message._id !== action.payload.id);
        },
        setActiveChatsRefresher: (state, action) => {
            state.userRefresher = action.payload.activeChatsRefresher;
        },
        setCurrentChatRefresher: (state, action) => {
            state.userRefresher = action.payload.currentChatRefresher;
        },
    }
})

export const {
    addChat,
    populateChats,
    deleteChat,
    addMessage,
    populateMessages,
    deleteMessages,
    setActiveChatsRefresher,
    setCurrentChatRefresher,

} = chatSlice.actions;
export default chatSlice.reducer;