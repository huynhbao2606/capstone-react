import {useParams, Link } from "react-router";
import {useAppDispatch} from "@redux/hooks.ts";
import {useSelector} from "react-redux";
import type {RootState} from "@redux/store.ts";
import {useEffect} from "react";
import {fetchLichChieuTheoPhim} from "@redux/slices/home/cinemaSlice.ts";
import Loading from "@components/Loading";

export default function Detail(){
    const {id} = useParams();
    const dispatch = useAppDispatch();

    const { data: movie, loading, error } = useSelector(
        (state: RootState) => state.cinema.lichChieuTheoPhim
    );

    useEffect(() => {
        if (id) dispatch(fetchLichChieuTheoPhim(Number(id)));
    }, [id, dispatch]);

    if (loading) return Loading;
    if (error) return <div className="text-center text-red-600 p-8">Loi Roi</div>;
    if (!movie)
        return <div className="text-center p-8">Không tìm thấy dữ liệu phim.</div>;

    const fmt = (iso: string) =>
        new Date(iso).toLocaleString("vi-VN", { hour12: false });

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div>
                    <img
                        src={movie.hinhAnh}
                        alt={movie.tenPhim}
                        className="rounded-xl shadow-lg w-full"
                    />
                </div>
                <div className="md:col-span-2 space-y-3">
                    <h1 className="text-4xl font-bold">{movie.tenPhim}</h1>
                    <p className="text-gray-600">{movie.moTa || "Không có mô tả."}</p>
                    <p>
                        <span className="font-semibold">Ngày khởi chiếu:</span>{" "}
                        {new Date(movie.ngayKhoiChieu).toLocaleDateString("vi-VN")}
                    </p>
                    <p>
                        <span className="font-semibold">Đánh giá:</span> ⭐ {movie.danhGia}
                    </p>
                    {movie.trailer && (
                        <a
                            href={movie.trailer}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block px-4 py-2 mt-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                        >
                            Xem trailer
                        </a>
                    )}
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">Lịch chiếu</h2>

                {movie.heThongRapChieu?.length ? (
                    movie.heThongRapChieu.map((heThong) => (
                        <div
                            key={heThong.maHeThongRap}
                            className="mb-8 border rounded-lg p-4 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={heThong.logo}
                                    alt={heThong.tenHeThongRap}
                                    className="w-10 h-10 object-contain"
                                />
                                <h3 className="text-lg font-semibold">
                                    {heThong.tenHeThongRap}
                                </h3>
                            </div>

                            {heThong.cumRapChieu.map((cum) => (
                                <div key={cum.maCumRap} className="pl-4 mt-3">
                                    <p className="font-medium text-blue-600">
                                        {cum.tenCumRap}
                                        <span className="text-gray-500 text-sm ml-2">
                      ({cum.diaChi})
                    </span>
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {cum.lichChieuPhim.map((lc) => (
                                            <Link
                                                key={lc.maLichChieu}
                                                to={`/ticketroom/${lc.maLichChieu}`}
                                                className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-blue-500 hover:text-white transition"
                                                title={`Giá vé: ${lc.giaVe.toLocaleString()}₫`}
                                            >
                                                {fmt(lc.ngayChieuGioChieu)}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Chưa có lịch chiếu nào.</p>
                )}
            </div>
        </div>
    );
}