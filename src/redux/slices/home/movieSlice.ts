import type {IMovie} from "@/types/IMovie.ts";
import type {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createBaseState} from "@/types/BaseState.ts";
import {movieService} from "@services/movieService.ts";
import type {IPagination} from "@/types/IPagination.ts";
import type {IMovieParams} from "@/types/Params/IMovieParams.ts";


const initialState = createBaseState<IPagination<IMovie>>();

export const fetchMovies = createAsyncThunk(
    "fetchMovies",
    async (params : IMovieParams, { rejectWithValue }) => {
        try {
            const response = await movieService.getPaginatedMovie(params);
            return response.data.content;
        }catch (error) {
            return rejectWithValue(error);
        }
    }
);

const movieSlice = createSlice({
    name : "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
        })

        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as AxiosError
        })
    }
});

export const movieReducer = movieSlice.reducer;

