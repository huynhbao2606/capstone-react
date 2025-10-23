import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faPenToSquare,
    faTrash,
    faUsers,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading";
import Swal from "sweetalert2";
import { Modal, ModalHeader, ModalBody, } from "flowbite-react";
import {useAppDispatch} from "@redux/hooks.ts";
import UserForm from "@pages/Admin/User/UserForm";
import {deleteUser, fetchUser} from "@redux/slices/auth/userSlice.ts";
import Pagination from "@pages/Admin/_components/Pagination";

export default function UserList({ data, loading, keyword, setKeyword, page, setPage }: any) {
    const dispatch = useAppDispatch();
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleDelete = async (taiKhoan: string) => {
        const confirm = await Swal.fire({
            title: "Xác nhận xoá?",
            text: `Bạn có chắc muốn xoá tài khoản "${taiKhoan}" không?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });
        if (!confirm.isConfirmed) return;
        try {
            await dispatch(deleteUser(taiKhoan)).unwrap();
            await Swal.fire({icon: "success", title: "Đã xoá thành công!", confirmButtonColor: "#22c55e"});
            dispatch(fetchUser({ tuKhoa: keyword, soTrang: page, soPhanTuTrenTrang: 10 }));
        } catch (err: any) {
            await Swal.fire({icon: "error", title: "Lỗi", text: err.message || "Không thể xoá"});
        }
    };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faUsers} className="text-orange-500" />
                    Quản lý người dùng
                </h1>

                <div className="flex gap-3 items-center w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-80">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={keyword}
                            onChange={setKeyword}
                            placeholder="Tìm kiếm theo tài khoản, họ tên..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700
                   focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setSelectedUser(null);
                            setOpenModal(true);
                        }}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg shadow-sm transition"
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                        Thêm mới
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loading />
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gradient-to-r from-orange-100 to-orange-50 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-5 py-3 font-semibold">Tài khoản</th>
                            <th className="px-5 py-3 font-semibold">Họ tên</th>
                            <th className="px-5 py-3 font-semibold">Email</th>
                            <th className="px-5 py-3 font-semibold">SĐT</th>
                            <th className="px-5 py-3 font-semibold">Loại</th>
                            <th className="px-5 py-3 text-right font-semibold">Hành động</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                        {data?.items?.length ? (
                            data.items.map((u: any) => (
                                <tr key={u.taiKhoan} className="hover:bg-orange-50 transition-colors duration-150">
                                    <td className="px-5 py-3 font-medium text-gray-900">{u.taiKhoan}</td>
                                    <td className="px-5 py-3">{u.hoTen || "-"}</td>
                                    <td className="px-5 py-3">{u.email || "-"}</td>
                                    <td className="px-5 py-3">{u.soDt || "-"}</td>
                                    <td className="px-5 py-3">
                      <span
                          className={`px-2 py-1 text-xs rounded-full font-semibold ${
                              u.maLoaiNguoiDung === "QuanTri"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-green-100 text-green-600"
                          }`}
                      >
                        {u.maLoaiNguoiDung}
                      </span>
                                    </td>
                                    <td className="px-5 py-3 text-right space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedUser(u);
                                                setOpenModal(true);
                                            }}
                                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} /> Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(u.taiKhoan)}
                                            className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 font-medium text-sm"
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-500">
                                    Không có dữ liệu người dùng
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
                    onPageChange={(p) => setPage(p)}
                />
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)} size="md" popup>
                <ModalHeader />
                <ModalBody>
                    <UserForm
                        initial={selectedUser}
                        onClose={() => {
                            setOpenModal(false);
                            dispatch(fetchUser({ tuKhoa: keyword, soTrang: page, soPhanTuTrenTrang: 10 }));
                        }}
                    />
                </ModalBody>
            </Modal>
        </div>
    );
}
