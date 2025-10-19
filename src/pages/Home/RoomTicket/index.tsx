import { useEffect, useState } from "react";
import {Navigate, useParams} from "react-router-dom";
import { useAppDispatch } from "@redux/hooks";
import { useSelector } from "react-redux";
import { fetchRoomTicket } from "@redux/slices/home/ticketSlice";
import type { RootState } from "@redux/store";
import type { ISeat } from "@/types/ISeat";
import Loading from "@components/Loading";
import Seat from "@pages/Home/RoomTicket/Seat";

export default function RoomTicket() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { data: ticket, loading, error } = useSelector((s: RootState) => s.ticket);
    const userAuth = useSelector((state : RootState) => state.userAuth.data)


    if(!userAuth){
        return <Navigate to={"/login"}/>
    }


    // State chọn ghế
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        if (id) dispatch(fetchRoomTicket(Number(id)));
    }, [id, dispatch]);

    if (loading) return <Loading />;
    if (error) return <div className="text-center text-red-500 p-8">Lỗi rồi</div>;
    if (!ticket) return <div className="text-center p-8">Không tìm thấy dữ liệu.</div>;

    return (
        <div className="container mx-auto p-6 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <div className="flex justify-center gap-6 mb-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-gray-500 inline-block" />
                            <span>Ghế Thường</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-yellow-500 inline-block" />
                            <span>Ghế VIP</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-gray-700 inline-block" />
                            <span>Đã đặt</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-emerald-500 inline-block" />
                            <span>Đang chọn</span>
                        </div>
                    </div>

                    <div className="mx-auto mb-4 h-1 w-3/4 bg-white/30 rounded" />
                    <p className="text-center text-sm text-white/60 mb-6">MÀN HÌNH</p>

                    <div className="mx-auto max-w-full">
                        <div
                            className="grid justify-center gap-8"
                            style={{
                                gridTemplateColumns: "repeat(10, minmax(1.8rem, 1.8rem))",
                            }}
                        >
                            {ticket.danhSachGhe?.map((seat: ISeat) => (
                                <Seat
                                    key={seat.maGhe}
                                    seat={seat}
                                    selected={selectedIds.includes(seat.maGhe)}
                                    onToggle={(s) =>
                                        setSelectedIds((prev) =>
                                            prev.includes(s.maGhe)
                                                ? prev.filter((x) => x !== s.maGhe)
                                                : [...prev, s.maGhe]
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="lg:col-span-4">
                    <div className="lg:sticky lg:top-6 space-y-4">
                        <div className="bg-white/5 rounded-xl p-4">
                            <div className="flex items-center gap-4">
                                {ticket.thongTinPhim.hinhAnh && (
                                    <img
                                        src={ticket.thongTinPhim.hinhAnh}
                                        alt={ticket.thongTinPhim.tenPhim}
                                        className="w-20 h-28 object-cover rounded"
                                    />
                                )}
                                <div>
                                    <h1 className="text-xl font-bold">{ticket.thongTinPhim.tenPhim} </h1>
                                    <p className="text-white/80">{ticket.thongTinPhim.tenCumRap} • {ticket.thongTinPhim.tenRap}</p>
                                    <p className="text-white/60">{ticket.thongTinPhim.diaChi}</p>
                                    <p className="text-white/60">
                                        {ticket.thongTinPhim.ngayChieu} • {ticket.thongTinPhim.gioChieu} • Mã:{" "}
                                        <span className="font-semibold">{ticket.thongTinPhim.maLichChieu}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                            <h3 className="font-semibold mb-2">Ghế đã chọn</h3>
                            {ticket.danhSachGhe?.some((s) => selectedIds.includes(s.maGhe)) ? (
                                <div className="flex flex-wrap gap-2">
                                    {ticket.danhSachGhe
                                        .filter((s) => selectedIds.includes(s.maGhe))
                                        .map((s) => (
                                            <span
                                                key={s.maGhe}
                                                className="px-2 py-1 rounded-md text-sm bg-white/10 border border-white/15"
                                                title={`${s.tenGhe} - ${s.loaiGhe}`}
                                            >
                        {s.tenGhe || s.stt}{" "}
                                                <span className="opacity-70">({s.loaiGhe})</span>
                      </span>
                                        ))}
                                </div>
                            ) : (
                                <p className="text-white/60">Chưa chọn ghế nào.</p>
                            )}
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                            <h3 className="font-semibold mb-2">Tạm tính</h3>
                            <p className="text-white/80">
                                Số ghế:{" "}
                                <strong>
                                    {ticket.danhSachGhe?.filter((s) => selectedIds.includes(s.maGhe)).length ?? 0}
                                </strong>
                            </p>
                            <p className="text-2xl font-bold mt-1">
                                {(
                                    ticket.danhSachGhe
                                        ?.filter((s) => selectedIds.includes(s.maGhe))
                                        .reduce((sum, s) => sum + (s.giaVe ?? 0), 0) ?? 0
                                ).toLocaleString("vi-VN")}
                                ₫
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                            <h3 className="font-semibold mb-2">Thông tin đặt</h3>
                            <p className="text-white/80">
                                Người đặt: <strong>{userAuth?.hoTen}</strong>
                            </p>
                            <p className="text-white/80">
                                Email: <strong>{userAuth?.email}</strong>
                            </p>
                        </div>

                    </div>
                </aside>
            </div>
        </div>
    );
}
