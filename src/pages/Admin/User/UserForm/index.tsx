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
        <div className="space-y-6 text-white bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg border border-white/10">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <FontAwesomeIcon
                    icon={isEdit ? faPenToSquare : faUserPlus}
                    className="text-orange-400 text-lg"
                />
                <h2 className="text-xl font-semibold">
                    {isEdit ? "Cập nhật người dùng" : "Thêm người dùng mới"}
                </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                {[
                    { name: "taiKhoan", label: "Tài khoản", type: "text" },
                    { name: "matKhau", label: "Mật khẩu", type: "password" },
                    { name: "hoTen", label: "Họ và tên", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "soDt", label: "Số điện thoại", type: "text" },
                ].map((field) => (
                    <div key={field.name} className="col-span-1">
                        <label className="block text-sm text-gray-300 mb-1 font-medium">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={(form as any)[field.name] || ""}
                            onChange={handleChange}
                            disabled={isEdit && field.name === "taiKhoan"}
                            className={`w-full px-3 py-2.5 rounded-lg text-sm bg-white/10 text-white placeholder-gray-400
            focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition
            ${errors[field.name] ? "border-red-400" : "border-gray-500"} border`}
                        />
                        {errors[field.name] && (
                            <p className="text-red-400 text-xs mt-1">{errors[field.name]}</p>
                        )}
                    </div>
                ))}
            </div>

            <div>
                <label className="block text-sm text-gray-300 mb-1 font-medium">
                    Loại người dùng
                </label>
                <div className="relative">
                    <select
                        name="maLoaiNguoiDung"
                        value={form.maLoaiNguoiDung}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/10 text-white border border-gray-500
          focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none cursor-pointer"
                    >
                        {data?.length ? (
                            <>
                                <option value="" className="bg-slate-800 text-gray-400">
                                    -- Chọn loại người dùng --
                                </option>
                                {data.map((item) => (
                                    <option
                                        key={item.maLoaiNguoiDung}
                                        value={item.maLoaiNguoiDung}
                                        className="bg-slate-900 text-gray-100"
                                    >
                                        👤 {item.tenLoai}
                                    </option>
                                ))}
                            </>
                        ) : (
                            <option value="">Không có dữ liệu</option>
                        )}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ▼
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700 mt-4">
                <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400 transition"
                >
                    Hủy
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-sm transition"
                >
                    {isEdit ? "Cập nhật" : "Thêm mới"}
                </button>
            </div>
        </div>

    );
}
