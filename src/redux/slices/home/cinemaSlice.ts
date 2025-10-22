import {createBaseState} from "@/types/BaseState.ts";
import type {Base} from "@/types/Base.ts";
import type {ICumRap, IHeThongRap, ILichChieuHeThongRap, ILichChieuTheoPhim} from "@/types/ICinema.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {cinemaService} from "@services/cinemaService.ts";
import type {AxiosError} from "axios";

interface CinemaState {
    heThongRap: Base<IHeThongRap[]>;
    cumRapTheoHeThong: Base<ICumRap[]>;
    lichChieuTheoPhim: Base<ILichChieuTheoPhim>;
    lichChieuHeThongRap : Base<ILichChieuHeThongRap>;
}

const initialState: CinemaState = {
    heThongRap: createBaseState<IHeThongRap[]>(),
    cumRapTheoHeThong: createBaseState<ICumRap[]>(),
    lichChieuTheoPhim: createBaseState<ILichChieuTheoPhim>(),
    lichChieuHeThongRap: createBaseState<ILichChieuHeThongRap>()
};

export const fetchHeThongRap = createAsyncThunk<
    IHeThongRap[],
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
    ICumRap[],
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
    ILichChieuTheoPhim,
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

export const fetchLichChieuTheoHeThongRap = createAsyncThunk<
    ILichChieuHeThongRap>(
    "LichChieuHeThongRap",
    async (__, { rejectWithValue }) => {
        try {
            const res = await cinemaService.getLichChieuHeThong();
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
            state.heThongRap = createBaseState<IHeThongRap[]>();
            state.cumRapTheoHeThong = createBaseState<ICumRap[]>();
            state.lichChieuTheoPhim = createBaseState<ILichChieuTheoPhim>();
            state.lichChieuHeThongRap = createBaseState<ILichChieuHeThongRap>()
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


        // --- getLichChieuHeThongRap ---
        builder
            .addCase(fetchLichChieuTheoHeThongRap.pending, (state) => {
                state.lichChieuHeThongRap.loading = true;
                state.lichChieuHeThongRap.error = null;
            })
            .addCase(fetchLichChieuTheoHeThongRap.fulfilled, (state, action) => {
                state.lichChieuHeThongRap.loading = false;
                state.lichChieuHeThongRap.data = action.payload;
            })
            .addCase(fetchLichChieuTheoHeThongRap.rejected, (state, action) => {
                state.lichChieuHeThongRap.loading = false;
                state.lichChieuHeThongRap.error = action.payload as AxiosError;
            });
    },
});

export const cinemaReducer = cinemaSlice.reducer;
