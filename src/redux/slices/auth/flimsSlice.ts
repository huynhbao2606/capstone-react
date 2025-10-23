import {createBaseState} from "@/types/BaseState.ts";
import type {IPagination} from "@/types/IPagination.ts";
import type {IFilm} from "@/types/IFilm.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {filmService} from "@services/auth/filmService.ts";


const initialState = createBaseState<IPagination<IFilm>>();


export const fetchFilms = createAsyncThunk(
    "films/fetch",
    async (params: any, { rejectWithValue }) => {
        try {
            const res = await filmService.getPaginatedFilms(params);
            return res.data.content;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const addFilm = createAsyncThunk("film/add", async (formData: FormData, { rejectWithValue }) => {
    try {
        const res = await filmService.createFilms(formData);
        return res.data.content;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.content || "Thêm phim thất bại");
    }
});

export const updateFlim = createAsyncThunk("film/update", async (formData: FormData, { rejectWithValue }) => {
    try {
        const res = await filmService.updateFilms(formData);
        return res.data.content;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.content || "Cập nhật phim thất bại");
    }
});

export const deleteFilm = createAsyncThunk("film/delete", async (maPhim: number, { rejectWithValue }) => {
    try {
        const res = await filmService.deleteFilms(maPhim);
        return res.data.content;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.content || "Xóa phim thất bại");
    }
});

const flimSlice = createSlice({
    name: "film",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilms.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchFilms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
});

export const filmsReducer = flimSlice.reducer;