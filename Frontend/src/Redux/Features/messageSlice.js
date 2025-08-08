import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { statusCodes } from "../../Utils/statusCodes";
import { fetchMyChats } from "../../Services/messageService";
const initialState = {
    chats: null,
    loading: false,
    error: null,
    groupedChat: null
}

export const fetchMessage = createAsyncThunk('message/fetchMessage', async (_, { rejectWithValue }) => {
    try {
        const res = await fetchMyChats();
        if (res.status === statusCodes.OK) {

            return res.data.chats;
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        groupMessage: (state, action) => {
            const map = new Map();

            for (const msg of state.chats || []) {
                const id = msg.wa_id;

                if (!map.has(id)) {
                    map.set(id, {
                        name: msg.name || "Unknown",
                        wa_id: id,
                        message: []
                    });
                }

                map.get(id).message.push(msg);
            }

            state.groupedChat = Array.from(map.values());
        }


    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload || null;
            })
            .addCase(fetchMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.chats = null;
            })
    }
})

export const { groupMessage } = messageSlice.actions;
export default messageSlice.reducer;