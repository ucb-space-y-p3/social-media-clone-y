import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    newNotifications: [],
    allNotifications: [],
};

const notificationSlice = createSlice({
    name: 'notificationState',
    initialState: INITIAL_STATE,
    reducers: {
        addNotification: (state, action) => {
            state.newNotifications = [...state.newNotifications, action.payload];
            state.allNotifications = [...state.allNotifications, action.payload];
        },
        clearNotification: (state, action) => {
            state.newNotifications = state.newNotifications.filter((notification) => notification._id !== action.payload.id);
        },
        deleteNotification: (state, action) => {
            state.newNotifications = state.newNotifications.filter((notification) => notification._id !== action.payload.id);
            state.allNotifications = state.allNotifications.filter((notification) => notification._id !== action.payload.id);
        },
    }
})

export const {
    addNotification,
    clearNotification,
    deleteNotification,    

} = notificationSlice.actions;
export default notificationSlice.reducer;