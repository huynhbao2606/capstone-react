import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store.ts";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { authLogin } from "@redux/slices/auth/adminAuthSlice.ts";
import * as React from "react";

export default function Auth() {
    const { error, data, loading } = useSelector((state: RootState) => state.adminAuth);
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<{taiKhoan : string,matKhau : string }>({ taiKhoan: "", matKhau: "" });

    if (data) {
        return <Navigate to="/admin" replace />;
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(authLogin(user));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 text-white">
                {/* Logo / Title */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-2xl font-bold shadow-md">
                        C
                    </div>
                    <h1 className="mt-3 text-2xl font-bold tracking-wide">Đăng nhập Admin</h1>
                    <p className="text-white/60 text-sm mt-1">Quản lý hệ thống - Capstone Cybersoft</p>
                </div>

                {/* Form */}
                {error && (
                    <div className="p-3 mb-5 text-sm text-red-400 border border-red-500/30 bg-red-500/10 rounded-lg">
                        {typeof error === "string"
                            ? error
                            : (error as any)?.response?.data?.content || "Đã xảy ra lỗi, vui lòng thử lại."}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm text-white/80 font-medium">Tài khoản</label>
                        <input
                            onChange={handleOnChange}
                            name="taiKhoan"
                            value={user.taiKhoan}
                            type="text"
                            placeholder="Nhập tài khoản..."
                            autoComplete="username"
                            className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/10 text-white placeholder-white/40
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm text-white/80 font-medium">Mật khẩu</label>
                        <input
                            onChange={handleOnChange}
                            name="matKhau"
                            value={user.matKhau}
                            type="password"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/10 text-white placeholder-white/40
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500
                       hover:from-orange-600 hover:to-pink-600 shadow-lg shadow-orange-500/20
                       focus:ring-4 focus:ring-orange-400/50 focus:outline-none transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex justify-center items-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                <span>Đang đăng nhập...</span>
                            </div>
                        ) : (
                            "Đăng nhập"
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-8 text-center text-xs text-white/50">
                    © 2025 Capstone Cybersoft. All rights reserved.
                </p>
            </div>
        </div>
    );
}
