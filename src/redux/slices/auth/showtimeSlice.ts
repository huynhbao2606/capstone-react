import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBaseState } from "@/types/BaseState";
import {showtimeService} from "@services/auth/showtimeService.ts";

const initialState = createBaseState<any>();

export const createShowtime = createAsyncThunk(
    "showtime/create",
    async (payload: any, { rejectWithValue }) => {
        try {
            const res = await showtimeService.createShowtime(payload);
            return res.data.content;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.content || "Tạo lịch chiếu thất bại");
        }
    }
);

const showtimeSlice = createSlice({
    name: "showtime",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createShowtime.pending, (state) => {
                state.loading = true;
            })
            .addCase(createShowtime.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(createShowtime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
});

export const showtimeReducer = showtimeSlice.reducer;
