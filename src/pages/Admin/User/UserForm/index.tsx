import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import type { IUser } from "@/types/IUser";
import { addUser, fetchRoleUser, updateUser } from "@redux/slices/auth/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

type Props = {
    initial?: IUser | null;
    onClose: () => void;
};

export default function UserForm({ initial, onClose }: Props) {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.user.role);
    const isEdit = Boolean(initial);

    const [form, setForm] = useState<IUser>(
        initial || {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maLoaiNguoiDung: "",
            hoTen: "",
        }
    );



    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        dispatch(fetchRoleUser());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{9,11}$/;

        if (!form.taiKhoan.trim()) newErrors.taiKhoan = "Vui lòng nhập tài khoản";
        if (!form.matKhau.trim()) newErrors.matKhau = "Vui lòng nhập mật khẩu";
        if (!form.hoTen.trim()) newErrors.hoTen = "Vui lòng nhập họ tên";
        if (!emailRegex.test(form.email || "")) newErrors.email = "Email không hợp lệ";
        if (!phoneRegex.test(form.soDt || "")) newErrors.soDt = "Số điện thoại không hợp lệ";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            if (isEdit) await dispatch(updateUser(form)).unwrap();
            else await dispatch(addUser(form)).unwrap();

            await Swal.fire({
                icon: "success",
                title: isEdit ? "Cập nhật thành công!" : "Thêm người dùng thành công!",
                confirmButtonColor: "#22c55e",
                timer: 1500,
                showConfirmButton: false,
            });
            onClose();
        } catch (e: any) {
            await Swal.fire({
                icon: "error",
                title: "Thất bại",
                text: e?.message || "Lỗi server",
            });
        }
    };

    return (
        <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={isEdit ? faPenToSquare : faUserPlus} />
                {isEdit ? "Cập nhật người dùng" : "Thêm người dùng mới"}
            </h2>


            {["taiKhoan", "matKhau", "hoTen", "email", "soDt"].map((field) => (
                <div key={field}>
                    <label className="block text-sm text-gray-300 capitalize mb-1">
                        {field === "taiKhoan"
                            ? "Tài khoản"
                            : field === "matKhau"
                                ? "Mật khẩu"
                                : field === "hoTen"
                                    ? "Họ tên"
                                    : field === "soDt"
                                        ? "Số điện thoại"
                                        : "Email"}
                    </label>

                    <input
                        type={field === "matKhau" ? "password" : "text"}
                        name={field}
                        value={(form as any)[field] || ""}
                        onChange={handleChange}
                        disabled={isEdit && field === "taiKhoan"}
                        className={`w-full px-3 py-2 border text-sm rounded-lg bg-white/10 text-white placeholder-gray-400
              focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all
              ${errors[field] ? "border-red-400" : "border-gray-500"}`}
                    />
                    {errors[field] && (
                        <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
                    )}
                </div>
            ))}
            <div>
                <label className="block text-sm text-gray-300 mb-1">Loại người dùng</label>
                <select
                    name="maLoaiNguoiDung"
                    value={form.maLoaiNguoiDung}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-500 bg-white/10 text-white rounded-lg text-sm
            focus:ring-2 focus:ring-orange-400 focus:border-orange-400 cursor-pointer transition-all"
                >
                    {data?.length ? (
                        <>
                            <option value="">-- Chọn loại người dùng --</option>
                            {data.map((item) => (
                                <option
                                    key={item.maLoaiNguoiDung}
                                    value={item.maLoaiNguoiDung}
                                    className="text-gray-900"
                                >
                                    {item.tenLoai}
                                </option>
                            ))}
                        </>
                    ) : (
                        <option value="">Không có dữ liệu</option>
                    )}
                </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-600 mt-4">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-gray-400 text-gray-300 hover:bg-gray-700 transition"
                >
                    Hủy
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                    {isEdit ? "Cập nhật" : "Thêm mới"}
                </button>
            </div>
        </div>
    );
}
