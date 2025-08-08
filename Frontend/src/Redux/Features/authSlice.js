import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { checkUserAuth } from '../../Services/authServices';
import { statusCodes } from '../../Utils/statusCodes';


const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
}

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const res = await checkUserAuth();
        if (res.status === statusCodes.OK) {
            return res.user
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkAuth.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload || null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            });
    }
})

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;