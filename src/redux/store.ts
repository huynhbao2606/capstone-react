import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "@/redux/slices/auth/slice.tsx";
import {movieReducer} from "@redux/slices/home/movieSlice.ts";
import {cinemaReducer} from "@redux/slices/home/cinemaSlice.ts";
import {bannerReducer} from "@redux/slices/home/bannerSlice.ts";
import {ticketReducer} from "@redux/slices/home/ticketSlice.ts";

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        cinema: cinemaReducer,
        banner: bannerReducer,
        ticket: ticketReducer,
        auth: authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch