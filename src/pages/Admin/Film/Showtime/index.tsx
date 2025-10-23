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
        <div className="space-y-4 text-white">
            <h2 className="text-lg font-semibold mb-3">🎬 Tạo lịch chiếu mới</h2>

            <div>
                <label className="block mb-1 text-sm text-gray-300">Hệ thống rạp</label>
                <select
                    value={form.maHeThongRap}
                    onChange={(e) => setForm({ ...form, maHeThongRap: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-white/10 border border-gray-500"
                >
                    <option value="">-- Chọn hệ thống --</option>
                    {systems.map((sys) => (
                        <option key={sys.maHeThongRap} value={sys.maHeThongRap}>
                            {sys.tenHeThongRap}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1 text-sm text-gray-300">Cụm rạp</label>
                <select
                    value={form.maCumRap}
                    onChange={(e) => setForm({ ...form, maCumRap: e.target.value })}
                    disabled={!form.maHeThongRap}
                    className="w-full px-3 py-2 rounded bg-white/10 border border-gray-500"
                >
                    <option value="">-- Chọn cụm --</option>
                    {clusters.map((c) => (
                        <option key={c.maCumRap} value={c.maCumRap}>
                            {c.tenCumRap}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 text-sm text-gray-300">Ngày chiếu</label>
                    <input
                        type="datetime-local"
                        value={form.ngayChieuGioChieu}
                        onChange={(e) => setForm({ ...form, ngayChieuGioChieu: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-white/10 border border-gray-500"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm text-gray-300">Giá vé</label>
                    <input
                        type="number"
                        value={form.giaVe}
                        min={75000}
                        max={200000}
                        step={5000}
                        onChange={(e) => setForm({ ...form, giaVe: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded bg-white/10 border border-gray-500"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-600">
                <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-400 rounded-lg text-gray-300 hover:bg-gray-700 transition"
                >
                    Hủy
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
                >
                    Tạo lịch chiếu
                </button>
            </div>
        </div>
    );
}
