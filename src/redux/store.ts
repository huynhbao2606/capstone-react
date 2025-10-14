import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "@/redux/slices/auth/slice.tsx";
import {movieReducer} from "@redux/slices/home/movieSlice.ts";

export const store = configureStore({
    reducer: {
        movieReducer,
        authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch