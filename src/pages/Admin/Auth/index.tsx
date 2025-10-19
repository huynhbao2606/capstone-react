import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store.ts";
import { useState } from "react";
import type { IUser } from "@/types/IUser.ts";
import { Navigate } from "react-router-dom";
import { authLogin } from "@redux/slices/auth/adminAuthSlice.ts";
import * as React from "react";

export default function Auth() {
    const error = useSelector((state: RootState) => state.adminAuth.error);
    const data = useSelector((state: RootState) => state.adminAuth.data);
    const loading = useSelector((state: RootState) => state.adminAuth.loading);

    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<IUser>({ taiKhoan: "", matKhau: "" });

    if (data) {
        return <Navigate to="/admin/dashboard" />;
    }

    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { value, name} = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(authLogin(user));
    };

    return (
        <>
            {error && (
                <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                >
                    {typeof error === "string"
                        ? error
                        : (error as any)?.response?.data?.content || "Đã xảy ra lỗi"}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-5">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tài khoản
                    </label>
                    <input
                        onChange={handleOnChange}
                        name="taiKhoan"
                        type="text"
                        value={user.taiKhoan}
                        autoComplete="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Mật khẩu
                    </label>
                    <input
                        onChange={handleOnChange}
                        name="matKhau"
                        type="password"
                        value={user.matKhau}
                        autoComplete="current-password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-5 py-2.5 text-sm text-white font-medium rounded-lg
                     bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                     disabled:opacity-60 disabled:cursor-not-allowed
                     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {loading ? "Đang đăng nhập..." : "Submit"}
                </button>
            </form>
        </>
    );
}
