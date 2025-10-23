import {createBaseState} from "@/types/BaseState.ts";
import type {IUser} from "@/types/IUser.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IUserParams} from "@/types/Params/IUserParams.ts";
import {userService} from "@services/auth/userService.ts";
import type {IPagination} from "@/types/IPagination.ts";
import type {AxiosError} from "axios";
import type {IRole} from "@/types/IRole.ts";
import type {Base} from "@/types/Base.ts";


interface State {
    user : Base<IPagination<IUser>>;
    role : Base<IRole[]>
}


const initialState : State = {
    user : createBaseState<IPagination<IUser>>(),
    role : createBaseState<IRole[]>()
};

export const fetchUser = createAsyncThunk(
    "fetchUser",
    async (params: IUserParams,{rejectWithValue}) => {
        try {
            const res = await userService.getPaginatedUsers(params);
            return res.data.content;
        }catch (e : any){
            return rejectWithValue(e);
        }
    }
)


export const addUser = createAsyncThunk("user/add", async (data: IUser, { rejectWithValue }) => {
    try {
        const payload = { ...data, maNhom: "GP01" };
        const res = await userService.createUser(payload);
        return res.data.content;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const updateUser = createAsyncThunk("user/update", async (data: IUser, { rejectWithValue }) => {
    try {
        const payload = { ...data, maNhom: "GP01" };
        const res = await userService.updateUser(payload);
        return res.data.content;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const deleteUser = createAsyncThunk("user/delete", async (taiKhoan: string, { rejectWithValue }) => {
    try {
        await userService.deleteUser(taiKhoan);
        return taiKhoan;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const fetchRoleUser = createAsyncThunk(
    "fetchRoleUser",
    async (__,{rejectWithValue}) => {
        try {
            const res = await userService.getRoleUser();
            return res.data.content;
        }catch (e){
            return rejectWithValue(e);
        }
    }
)

const userSlice = createSlice({
    name: "fetchUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending,(state) => {
            state.user.loading = true;
            state.user.error = null;
        })

        builder.addCase(fetchUser.fulfilled,(state, action) => {
            state.user.loading = false;
            state.user.data = action.payload;
        })

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.user.loading = false;
            state.user.error = action.payload as AxiosError;
        })

        builder.addCase(fetchRoleUser.pending,(state) => {
            state.role.loading = true;
            state.role.error = null;
        })

        builder.addCase(fetchRoleUser.fulfilled,(state, action) => {
            state.role.loading = false;
            state.role.data = action.payload;
        })

        builder.addCase(fetchRoleUser.rejected, (state, action) => {
            state.role.loading = false;
            state.role.error = action.payload as AxiosError;
        })
    }
})

export const userReducer = userSlice.reducer;