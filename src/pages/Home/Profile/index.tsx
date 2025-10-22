import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchProfile, updateProfile } from "@redux/slices/home/profileSlice";
import type { RootState } from "@redux/store";
import * as React from "react";

function getInitials(name?: string, fb = "U") {
    if (!name) return fb;
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "")).toUpperCase() || fb;
}

export default function Profile() {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((s: RootState) => s.profile);

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({ hoTen: "", email: "", soDT: "", matKhau: "" });

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setForm({
                hoTen: data.hoTen || "",
                email: data.email || "",
                soDT: data.soDT || "",
                matKhau: "",
            });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleUpdate = async () => {
        const confirm = await Swal.fire({
            title: "Xác nhận cập nhật?",
            text: "Bạn có chắc muốn lưu thay đổi thông tin?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Lưu thay đổi",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#22c55e",
        });
        if (!confirm.isConfirmed) return;

        try {
            await dispatch(updateProfile({ ...data, ...form })).unwrap();
            await Swal.fire({
                icon: "success",
                title: "Cập nhật thành công!",
                confirmButtonColor: "#22c55e",
            });
            dispatch(fetchProfile());
            setIsEditing(false);
        } catch (err: any) {
            await Swal.fire({
                icon: "error",
                title: "Lỗi cập nhật",
                text: err?.message || "Vui lòng thử lại sau.",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    if (loading)
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 text-white animate-pulse">
                <div className="h-32 bg-white/5 rounded-xl mb-4" />
                <div className="h-64 bg-white/5 rounded-xl" />
            </div>
        );

    if (error)
        return (
            <div className="container mx-auto px-4 py-12 text-center text-red-400">
                Lỗi tải hồ sơ. Vui lòng thử lại sau.
            </div>
        );

    if (!data) return null;

    const name = data.hoTen || data.taiKhoan;
    const initials = getInitials(name);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 text-white">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 grid place-items-center text-xl font-bold">
                    {initials}
                </div>
                <div className="min-w-0">
                    <h1 className="text-2xl font-bold truncate">{name}</h1>
                    <p className="text-white/70 text-sm truncate">{data.email}</p>
                </div>
                <span className="ml-auto px-3 py-1 rounded-full text-xs bg-white/10 border border-white/15">
          {data.loaiNguoiDung?.tenLoai || data.maLoaiNguoiDung || "Khách hàng"}
        </span>
            </div>

            {!isEditing ? (
                <>
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="text-white/60 text-sm">Tài khoản</div>
                            <div className="font-semibold break-all">{data.taiKhoan}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="text-white/60 text-sm">Email</div>
                            <div className="font-semibold break-all">{data.email || "-"}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="text-white/60 text-sm">Số điện thoại</div>
                            <div className="font-semibold">{data.soDT || "-"}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="text-white/60 text-sm">Họ tên</div>
                            <div className="font-semibold">{data.hoTen}</div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-5 py-2 transition"
                    >
                        Cập nhật thông tin
                    </button>
                </>
            ) : (
                <>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                            <label className="text-white/60 text-sm">Họ tên</label>
                            <input
                                type="text"
                                name="hoTen"
                                value={form.hoTen}
                                onChange={handleChange}
                                className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white focus:ring focus:ring-orange-400 outline-none"
                            />
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                            <label className="text-white/60 text-sm">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white focus:ring focus:ring-orange-400 outline-none"
                            />
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                            <label className="text-white/60 text-sm">Số điện thoại</label>
                            <input
                                type="text"
                                name="soDT"
                                value={form.soDT}
                                onChange={handleChange}
                                className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white focus:ring focus:ring-orange-400 outline-none"
                            />
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                            <label className="text-white/60 text-sm">Mật khẩu mới</label>
                            <input
                                type="password"
                                name="matKhau"
                                value={form.matKhau}
                                onChange={handleChange}
                                placeholder="(để trống nếu không đổi)"
                                className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white focus:ring focus:ring-orange-400 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleUpdate}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 transition"
                        >
                            Lưu thay đổi
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg py-2 transition"
                        >
                            Hủy
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
