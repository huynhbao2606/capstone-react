import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBaseState } from "@/types/BaseState";
import type { IProfile } from "@/types/IProfile";
import { profileService } from "@services/profileService.ts";
import type { AxiosError } from "axios";

const initialState = createBaseState<IProfile>();

// Lấy thông tin user
export const fetchProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await profileService.getProfile();
            return res.data.content;
        } catch (e: any) {
            return rejectWithValue(e?.response?.data?.content || "Không thể tải hồ sơ");
        }
    }
);

// Cập nhật thông tin user
export const updateProfile = createAsyncThunk(
    "profile/update",
    async (payload: IProfile, { rejectWithValue }) => {
        try {
            const res = await profileService.updateProfile(payload);
            return res.data.content;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.content || "Cập nhật thất bại");
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //  Lấy profile
        builder.addCase(fetchProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as AxiosError;
        });

        // Cập nhật profile
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as AxiosError;
        });
    },
});

export const profileReducer = profileSlice.reducer;
