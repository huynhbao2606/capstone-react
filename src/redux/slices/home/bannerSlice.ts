import {createBaseState} from "@/types/BaseState.ts";
import type {Banner} from "@/types/Banner.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService} from "@services/movie.service.ts";
import type {AxiosError} from "axios";
import {fetchMovies} from "@redux/slices/home/movieSlice.ts";

const initialState = createBaseState<Banner[]>();

export const fetchBanners = createAsyncThunk(
    "fecthBanner",
    async (__, {rejectWithValue}) => {
        try {
            const res = await movieService.getBanner();
            return res.data.content;
        }catch (error){
            return rejectWithValue(error);
        }
    }
)

const bannerSlice = createSlice({
    name: "banners",
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
})

export const bannerReducer = bannerSlice.reducer;