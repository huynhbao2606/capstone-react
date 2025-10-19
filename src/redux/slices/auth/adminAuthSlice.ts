import type { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@api/api.ts";
import type {IUser} from "@/types/IUser.ts";


const adminInfoString = localStorage.getItem("ADMIN_INFO");
const adminInfo = adminInfoString ? JSON.parse(adminInfoString) : null;


type AuthState = {
    data: typeof adminInfo;
    loading: boolean;
    error: AxiosError<{ content: string }> | null;
};

const initialState: AuthState = {
    data: adminInfo,
    loading: false,
    error: null,
};

const timeExpire = 7 * 24 * 60 * 60 * 1000;


export const authLogin = createAsyncThunk(
    "authLogin",
    async (user : IUser, {dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("QuanLyNguoiDung/DangNhap", user);
            const authInfo = response.data.content;

            if (
                authInfo.maLoaiNguoiDung === "KhachHang" ||
                authInfo.maLoaiNguoiDung === "khachHang"
            ) {
                return rejectWithValue({
                    response: {
                        data: {
                            content: "Bạn Không Có Quyền Truy Cập!!!",
                        },
                    },
                });
            }

            const presentTime = new Date().getTime();

            const exp = presentTime + timeExpire;


            dispatch(actionLogoutTimeOut(timeExpire))


            localStorage.setItem("ADMIN_INFO", JSON.stringify(authInfo));
            localStorage.setItem("ADMIN_INFO_EXP", exp.toString());

            console.log(authInfo)

            return authInfo;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

const adminAuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(authLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(authLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as AxiosError<any>;
        });
    },
});

export const adminAuthReducer = adminAuthSlice.reducer;
export const actionLogout = () => {
    return (dispatch: any) => {
        localStorage.removeItem("ADMIN_INFO");
        localStorage.removeItem("ADMIN_INFO_EXP");
        dispatch(adminAuthSlice.actions.clearAuth());
    }
}

const actionLogoutTimeOut = (exp : number) => {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(actionLogout());
        },exp)
    }
}

export const tryAutoLogin = () => {
    return (dispatch: any) => {
        const adminInfoString = localStorage.getItem("ADMIN_INFO");
        if(!adminInfoString) return;

        const expString = localStorage.getItem("ADMIN_INFO_EXP");
        if(!expString) return;

        const exp = Number(expString)
        const presentTime = new Date().getTime();

        if(presentTime > exp) {
            dispatch(actionLogout());
            return;
        }

        dispatch(actionLogoutTimeOut(exp - presentTime));
    }
}