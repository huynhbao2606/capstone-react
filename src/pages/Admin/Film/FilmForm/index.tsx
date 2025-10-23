import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAppDispatch } from "@redux/hooks";
import { addFilm, updateFlim } from "@redux/slices/auth/flimsSlice";
import type { IFilm } from "@/types/IFilm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

type Props = {
    initial?: IFilm | null;
    onClose: () => void;
};

export default function FilmForm({ initial, onClose }: Props) {
    const dispatch = useAppDispatch();
    const isEdit = Boolean(initial);

    const [form, setForm] = useState<IFilm>(
        initial || {
            maPhim: 0,
            tenPhim: "",
            biDanh: "",
            trailer: "",
            hinhAnh: "",
            moTa: "",
            ngayKhoiChieu: "",
            danhGia: 0,
            hot: false,
            dangChieu: false,
            sapChieu: false,
        }
    );

    const [file, setFile] = useState<File | null>();
    const [preview, setPreview] = useState<string | null>(initial?.hinhAnh || null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else if (initial?.hinhAnh) {
            setPreview(initial.hinhAnh);
        } else {
            setPreview(null);
        }
    }, [file, initial]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) setFile(selected);
    };


    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.tenPhim.trim()) newErrors.tenPhim = "Vui lòng nhập tên phim";
        if (!form.trailer.trim()) newErrors.trailer = "Vui lòng nhập link trailer";
        if (!form.moTa.trim()) newErrors.moTa = "Vui lòng nhập mô tả phim";
        if (!form.ngayKhoiChieu) newErrors.ngayKhoiChieu = "Chọn ngày khởi chiếu";
        if (form.danhGia < 0 || form.danhGia > 10)
            newErrors.danhGia = "Điểm đánh giá phải từ 0 - 10";
        if (!file && !isEdit) newErrors.hinhAnh = "Vui lòng chọn hình ảnh phim";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (e :React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append("tenPhim", form.tenPhim);
        formData.append("biDanh", form.tenPhim);
        formData.append("trailer", form.trailer);
        formData.append("moTa", form.moTa);
        formData.append("ngayKhoiChieu", formatDate(form.ngayKhoiChieu));
        formData.append("dangChieu", String(form.dangChieu));
        formData.append("sapChieu", String(form.sapChieu));
        formData.append("hot", String(form.hot));
        formData.append("danhGia", String(form.danhGia));
        formData.append("maNhom", "GP01");

        if (file) {
            formData.append("hinhAnh", file, file.name);
       }

        if (isEdit) {
            formData.append("maPhim", String(form.maPhim));
        }

        try {
            if (isEdit) await dispatch(updateFlim(formData)).unwrap();
            else await dispatch(addFilm(formData)).unwrap();

            await Swal.fire({
                icon: "success",
                title: isEdit ? "Cập nhật thành công!" : "Thêm phim thành công!",
                confirmButtonColor: "#22c55e",
                timer: 1500,
                showConfirmButton: false,
            });

            onClose();
        } catch (err: any) {
            await Swal.fire({
                icon: "error",
                title: "Thất bại!",
                text: err?.message || "Không thể gửi dữ liệu.",
            });
        }
    };

    return (
        <div className="space-y-4 text-white">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={isEdit ? faPenToSquare : faPlus} />
                {isEdit ? "Cập nhật phim" : "Thêm phim mới"}
            </h2>

            {[
                { label: "Tên phim", name: "tenPhim" },
                { label: "Trailer", name: "trailer" },
            ].map(({ label, name }) => (
                <div key={name}>
                    <label className="block text-sm text-gray-300 mb-1">{label}</label>
                    <input
                        name={name}
                        value={(form as any)[name]}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg bg-white/10 text-sm border ${
                            errors[name] ? "border-red-400" : "border-gray-500"
                        } focus:ring-2 focus:ring-orange-400 outline-none`}
                    />
                    {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
                </div>
            ))}

            <div>
                <label className="block text-sm text-gray-300 mb-1">Hình ảnh</label>
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-300
            file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0
            file:text-sm file:font-semibold file:bg-orange-500 file:text-white
            hover:file:bg-orange-600 cursor-pointer"
                />
                {errors.hinhAnh && <p className="text-red-400 text-xs mt-1">{errors.hinhAnh}</p>}

                {preview && (
                    <div className="mt-3">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-48 object-cover rounded-md shadow-md border border-gray-600"
                        />
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm text-gray-300 mb-1">Mô tả</label>
                <textarea
                    name="moTa"
                    value={form.moTa}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 rounded-lg bg-white/10 text-sm border ${
                        errors.moTa ? "border-red-400" : "border-gray-500"
                    } focus:ring-2 focus:ring-orange-400 outline-none`}
                />
                {errors.moTa && <p className="text-red-400 text-xs mt-1">{errors.moTa}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-300 mb-1">Ngày khởi chiếu</label>
                    <input
                        type="date"
                        name="ngayKhoiChieu"
                        value={form.ngayKhoiChieu}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg bg-white/10 text-sm border ${
                            errors.ngayKhoiChieu ? "border-red-400" : "border-gray-500"
                        } focus:ring-2 focus:ring-orange-400 outline-none`}
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-300 mb-1">Đánh giá (0-10)</label>
                    <input
                        type="number"
                        name="danhGia"
                        value={form.danhGia}
                        onChange={handleChange}
                        min={0}
                        max={10}
                        className={`w-full px-3 py-2 rounded-lg bg-white/10 text-sm border ${
                            errors.danhGia ? "border-red-400" : "border-gray-500"
                        } focus:ring-2 focus:ring-orange-400 outline-none`}
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-3 flex-wrap">
                {[
                    { key: "hot", label: "Phim Hot" },
                    { key: "dangChieu", label: "Đang Chiếu" },
                    { key: "sapChieu", label: "Sắp Chiếu" },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() =>
                            setForm((prev) => ({ ...prev, [key]: !(prev as any)[key] }))
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition 
                border ${
                            (form as any)[key]
                                ? "bg-orange-500 border-orange-500 text-white"
                                : "bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>


            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700 mt-4">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
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
