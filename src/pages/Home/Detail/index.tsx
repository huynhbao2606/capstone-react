import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch } from "@redux/hooks";
import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { fetchLichChieuTheoPhim } from "@redux/slices/home/cinemaSlice";
import Loading from "@components/Loading";

dayjs.locale("vi");

export default function Detail() {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const { data: movie, loading, error } = useSelector(
        (state: RootState) => state.cinema.lichChieuTheoPhim
    );

    useEffect(() => {
        if (id) dispatch(fetchLichChieuTheoPhim(Number(id)));
    }, [id, dispatch]);

    if (loading) return <Loading />;
    if (error) return <div className="text-center text-red-600 p-8">Đã có lỗi xảy ra.</div>;
    if (!movie) return <div className="text-center p-8">Không tìm thấy dữ liệu phim.</div>;

    const release = movie.ngayKhoiChieu
        ? dayjs(movie.ngayKhoiChieu).format("DD/MM/YYYY")
        : "—";

    return (
        <section className="container mx-auto px-4 py-10 text-white">
            <div className="grid gap-8 md:grid-cols-3">
                <div>
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl">
                        <img
                            src={movie.hinhAnh}
                            alt={movie.tenPhim}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                        {/* overlay nhẹ */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30" />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{movie.tenPhim}</h1>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {movie.dangChieu && (
                            <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-300">
                Đang chiếu
              </span>
                        )}
                        {movie.sapChieu && (
                            <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs text-amber-300">
                Sắp chiếu
              </span>
                        )}
                        {movie.hot && (
                            <span className="rounded-full bg-rose-500/20 px-2.5 py-1 text-xs text-rose-300">
                HOT
              </span>
                        )}
                        <span className="ml-1 text-sm text-white/70">
              Khởi chiếu: <span className="font-medium text-white">{release}</span>
            </span>
                        <span className="text-sm text-white/70">•</span>
                        <span className="text-sm text-white/90">⭐ {movie.danhGia ?? 0}</span>
                    </div>

                    <p className="mt-4 leading-relaxed text-white/80">
                        {movie.moTa?.trim() || "Chưa có mô tả cho phim này."}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {movie.trailer && (
                            <a
                                href={movie.trailer}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-4 py-2 text-sm hover:bg-white/10 transition"
                            >
                                {/* icon play */}
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Xem trailer
                            </a>
                        )}
                        {/* quay lại trang chủ / danh sách */}
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-4 py-2 text-sm hover:bg-white/10 transition"
                        >
                            {/* icon back */}
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                            </svg>
                            Về trang chủ
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight">Lịch chiếu</h2>

                {!movie.heThongRapChieu?.length ? (
                    <p className="text-white/60">Chưa có lịch chiếu nào cho phim này.</p>
                ) : (
                    <div className="space-y-6">
                        {movie.heThongRapChieu.map((heThong: any) => (
                            <div
                                key={heThong.maHeThongRap}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                            >
                                {/* Hệ thống */}
                                <div className="mb-3 flex items-center gap-3">
                                    {heThong.logo && (
                                        <img
                                            src={heThong.logo}
                                            alt={heThong.tenHeThongRap}
                                            className="h-9 w-9 rounded bg-white/10 p-1 object-contain"
                                        />
                                    )}
                                    <h3 className="text-lg font-semibold">{heThong.tenHeThongRap}</h3>
                                </div>

                                <div className="space-y-4">
                                    {heThong.cumRapChieu?.map((cum: any) => (
                                        <div key={cum.maCumRap} className="rounded-xl border border-white/10 p-4">
                                            <div className="mb-2">
                                                <p className="font-medium">{cum.tenCumRap}</p>
                                                <p className="text-xs text-white/60">{cum.diaChi}</p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {cum.lichChieuPhim?.map((lc: any) => (
                                                    <Link
                                                        key={lc.maLichChieu}
                                                        to={`/ticket-room/${lc.maLichChieu}`}
                                                        className="rounded-xl border border-white/15 bg-white/[0.04] px-3 py-1.5 text-sm hover:bg-white/10 hover:shadow transition"
                                                        title={`Giá: ${Number(lc.giaVe).toLocaleString("vi-VN")}đ • ${lc.thoiLuong}p`}
                                                    >
                                                        {dayjs(lc.ngayChieuGioChieu).format("ddd, DD/MM • HH:mm")}
                                                    </Link>
                                                ))}
                                                {!cum.lichChieuPhim?.length && (
                                                    <span className="text-sm text-white/60">Chưa có suất.</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
