import {createBaseState} from "@/types/BaseState.ts";
import type {Base} from "@/types/Base.ts";
import type {CumRap, HeThongRap, LichChieuTheoPhim} from "@/types/Cinema.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {cinemaService} from "@services/cinema.service.ts";
import type {AxiosError} from "axios";

interface CinemaState {
    heThongRap: Base<HeThongRap[]>;
    cumRapTheoHeThong: Base<CumRap[]>;
    lichChieuTheoPhim: Base<LichChieuTheoPhim>;
}

const initialState: CinemaState = {
    heThongRap: createBaseState<HeThongRap[]>(),
    cumRapTheoHeThong: createBaseState<CumRap[]>(),
    lichChieuTheoPhim: createBaseState<LichChieuTheoPhim>(),
};

export const fetchHeThongRap = createAsyncThunk<
    HeThongRap[],
    void>(
        "HeThongRap",
    async (__, { rejectWithValue}) => {
            try {
                const res = await cinemaService.getHeThongRap();
                return res.data.content;
            }catch (err) {
                return rejectWithValue;
            }
    }
)

export const fetchCumRapTheoHeThong = createAsyncThunk<
    CumRap[],
    string>(
        "CumRapTheoHeThong",
    async (maHeThongRap, { rejectWithValue }) => {
            try {
                const res = await cinemaService.getCumRapTheoHeThong(maHeThongRap);
                return res.data.content;
            } catch (err) {
                return rejectWithValue;
            }
});

export const fetchLichChieuTheoPhim = createAsyncThunk<
    LichChieuTheoPhim,
    number>(
        "LichChieuPhim",
    async (maPhim, { rejectWithValue }) => {
            try {
                const res = await cinemaService.getLichChieuPhim(maPhim);
                return res.data.content;
            } catch (err) {
                return rejectWithValue;
            }
});


const cinemaSlice = createSlice({
    name: "cinema",
    initialState,
    reducers: {
        clearCinemaState: (state) => {
            state.heThongRap = createBaseState<HeThongRap[]>();
            state.cumRapTheoHeThong = createBaseState<CumRap[]>();
            state.lichChieuTheoPhim = createBaseState<LichChieuTheoPhim>();
        },
    },
    extraReducers: (builder) => {
        // --- getHeThongRap ---
        builder
            .addCase(fetchHeThongRap.pending, (state) => {
                state.heThongRap.loading = true;
                state.heThongRap.error = null;
            })
            .addCase(fetchHeThongRap.fulfilled, (state, action) => {
                state.heThongRap.loading = false;
                state.heThongRap.data = action.payload;
            })
            .addCase(fetchHeThongRap.rejected, (state, action) => {
                state.heThongRap.loading = false;
                state.heThongRap.error = action.payload as AxiosError;
            });

        // --- getCumRapTheoHeThong ---
        builder
            .addCase(fetchCumRapTheoHeThong.pending, (state) => {
                state.cumRapTheoHeThong.loading = true;
                state.cumRapTheoHeThong.error = null;
            })
            .addCase(fetchCumRapTheoHeThong.fulfilled, (state, action) => {
                state.cumRapTheoHeThong.loading = false;
                state.cumRapTheoHeThong.data = action.payload;
            })
            .addCase(fetchCumRapTheoHeThong.rejected, (state, action) => {
                state.cumRapTheoHeThong.loading = false;
                state.cumRapTheoHeThong.error = action.payload as AxiosError;
            });

        // --- getLichChieuPhim ---
        builder
            .addCase(fetchLichChieuTheoPhim.pending, (state) => {
                state.lichChieuTheoPhim.loading = true;
                state.lichChieuTheoPhim.error = null;
            })
            .addCase(fetchLichChieuTheoPhim.fulfilled, (state, action) => {
                state.lichChieuTheoPhim.loading = false;
                state.lichChieuTheoPhim.data = action.payload;
            })
            .addCase(fetchLichChieuTheoPhim.rejected, (state, action) => {
                state.lichChieuTheoPhim.loading = false;
                state.lichChieuTheoPhim.error = action.payload as AxiosError;
            });
    },
});

export const { clearCinemaState } = cinemaSlice.actions;
export const cinemaReducer = cinemaSlice.reducer;
