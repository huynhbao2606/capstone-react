import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import * as React from "react";
import {userRegister} from "@redux/slices/auth/userAuthSlice.ts";

export default function Register() {
    const [showPw, setShowPw] = useState(false);
    const [form, setForm] = useState({
        taiKhoan: "", matKhau: "", email: "", soDt: "", hoTen: ""
    });
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(s => s.userAuth.register);
    const nav = useNavigate();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(userRegister(form))
            .unwrap()
            .then(() => nav("/login"))
            .catch(() => {});
    };

    const ipClass = "w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 outline-none focus:border-sky-400";

    return (
        <div className="min-h-[80vh] grid place-items-center px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-slate-900/60 backdrop-blur border border-white/10 p-6 shadow-xl">
                <h1 className="text-2xl font-bold mb-2">Đăng ký</h1>
                <p className="text-sm text-white/60 mb-6">Tạo tài khoản để đặt vé.</p>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm">
                        {String(error)}
                    </div>
                )}

                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1">Tài khoản</label>
                        <input className={ipClass}
                               value={form.taiKhoan}
                               onChange={e=>setForm(p=>({...p, taiKhoan:e.target.value}))}
                               placeholder="username" required />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Mật khẩu</label>
                        <div className="relative">
                            <input className={`${ipClass} pr-10`}
                                   type={showPw ? "text" : "password"}
                                   value={form.matKhau}
                                   onChange={e=>setForm(p=>({...p, matKhau:e.target.value}))}
                                   placeholder="••••••••" required />
                            <button type="button" onClick={()=>setShowPw(s=>!s)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/60 hover:text-white">
                                {showPw ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input className={ipClass} type="email"
                               value={form.email}
                               onChange={e=>setForm(p=>({...p, email:e.target.value}))}
                               placeholder="you@example.com" required />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Số điện thoại</label>
                        <input className={ipClass}
                               type="number"
                               value={form.soDt}
                               onChange={e=>setForm(p=>({...p, soDt:e.target.value}))}
                               placeholder="0xxx..." required />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1">Họ tên</label>
                        <input className={ipClass}
                               value={form.hoTen}
                               onChange={e=>setForm(p=>({...p, hoTen:e.target.value}))}
                               placeholder="Nguyễn Văn A" required />
                    </div>

                    <div className="md:col-span-2">
                        <button type="submit" disabled={loading}
                                className="w-full rounded-lg bg-sky-600 hover:bg-sky-700 disabled:opacity-60 px-4 py-2 font-medium">
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-sm text-white/70">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-sky-400 hover:underline">Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}
