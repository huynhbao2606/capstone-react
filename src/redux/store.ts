import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "@/redux/slices/auth/slice.tsx";
import {movieReducer} from "@redux/slices/home/movieSlice.ts";
import {cinemaReducer} from "@redux/slices/home/cinemaSlice.ts";

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        cinema: cinemaReducer,
        auth: authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch