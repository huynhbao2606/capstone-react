import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import type { RootState, AppDispatch } from "@/redux/store";
import { tryAutoLogin } from "@redux/slices/auth/adminAuthSlice";

export default function AdminDashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.adminAuth.data);

    useEffect(() => {
        dispatch(tryAutoLogin());
    }, [dispatch]);

    if (!data) return <Navigate to="/auth" />;

    return (
        <div className="min-h-screen text-gray-100 p-6">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-orange-400">
                    🎬 Admin Dashboard
                </h1>
                <div className="text-sm text-gray-400">
                    Xin chào, <span className="text-white font-medium">{data.taiKhoan}</span>
                </div>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Tổng phim", value: 126 },
                    { label: "Người dùng", value: 340 },
                    { label: "Đang chiếu", value: 58 },
                    { label: "Sắp chiếu", value: 14 },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-orange-400 transition"
                    >
                        <p className="text-sm text-gray-400">{item.label}</p>
                        <p className="text-2xl font-semibold text-white">{item.value}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-4">Tác vụ nhanh</h2>
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: "➕ Thêm phim mới", color: "bg-orange-500" },
                        { label: "🎞️ Quản lý phim", color: "bg-blue-500" },
                        { label: "👥 Quản lý người dùng", color: "bg-green-500" },
                        { label: "📊 Báo cáo thống kê", color: "bg-purple-500" },
                    ].map((btn, i) => (
                        <button
                            key={i}
                            className={`${btn.color} px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}
