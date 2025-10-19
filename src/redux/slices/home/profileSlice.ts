import {createBaseState} from "@/types/BaseState.ts";
import type {IProfile} from "@/types/IProfile.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {profileService} from "@services/profile.service.ts";
import type {AxiosError} from "axios";


const initialState = createBaseState<IProfile>();


export const fetchProfile = createAsyncThunk(
    "getProfile",
    async (__, {rejectWithValue}) => {
        try {
            const res = await profileService.getProfile();
            return res.data.content;
        }catch (e){
            return rejectWithValue(e);
        }
    }
)


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data  = action.payload;
        })

        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as AxiosError;
        })
    }
})


export const profileReducer = profileSlice.reducer;