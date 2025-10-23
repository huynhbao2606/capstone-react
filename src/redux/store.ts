import { configureStore } from '@reduxjs/toolkit'
import {adminAuthReducer} from "@redux/slices/auth/adminAuthSlice.ts";
import {movieReducer} from "@redux/slices/home/movieSlice.ts";
import {cinemaReducer} from "@redux/slices/home/cinemaSlice.ts";
import {ticketReducer} from "@redux/slices/home/ticketSlice.ts";
import {userAuthReducer} from "@redux/slices/auth/userAuthSlice.ts";
import {profileReducer} from "@redux/slices/home/profileSlice.ts";
import {bookTicketReducer} from "@redux/slices/home/booksTicketSlice.ts";
import {userReducer} from "@redux/slices/auth/userSlice.ts";
import {filmsReducer} from "@redux/slices/auth/flimsSlice.ts";
import {showtimeReducer} from "@redux/slices/auth/showtimeSlice.ts";

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        cinema: cinemaReducer,
        ticket: ticketReducer,
        profile: profileReducer,
        bookTicket: bookTicketReducer,
        adminAuth: adminAuthReducer,
        showtime: showtimeReducer,
        film: filmsReducer,
        userAuth: userAuthReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch