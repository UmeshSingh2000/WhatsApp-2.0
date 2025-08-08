import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/authSlice.js'
import messageReducer from './Features/messageSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer
    },
})