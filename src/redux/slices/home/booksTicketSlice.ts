import {createBaseState} from "@/types/BaseState.ts";
import type {IBookTickets} from "@/types/IBookTickets.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ticketService} from "@services/ticket.service.ts";
import type {AxiosError} from "axios";


const initialState = createBaseState<IBookTickets>()


export const bookTicket = createAsyncThunk(
    "bookTicket",
    async (bookTicket : IBookTickets, {rejectWithValue}) => {
        try{
            const res = await ticketService.postDatVe(bookTicket);
            return res.data.content;
        }catch (e){
            return rejectWithValue(e);
        }
    }
)


const bookTicketSlice = createSlice({
    name: "bookTicket",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(bookTicket.pending,(state) => {
            state.loading = true;
        });

        builder.addCase(bookTicket.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })

        builder.addCase(bookTicket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as AxiosError;
        })
    }
})


export const bookTicketReducer = bookTicketSlice.reducer;