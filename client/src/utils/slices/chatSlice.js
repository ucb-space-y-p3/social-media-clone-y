import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    activeChats: [],
    currentChat: {
        id: '',
        chatName: '',
        messages: [],
        recipients: [],
        draftMessage: '',
        connected: false,
    },
    newChat: {
        firstMessage: '',
        newRecipients: [],
        open: false,
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
            state.activeChatsRefresher = action.payload.activeChatsRefresher;
        },
        setCurrentChatRefresher: (state, action) => {
            state.currentChatRefresher = action.payload.currentChatRefresher;
        },
        toggleDialogChatBox: (state, action) => {
            state.newChat.open = !state.newChat.open;
        },
        populateCurrentChat: (state, action) => {
            state.currentChat.id = action.payload.id;
            state.currentChat.messages = [...action.payload.messages];
            state.currentChat.recipients = [...action.payload.recipients];
            state.currentChat.draftMessage = action.payload.draftMessage;
            state.currentChat.chatName = action.payload.chatName;
            state.currentChat.connected = true;
        },
        closeCurrentChat: (state) => {
            state.currentChat.connected = false;
        }
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
    toggleDialogChatBox,
    populateCurrentChat,
    closeCurrentChat,

} = chatSlice.actions;
export default chatSlice.reducer;