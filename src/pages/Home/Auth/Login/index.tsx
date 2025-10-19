import {useState } from "react";
import {Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import * as React from "react";
import {userLogin} from "@redux/slices/auth/userAuthSlice.ts";
import type {RootState} from "@redux/store.ts";

export default function Login() {
    const [showPw, setShowPw] = useState(false);
    const [form, setForm] = useState({ taiKhoan: "", matKhau: "" });
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector((s: RootState) => s.userAuth.data);


    if(isLogin){
        return <Navigate to={"/"}></Navigate>
    }


    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(userLogin(form));
    };

    return (
        <div className="min-h-[80vh] grid place-items-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-slate-900/60 backdrop-blur border border-white/10 p-6 shadow-xl">
                <h1 className="text-2xl font-bold mb-2">Đăng nhập</h1>
                <p className="text-sm text-white/60 mb-6">Vào để đặt vé nhanh hơn.</p>


                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Tài khoản</label>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 outline-none focus:border-sky-400"
                            value={form.taiKhoan}
                            onChange={e=>setForm(p=>({...p, taiKhoan:e.target.value}))}
                            placeholder="username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Mật khẩu</label>
                        <div className="relative">
                            <input
                                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 pr-10 outline-none focus:border-sky-400"
                                type={showPw ? "text" : "password"}
                                value={form.matKhau}
                                onChange={e=>setForm(p=>({...p, matKhau:e.target.value}))}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={()=>setShowPw(s=>!s)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/60 hover:text-white"
                            >
                                {showPw ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"

                        className="w-full rounded-lg bg-sky-600 hover:bg-sky-700 disabled:opacity-60 px-4 py-2 font-medium"
                    >
                        Đăng nhập
                    </button>
                </form>

                <p className="mt-4 text-sm text-white/70">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-sky-400 hover:underline">Đăng ký</Link>
                </p>
            </div>
        </div>
    );
}
