import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import {fetchHeThongRap, fetchLichChieuTheoHeThongRap} from "@redux/slices/home/cinemaSlice.ts";

dayjs.locale("vi");

export default function CinemaSection() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // state
    const { data: dataHeThongRap, loading: loadingHeThongRap } = useAppSelector((s) => s.cinema.heThongRap);
    const { data: dataLichChieuRap, loading: loadingLichChieuRap, error: errorLichHeThongRap } = useAppSelector(
        (s) => s.cinema.lichChieuHeThongRap
    );

    // chọn hệ thống & phim đang active
    const [activeHeThongRap, setActiveSys] = useState<string>("");
    const [activeMovie, setActiveMovie] = useState<number | null>(null);

    // hệ thống rạp
    useEffect(() => {
        dispatch(fetchHeThongRap());
    }, [dispatch]);

    //  set hệ thống mặc định khi có dataHeThongRap
    useEffect(() => {
        if (!activeHeThongRap && dataHeThongRap?.length) setActiveSys(dataHeThongRap[0].maHeThongRap);
    }, [dataHeThongRap, activeHeThongRap]);

    // gọi lịch chiếu toàn hệ thống
    useEffect(() => {
        if (activeHeThongRap) dispatch(fetchLichChieuTheoHeThongRap());
    }, [activeHeThongRap, dispatch]);

    // lấy data theo system → phim → lịch chiếu
    const lstCumRap = (() => {
        if (!dataLichChieuRap) return [];
        // dạng mảng: [{maHeThongRap, lstCumRap: [...] }]
        if (Array.isArray(dataLichChieuRap)) {
            return dataLichChieuRap.find((h: any) => h.maHeThongRap === activeHeThongRap)?.lstCumRap ?? [];
        }
    })();


    // danh sách phim duy nhất theo hệ thống hiện tại
    const moviesHeThongRap: any[] = (() => {
        const raw = lstCumRap.flatMap((c: any) => c.danhSachPhim ?? c.dsPhim ?? []);
        const map = new Map<number, any>();
        raw.forEach((p: any) => {
            if (!map.has(p.maPhim)) map.set(p.maPhim, p);
        });
        return Array.from(map.values());
    })();

    // lịch chiếu của phim đang chọn
    const isActiveMoviesHeThongRap = (() => {
        if (!activeMovie) return [];
        const items: { cum: any; lich: any[] }[] = [];
        lstCumRap.forEach((cum: any) => {
            const phim = (cum.danhSachPhim ?? []).find((p: any) => p.maPhim === activeMovie);
            const lich = phim?.lstLichChieuTheoPhim ?? phim?.lichChieuPhim ?? [];
            if (lich?.length) items.push({ cum, lich });
        });
        return items;
    })();

    // set phim mặc định khi có danh sách phim
    useEffect(() => {
        if (!activeMovie && moviesHeThongRap.length) setActiveMovie(moviesHeThongRap[0].maPhim);
    }, [moviesHeThongRap, activeMovie]);

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="flex items-end justify-between gap-4 mb-4">
                <h2 className="text-xl md:text-2xl font-semibold">Hệ thống rạp → Phim → Lịch chiếu</h2>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {loadingHeThongRap && <span className="text-sm opacity-70 py-2">Đang tải hệ thống rạp…</span>}
                {dataHeThongRap?.map((sys: any) => (
                    <button
                        key={sys.maHeThongRap}
                        onClick={() => {
                            setActiveSys(sys.maHeThongRap);
                            setActiveMovie(null);
                        }}
                        className={`px-3 py-2 rounded-2xl border text-sm whitespace-nowrap transition select-none
            ${activeHeThongRap === sys.maHeThongRap ? "bg-primary text-white border-primary" : "border-neutral-300 dark:border-neutral-700"}`}
                        aria-pressed={activeHeThongRap === sys.maHeThongRap}
                    >
            <span className="inline-flex items-center gap-2">
              {sys.logo && <img src={sys.logo} alt={sys.tenHeThongRap} className="w-5 h-5 object-contain" />}
                {sys.tenHeThongRap}
            </span>
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {loadingLichChieuRap && <div className="text-sm opacity-70">Đang tải dữ liệu…</div>}
                {errorLichHeThongRap && <div className="text-sm text-red-500">{errorLichHeThongRap.name}</div>}

                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {moviesHeThongRap.map((p: any) => (
                        <button
                            key={p.maPhim}
                            onClick={() => setActiveMovie(p.maPhim)}
                            className={`px-3 py-2 rounded-2xl border text-sm whitespace-nowrap transition select-none
              ${activeMovie === p.maPhim ? "bg-primary text-white border-primary" : "border-neutral-300 dark:border-neutral-700"}`}
                            title={p.tenPhim}
                        >
              <span className="inline-flex items-center gap-2">
                {p.hinhAnh && (
                    <img src={p.hinhAnh} alt={p.tenPhim} className="w-7 h-10 object-cover rounded" />
                )}
                  <span className="line-clamp-1 max-w-[180px] text-left">{p.tenPhim}</span>
              </span>
                        </button>
                    ))}
                    {!moviesHeThongRap.length && !loadingLichChieuRap && (
                        <span className="text-sm opacity-70">Không có phim nào trong hệ thống.</span>
                    )}
                </div>
            </div>

            {/* 3) Lịch chiếu của phim đã chọn, gộp theo cụm rạp */}
            <div className="mt-6 space-y-4">
                {isActiveMoviesHeThongRap.map(({ cum, lich }) => (
                    <div key={cum.maCumRap} className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                        <div className="mb-2">
                            <h3 className="font-medium">{cum.tenCumRap}</h3>
                            <p className="text-xs opacity-70">{cum.diaChi}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {lich.map((lc: any) => (
                                <button
                                    key={lc.maLichChieu}
                                    onClick={() => navigate(`/ticketroom/${lc.maLichChieu}`)}
                                    className="px-3 py-1.5 rounded-xl border hover:shadow transition text-sm"
                                    title={`Giá: ${Number(lc.giaVe).toLocaleString()}đ • ${lc.thoiLuong}p`}
                                >
                                    {dayjs(lc.ngayChieuGioChieu).format("ddd, DD/MM • HH:mm")}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {!!activeMovie && !isActiveMoviesHeThongRap.length && !loadingLichChieuRap && (
                    <div className="text-sm opacity-70">Phim này hiện chưa có suất chiếu trong hệ thống đã chọn.</div>
                )}
            </div>
        </section>
    );
}

