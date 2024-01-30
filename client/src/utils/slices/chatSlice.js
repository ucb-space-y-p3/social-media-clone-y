import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    activeChats: [],
    currentChat: {
        id: '',
        chatName: '',
        messages: [],
        recipients: [],
        newRecipients: [],
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
            state.activeChats = [...action.payload.chats];
        },
        deleteChat: (state, action) => {
            state.activeChats = state.activeChats.filter((chat) => chat._id !== action.payload.id);
        },
        addMessage: (state, action) => {
            state.currentChat.messages = [action.payload.message, ...state.currentChat.messages]
        },
        populateMessages: (state, action) => {
            state.currentChat.messages = [...action.payload.messages]
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
            state.currentChat.newRecipients = [];
            state.currentChat.draftMessage = '';
            state.currentChat.chatName = action.payload.chatName;
            state.currentChat.connected = true;
        },
        closeCurrentChat: (state) => {
            state.currentChat.connected = false;
        },
        setCurrentRecipients: (state, action) => {
            state.currentChat.recipients = action.payload.recipients;
        },
        setDraftMessage: (state, action) => {
            state.currentChat.draftMessage = action.payload.draftMessage;
        },
        setFirstMessage: (state, action) => {
            state.newChat.firstMessage = action.payload.firstMessage;
        },
        addNewRecipient: (state, action) => {
            state.newChat.recipients = [...state.newChat.recipients, action.payload.user];
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
    setCurrentRecipients,
    setDraftMessage,
    setFirstMessage,
    addNewRecipient,
    removeNewRecipient,
    resetNewChat,

} = chatSlice.actions;
export default chatSlice.reducer;