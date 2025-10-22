import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IUser} from "@/types/IUser.ts";
import {authService} from "@services/auth/authService.ts";
import {createBaseState} from "@/types/BaseState.ts";
import type {AxiosError} from "axios";
import type {IRegister} from "@/types/IRegister.ts";
import type {Base} from "@/types/Base.ts";


const timeExpire = 7 * 24 * 60 * 60 * 1000;

const userInfoString = localStorage.getItem("USER_INFO");
const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

type State = {
    login: Base<typeof userInfo>;
    register: Base<IRegister>;
    data: IUser | null;
};

const initialState: State = {
    login: createBaseState<typeof userInfo>(),
    register: createBaseState<IRegister>(),
    data : userInfo,
};


export const userLogin = createAsyncThunk(
    "user/login",
    async (user : IUser,  { rejectWithValue }) => {
        try{
            const res = await authService.login(user);
            const info = res.data.content;
            const exp = Date.now() + timeExpire

            localStorage.setItem("USER_INFO", JSON.stringify(info));
            localStorage.setItem("USER_INFO_EXP", String(exp));

            return info
        }catch (e : any) {
            return rejectWithValue(e?.response?.data?.content || "Đăng Nhập Thất Bại");
        }
    }
);

export const userRegister = createAsyncThunk(
    "user/register",
    async (user : IRegister, {rejectWithValue}) => {
        try {
            const res = await authService.register(user);

            return res.data.content;
        }catch (e: any) {
            return rejectWithValue(e?.response?.data?.content || "Đăng Ký Thất Bại");
        }
    }
);


const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        userClear(state) {
            state.login.data = null;
            state.login.loading = false;
            state.login.error = null;
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        //UserLogin
        builder.addCase(userLogin.pending, (state) => {
            state.login.loading = true;
            state.login.error = null;
        })

        builder.addCase(userLogin.fulfilled, (state,action) => {
            state.login.loading = false;
            state.login.data = action.payload;
            state.data = action.payload;
        })

        builder.addCase(userLogin.rejected, (state, action) => {
            state.login.loading = false;
            state.login.error = action.payload as AxiosError;
        })

        //UserRegister
        builder.addCase(userRegister.pending, (state) => {
            state.register.loading = true;
            state.register.error = null;
        })

        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.register.loading = false;
            state.register.data = action.payload;
        })

        builder.addCase(userRegister.rejected, (state, action) => {
            state.register.loading = false;
            state.register.error = action.payload as AxiosError;
        })
    }
})

export const userAuthReducer = userAuthSlice.reducer;

export const userLogout = () => {
    return (dispatch : any) => {
        localStorage.removeItem("USER_INFO");
        localStorage.removeItem("USER_INFO_EXP");
        dispatch(userAuthSlice.actions.userClear());
    }
}


const actionLogoutTimeOut = (exp : number) => {
    return (dispatch : any) => {
        setTimeout(() => {
            dispatch(userLogout());
        },exp)
    }
}

export const userAutoLogin = () => {
    return (dispatch : any)=> {
        const expStr = localStorage.getItem("USER_INFO_EXP");
        if(!userInfoString || !expStr) return;
        const exp = Number(expStr);

        if(Date.now() > exp) return dispatch(userLogout());

        dispatch(actionLogoutTimeOut(exp - Date.now()));
    }
}




