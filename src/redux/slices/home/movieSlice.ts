import type {IMovie} from "@/types/IMovie.ts";
import type {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createBaseState} from "@/types/BaseState.ts";
import {movieService} from "@services/movie.service.ts";


const initialState = createBaseState<IMovie[]>();

export const fetchMovies = createAsyncThunk(
    "fetchMovies",
    async (__, { rejectWithValue }) => {
        try {
            const response = await movieService.getMovies();
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

