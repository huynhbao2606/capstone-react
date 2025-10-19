import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchProfile } from "@redux/slices/home/profileSlice";
import type { RootState } from "@redux/store";
import type {IThongTinDatVe } from "@/types/IProfile";

function getInitials(name?: string, fb = "U") {
    if (!name) return fb;
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "")).toUpperCase() || fb;
}
function fmtDateISO(d?: string) {
    if (!d) return "";
    const date = new Date(d);
    return isNaN(date.getTime()) ? d : date.toLocaleString("vi-VN");
}
function fmtCurrency(n = 0) {
    return n.toLocaleString("vi-VN") + "₫";
}

export default function Profile() {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((s: RootState) => s.profile);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const tickets = useMemo<IThongTinDatVe[]>(
        () => data?.thongTinDatVe ?? [],
        [data?.thongTinDatVe]
    );

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

            {/* Info grid */}
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

            {/* Tickets */}
            <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl font-bold">Vé đã đặt</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/15">
          {tickets.length}
        </span>
            </div>

            {tickets.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
                    Bạn chưa có vé nào.
                </div>
            ) : (
                <ul className="space-y-4">
                    {tickets.map((v) => (
                        <li
                            key={v.maVe}
                            className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                        >
                            <div className="p-4 flex items-start gap-4">
                                {v.hinhAnh ? (
                                    <img
                                        src={v.hinhAnh}
                                        alt={v.tenPhim}
                                        className="w-16 h-24 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-16 h-24 rounded bg-white/10 grid place-items-center text-xs text-white/60">
                                        No Img
                                    </div>
                                )}

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg truncate">{v.tenPhim}</h3>
                                        <span className="ml-auto text-sm text-white/70">{fmtDateISO(v.ngayDat)}</span>
                                    </div>

                                    {/* Rạp / Ghế */}
                                    <div className="mt-1 text-sm text-white/80 space-y-1">
                                        {/* Lấy rạp từ ghế đầu tiên (API ghế có đủ thông tin rạp) */}
                                        {v.danhSachGhe?.length > 0 && (
                                            <div className="truncate">
                                                {v.danhSachGhe[0].tenHeThongRap} • {v.danhSachGhe[0].tenCumRap} •{" "}
                                                {v.danhSachGhe[0].tenRap}
                                            </div>
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                            {v.danhSachGhe?.map((g) => (
                                                <span
                                                    key={`${v.maVe}-${g.maGhe}`}
                                                    className="text-xs px-2 py-1 rounded-md bg-white/10 border border-white/15"
                                                    title={`Ghế ${g.tenGhe}`}
                                                >
                          Ghế {g.tenGhe}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Giá / thời lượng */}
                                <div className="text-right shrink-0">
                                    <div className="text-lg font-extrabold">{fmtCurrency(v.giaVe || 0)}</div>
                                    {v.thoiLuongPhim ? (
                                        <div className="text-xs text-white/70">{v.thoiLuongPhim} phút</div>
                                    ) : null}
                                    <div className="mt-2 text-xs text-white/60">Mã vé: {v.maVe}</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
