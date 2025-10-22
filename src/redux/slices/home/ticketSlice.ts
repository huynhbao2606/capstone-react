import {createBaseState} from "@/types/BaseState.ts";
import type {IRoomTicket} from "@/types/IRoomTicket.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ticketService} from "@services/ticketService.ts";
import type {AxiosError} from "axios";
import type {ISeat} from "@/types/ISeat.ts";


type BoxOffice = {
    thongTinPhim : IRoomTicket,
    danhSachGhe: ISeat[],
}

const initialState = createBaseState<BoxOffice>();

export const fetchRoomTicket = createAsyncThunk(
    "fetchRoomTicket",
    async (maLichChieu: number, {rejectWithValue}) => {
        try {
            const res = await ticketService.getDanhSachPhongVe(maLichChieu);
            return res.data.content;
        }catch (error) {
            return rejectWithValue(error);
        }
    }
)


const ticketSlice = createSlice({
    name : "tickets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRoomTicket.pending,(state) => {
            state.loading = true;
        });

        builder.addCase(fetchRoomTicket.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })

        builder.addCase(fetchRoomTicket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as AxiosError;
        })
    }
})

export const ticketReducer = ticketSlice.reducer;





