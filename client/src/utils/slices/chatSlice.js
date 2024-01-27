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
    }
};

const chatSlice = createSlice({
    name: 'chatState',
    initialState: INITIAL_STATE,
    reducers: {
        
    }
})

export const {
    

} = chatSlice.actions;
export default chatSlice.reducer;