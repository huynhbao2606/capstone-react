import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTrash, faPenToSquare, faPlus, faFilm, faVideo,} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading";
import FilmForm from "@pages/Admin/Film/FilmForm";
import Swal from "sweetalert2";
import {useAppDispatch} from "@redux/hooks";
import {deleteFilm, fetchFilms} from "@redux/slices/auth/flimsSlice";
import {useState} from "react";
import Pagination from "@pages/Admin/_components/Pagination";
import type {IFilm} from "@/types/IFilm.ts";
import Showtime from "@pages/Admin/Film/Showtime";

export default function FilmsList({data, loading, keyword, setKeyword, page, setPage,}: any) {
    const dispatch = useAppDispatch();

    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState<IFilm | null>(null);

    const handleOpenShowtime = (film: IFilm) => {
        setSelectedFilm(film);
        setShowModal(true);
    };

    const handleCloseShowtime = () => {
        setSelectedFilm(null);
        setShowModal(false);
    };

    const handleDelete = async (id: number) => {
        const confirm = await Swal.fire({
            title: "Xác nhận xoá?",
            text: "Phim này sẽ bị xoá vĩnh viễn.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xoá",
            cancelButtonText: "Huỷ",
            confirmButtonColor: "#e11d48",
        });
        if (!confirm.isConfirmed) return;

        try {
            await dispatch(deleteFilm(id)).unwrap();
            await Swal.fire({
                icon: "success",
                title: "Đã xoá phim!",
                timer: 1500,
                showConfirmButton: false,
            });
            dispatch(fetchFilms({tenPhim: keyword, soTrang: page}));
        } catch {
            await Swal.fire({
                icon: "error",
                title: "Xoá thất bại!",
                text: "Không thể xoá phim, vui lòng thử lại.",
            });
        }
    };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faFilm} className="text-orange-500"/>
                    Quản lý phim
                </h1>

                <div className="flex gap-3 items-center w-full sm:w-auto">
                    <div className="relative w-full sm:w-80">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={keyword}
                            onChange={setKeyword}
                            placeholder="Tìm kiếm phim theo tên..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700
                 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                        />
                    </div>


                    <button
                        onClick={() => {
                            setSelected(null);
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition"
                    >
                        <FontAwesomeIcon icon={faPlus}/> Thêm phim
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loading/>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead
                            className="bg-gradient-to-r from-orange-100 to-orange-50 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Hình</th>
                            <th className="px-4 py-3">Tên phim</th>
                            <th className="px-4 py-3">Ngày chiếu</th>
                            <th className="px-4 py-3">Đánh giá</th>
                            <th className="px-4 py-3">Trạng thái</th>
                            <th className="px-4 py-3 text-right">Hành động</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 bg-white">
                        {data?.items?.length ? (
                            data.items.map((film: any) => (
                                <tr key={film.maPhim} className="hover:bg-orange-50 transition">
                                    <td className="px-4 py-3">
                                        <img
                                            src={film.hinhAnh}
                                            alt={film.tenPhim}
                                            className="w-12 h-16 object-cover rounded-md border border-gray-300"
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {film.tenPhim}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {film.ngayKhoiChieu}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-gray-800">
                                        ⭐ {film.danhGia}
                                    </td>
                                    <td className="px-4 py-3">
                                        {film.dangChieu ? (
                                            <span
                                                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                                                Đang chiếu
                                            </span>
                                        ) : film.sapChieu ? (
                                            <span
                                                className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                          Sắp chiếu
                        </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                          Ngưng chiếu
                        </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelected(film);
                                                setShowForm(true);
                                            }}
                                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare}/> Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(film.maPhim)}
                                            className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 font-medium text-sm"
                                        >
                                            <FontAwesomeIcon icon={faTrash}/> Xoá
                                        </button>
                                        <button
                                            onClick={() => handleOpenShowtime(film)}
                                            className="text-orange-500 hover:text-orange-700 font-medium text-sm"
                                        >
                                            <FontAwesomeIcon icon={faVideo} /> Lịch chiếu
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-6 text-gray-500 italic"
                                >
                                    Không có dữ liệu phim
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-center mt-6">
                <Pagination
                    currentPage={page}
                    totalPages={Math.ceil((data?.totalCount || 0) / 10)}
                    onPageChange={setPage}
                />
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-lg relative">
                        <FilmForm
                            initial={selected}
                            onClose={() => {
                                setShowForm(false);
                                dispatch(fetchFilms({tenPhim: keyword, soTrang: page}));
                            }}
                        />
                    </div>
                </div>
            )}

            {showModal && selectedFilm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-900 text-white p-6 rounded-xl w-[500px] relative">
                        <button
                            onClick={handleCloseShowtime}
                            className="absolute top-2 right-3 text-gray-400 hover:text-white text-lg"
                        >
                            ×
                        </button>
                        <Showtime maPhim={selectedFilm.maPhim} onClose={handleCloseShowtime} />
                    </div>
                </div>
            )}
        </div>
    );
}
