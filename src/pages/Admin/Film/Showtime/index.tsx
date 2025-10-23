import { useState, useEffect } from "react";
import { useAppDispatch } from "@redux/hooks";
import Swal from "sweetalert2";
import { createShowtime } from "@redux/slices/auth/showtimeSlice";
import {showtimeService} from "@services/auth/showtimeService.ts";

export default function Showtime({ maPhim, onClose }: { maPhim: number; onClose: () => void }) {
    const dispatch = useAppDispatch();

    const [systems, setSystems] = useState<any[]>([]);
    const [clusters, setClusters] = useState<any[]>([]);

    const [form, setForm] = useState({
        maHeThongRap: "",
        maCumRap: "",
        ngayChieuGioChieu: "",
        giaVe: 90000,
    });

    useEffect(() => {
        showtimeService.getCinema().then((res) => setSystems(res.data.content));
    }, []);

    useEffect(() => {
        if (form.maHeThongRap) {
            showtimeService
                .getCinemaClusters(form.maHeThongRap)
                .then((res : any) => setClusters(res.data.content));
            setForm((prev) => ({ ...prev, maCumRap: "" }));
        } else {
            setClusters([]);
        }
    }, [form.maHeThongRap]);

    const handleSubmit = async () => {
        if (!form.maCumRap || !form.ngayChieuGioChieu)
            return Swal.fire( "Vui lòng chọn cụm rạp và ngày chiếu", "warning");

        const [date, time] = form.ngayChieuGioChieu.split("T");
        const [y, m, d] = date.split("-");
        const formattedDate = `${d}/${m}/${y} ${time}:00`;

        try {
            await dispatch(
                createShowtime({
                    maPhim,
                    maRap: form.maCumRap,
                    ngayChieuGioChieu: formattedDate,
                    giaVe: form.giaVe,
                })
            ).unwrap();

            await Swal.fire("Thành công", "Tạo lịch chiếu thành công!", "success");
            onClose();
        } catch (err: any) {
            await Swal.fire("Lỗi", err?.message || "Không thể tạo lịch chiếu", "error");
        }
    };

    return (
        <div className="space-y-6 text-white bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-xl shadow-xl border border-white/10">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                <span className="text-orange-400 text-3xl">🎬</span>
                <span>Tạo lịch chiếu mới</span>
            </h2>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 tracking-wide">
                    Hệ thống rạp
                </label>
                <div className="relative">
                    <select
                        value={form.maHeThongRap}
                        onChange={(e) => setForm({ ...form, maHeThongRap: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-gray-600
          text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="" className="bg-slate-900 text-gray-400">
                            🎟️ Chọn hệ thống rạp
                        </option>
                        {systems.map((sys) => (
                            <option
                                key={sys.maHeThongRap}
                                value={sys.maHeThongRap}
                                className="bg-slate-900 text-gray-200"
                            >
                                🎥 {sys.tenHeThongRap.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ▼
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 tracking-wide">
                    Cụm rạp
                </label>
                <div className="relative">
                    <select
                        value={form.maCumRap}
                        onChange={(e) => setForm({ ...form, maCumRap: e.target.value })}
                        disabled={!form.maHeThongRap}
                        className={`w-full px-4 py-2.5 rounded-lg bg-slate-800 border ${
                            !form.maHeThongRap ? "border-gray-700 text-gray-500" : "border-gray-600 text-gray-100"
                        } appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                        <option value="" className="bg-slate-900 text-gray-400">
                            🍿 Chọn cụm rạp
                        </option>
                        {clusters.map((c) => (
                            <option
                                key={c.maCumRap}
                                value={c.maCumRap}
                                className="bg-slate-900 text-gray-200"
                            >
                                🎫 {c.tenCumRap}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ▼
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ngày chiếu
                    </label>
                    <input
                        type="datetime-local"
                        value={form.ngayChieuGioChieu}
                        onChange={(e) => setForm({ ...form, ngayChieuGioChieu: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-gray-600 text-gray-100
          focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Giá vé (VNĐ)
                    </label>
                    <input
                        type="number"
                        min={75000}
                        max={200000}
                        step={5000}
                        value={form.giaVe}
                        onChange={(e) => setForm({ ...form, giaVe: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-gray-600 text-gray-100
          focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700 mt-4">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
                >
                    Hủy
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition"
                >
                    🚀 Tạo lịch chiếu
                </button>
            </div>
        </div>
    );

}
