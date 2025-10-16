import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import {
    fetchHeThongRap,
    fetchLichChieuTheoHeThongRap,
} from "@redux/slices/home/cinemaSlice";

dayjs.locale("vi");

export default function Cinema() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { data: dataHeThongRap, loading: loadingHeThongRap } = useAppSelector(
        (s) => s.cinema.heThongRap
    );
    const {
        data: dataLichChieuRap,
        loading: loadingLichChieuRap,
        error: errorLichHeThongRap,
    } = useAppSelector((s) => s.cinema.lichChieuHeThongRap);

    const [activeHeThongRap, setActiveSys] = useState<string>("");
    const [activeMovie, setActiveMovie] = useState<number | null>(null);

    // fetch hệ thống
    useEffect(() => {
        dispatch(fetchHeThongRap());
    }, [dispatch]);

    // set hệ thống mặc định
    useEffect(() => {
        if (!activeHeThongRap && dataHeThongRap?.length)
            setActiveSys(dataHeThongRap[0].maHeThongRap);
    }, [dataHeThongRap, activeHeThongRap]);

    // fetch lịch chiếu theo hệ thống
    useEffect(() => {
        if (activeHeThongRap) dispatch(fetchLichChieuTheoHeThongRap());
    }, [activeHeThongRap, dispatch]);

    // lấy cụm rạp theo hệ thống
    const lstCumRap =
        Array.isArray(dataLichChieuRap)
            ? dataLichChieuRap.find((h: any) => h.maHeThongRap === activeHeThongRap)
            ?.lstCumRap ?? []
            : [];

    // distinct movies
    const moviesHeThongRap: any[] = (() => {
        const raw = lstCumRap.flatMap((c: any) => c.danhSachPhim ?? c.dsPhim ?? []);
        const map = new Map<number, any>();
        raw.forEach((p: any) => {
            if (!map.has(p.maPhim)) map.set(p.maPhim, p);
        });
        return Array.from(map.values());
    })();

    // lịch chiếu cho phim active
    const isActiveMoviesHeThongRap = (() => {
        if (!activeMovie) return [];
        const items: { cum: any; lich: any[] }[] = [];
        lstCumRap.forEach((cum: any) => {
            const phim = (cum.danhSachPhim ?? []).find(
                (p: any) => p.maPhim === activeMovie
            );
            const lich = phim?.lstLichChieuTheoPhim ?? phim?.lichChieuPhim ?? [];
            if (lich?.length) items.push({ cum, lich });
        });
        return items;
    })();

    // set phim mặc định
    useEffect(() => {
        if (!activeMovie && moviesHeThongRap.length)
            setActiveMovie(moviesHeThongRap[0].maPhim);
    }, [moviesHeThongRap, activeMovie]);

    return (
        <section className="container mx-auto px-4 py-8 text-white">
            {/* Header */}
            <div className="rounded-2xl bg-gradient-to-br from-indigo-600/20 via-sky-500/10 to-emerald-500/10 border border-white/10 p-5 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Đặt Vé Xem Phim</h2>
            </div>

            {/* Dải hệ thống rạp */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6">
                {loadingHeThongRap && <SysSkeleton />}
                {!loadingHeThongRap &&
                    dataHeThongRap?.map((sys: any) => (
                        <button
                            key={sys.maHeThongRap}
                            onClick={() => {
                                setActiveSys(sys.maHeThongRap);
                                setActiveMovie(null);
                            }}
                            className={`group px-3 py-2 rounded-full border backdrop-blur-md transition shadow-sm
                ${activeHeThongRap === sys.maHeThongRap
                                ? "bg-white/10 border-white/30 ring-2 ring-primary/60"
                                : "border-white/15 hover:bg-white/5"}`}
                            aria-pressed={activeHeThongRap === sys.maHeThongRap}
                            title={sys.tenHeThongRap}
                        >
              <span className="inline-flex items-center gap-2">
                {sys.logo ? (
                    <img
                        src={sys.logo}
                        alt={sys.tenHeThongRap}
                        className="w-5 h-5 object-contain rounded"
                    />
                ) : (
                    <span className="w-5 h-5 rounded bg-white/20" />
                )}
                  <span className="text-sm">{sys.tenHeThongRap}</span>
              </span>
                        </button>
                    ))}
            </div>

            {/* Layout 2 cột: trái = phim; phải = lịch chiếu */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Cột trái: danh sách phim */}
                <div className="lg:col-span-6">
                    <h3 className="text-lg font-semibold mb-3">Phim trong hệ thống</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {loadingLichChieuRap && <MovieSkeleton />}
                        {!loadingLichChieuRap &&
                            moviesHeThongRap.map((p: any) => (
                                <button
                                    key={p.maPhim}
                                    onClick={() => setActiveMovie(p.maPhim)}
                                    className={`group text-left rounded-2xl overflow-hidden border transition 
                    ${activeMovie === p.maPhim
                                        ? "border-primary/60 ring-2 ring-primary/60 bg-white/5"
                                        : "border-white/10 hover:border-white/20 bg-white/[0.03]"}`}
                                    title={p.tenPhim}
                                >
                                    <div className="aspect-[3/4] overflow-hidden">
                                        <img
                                            src={p.hinhAnh}
                                            alt={p.tenPhim}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <p className="font-medium line-clamp-2">{p.tenPhim}</p>
                                        <div className="mt-2 flex gap-1 text-[10px]">
                                            {p.dangChieu && (
                                                <span className="px-1 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                          Đang chiếu
                        </span>
                                            )}
                                            {p.sapChieu && (
                                                <span className="px-1 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                          Sắp chiếu
                        </span>
                                            )}
                                            {p.hot && (
                                                <span className="px-1 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                          HOT
                        </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                    </div>

                    {!moviesHeThongRap.length && !loadingLichChieuRap && (
                        <div className="text-sm opacity-70 mt-2">
                            Không có phim nào trong hệ thống.
                        </div>
                    )}
                </div>

                {/* Cột phải: lịch chiếu theo cụm */}
                <div className="lg:col-span-6">
                    <h3 className="text-lg font-semibold mb-3">Lịch chiếu</h3>

                    {errorLichHeThongRap && (
                        <div className="text-sm text-red-400 mb-3">
                            {errorLichHeThongRap.name}
                        </div>
                    )}

                    {loadingLichChieuRap && <ShowtimeSkeleton />}

                    {!loadingLichChieuRap && (
                        <div className="space-y-4">
                            {isActiveMoviesHeThongRap.map(({ cum, lich }) => (
                                <div
                                    key={cum.maCumRap}
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                                >
                                    <div className="mb-3">
                                        <h4 className="font-semibold">{cum.tenCumRap}</h4>
                                        <p className="text-xs text-white/70">{cum.diaChi}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {lich.map((lc: any) => (
                                            <button
                                                key={lc.maLichChieu}
                                                onClick={() =>
                                                    navigate(`/ticket-room/${lc.maLichChieu}`)
                                                }
                                                className="px-3 py-1.5 rounded-xl border border-white/15 bg-white/[0.04]
                                   hover:bg-white/10 hover:shadow transition text-sm"
                                                title={`Giá: ${Number(lc.giaVe).toLocaleString(
                                                    "vi-VN"
                                                )}đ • ${lc.thoiLuong}p`}
                                            >
                                                {dayjs(lc.ngayChieuGioChieu).format("ddd, DD/MM • HH:mm")}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {!!activeMovie &&
                                !isActiveMoviesHeThongRap.length &&
                                !loadingLichChieuRap && (
                                    <div className="text-sm opacity-70">
                                        Phim này hiện chưa có suất chiếu trong hệ thống đã chọn.
                                    </div>
                                )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

/* ================== Skeletons (Tailwind-only) ================== */

function SysSkeleton() {
    return (
        <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="w-28 h-9 rounded-full bg-white/10 animate-pulse"
                />
            ))}
        </div>
    );
}

function MovieSkeleton() {
    return (
        <Fragment>
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]"
                >
                    <div className="aspect-[3/4] bg-white/10 animate-pulse" />
                    <div className="p-3">
                        <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                    </div>
                </div>
            ))}
        </Fragment>
    );
}

function ShowtimeSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
                <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                    <div className="h-4 w-48 bg-white/10 rounded mb-2 animate-pulse" />
                    <div className="h-3 w-80 bg-white/10 rounded mb-3 animate-pulse" />
                    <div className="flex gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-8 w-28 bg-white/10 rounded-xl animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
