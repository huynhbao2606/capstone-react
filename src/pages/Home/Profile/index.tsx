import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchProfile } from "@redux/slices/home/profileSlice";
import type { RootState } from "@redux/store";

function getInitials(name?: string, fb = "U") {
    if (!name) return fb;
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "")).toUpperCase() || fb;
}


export default function Profile() {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((s: RootState) => s.profile);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 text-white">
                <div className="animate-pulse space-y-6">
                    <div className="h-24 bg-white/5 rounded-xl" />
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="h-40 bg-white/5 rounded-xl" />
                        <div className="h-40 bg-white/5 rounded-xl" />
                        <div className="h-40 bg-white/5 rounded-xl" />
                    </div>
                    <div className="h-10 bg-white/5 rounded-xl w-40" />
                    <div className="space-y-3">
                        <div className="h-28 bg-white/5 rounded-xl" />
                        <div className="h-28 bg-white/5 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 p-4">
                    Lỗi tải hồ sơ. Vui lòng thử lại sau.
                </div>
            </div>
        );
    }

    if (!data) return null;

    const name = data.hoTen || data.taiKhoan;
    const initials = getInitials(name);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 text-white">
            {/* Header */}
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
            </div>
        </div>
    );
}
