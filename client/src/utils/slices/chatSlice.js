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
        deleteMessage: (state, action) => {
            state.currentChat.messages = state.currentChat.messages.filter((message) => message._id !== action.payload.id);
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
        },
        setFirstMessage: (state, action) => {
            state.newChat.firstMessage = action.payload.firstMessage;
        },
        addNewRecipient: (state, action) => {
            state.newChat.recipients = [ ...state.newChat.recipients, action.payload.user ];
        },
        removeNewRecipient: (state, action) => {
            state.newChat.recipients = state.newChat.recipients.filter((user) => user.username !== action.payload.username);
        },
        resetNewChat: (state) => {
            state.newChat.firstMessage = '';
            state.newChat.recipients = [];
            state.newChat.open = false;
        }
    }
})

export const {
    addChat,
    populateChats,
    deleteChat,
    addMessage,
    populateMessages,
    deleteMessage,
    toggleDialogChatBox,
    populateCurrentChat,
    closeCurrentChat,
    addNewRecipient,
    removeNewRecipient,

} = chatSlice.actions;
export default chatSlice.reducer;