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
        <div className="space-y-6 text-white bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-xl shadow-xl border border-white/10">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <FontAwesomeIcon
                    icon={isEdit ? faPenToSquare : faPlus}
                    className="text-orange-400 text-lg"
                />
                <h2 className="text-xl font-semibold">
                    {isEdit ? "Cập nhật phim" : "Thêm phim mới"}
                </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                {[
                    { label: "Tên phim", name: "tenPhim", placeholder: "Nhập tên phim..." },
                    { label: "Trailer", name: "trailer", placeholder: "https://youtube.com/..." },
                ].map(({ label, name, placeholder }) => (
                    <div key={name}>
                        <label className="block text-sm text-gray-300 font-medium mb-1">
                            {label}
                        </label>
                        <input
                            name={name}
                            placeholder={placeholder}
                            value={(form as any)[name]}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 rounded-lg bg-white/10 text-sm border transition 
            ${errors[name] ? "border-red-400" : "border-gray-500"}
            focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none`}
                        />
                        {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
                    </div>
                ))}
            </div>

            <div>
                <label className="block text-sm text-gray-300 font-medium mb-1">Hình ảnh</label>
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
                            className="w-36 h-52 object-cover rounded-md shadow-md border border-gray-700"
                        />
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm text-gray-300 font-medium mb-1">Mô tả</label>
                <textarea
                    name="moTa"
                    value={form.moTa}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Nhập mô tả phim..."
                    className={`w-full px-3 py-2.5 rounded-lg bg-white/10 text-sm border transition 
        ${errors.moTa ? "border-red-400" : "border-gray-500"}
        focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none`}
                />
                {errors.moTa && <p className="text-red-400 text-xs mt-1">{errors.moTa}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">Ngày khởi chiếu</label>
                    <input
                        type="date"
                        name="ngayKhoiChieu"
                        value={form.ngayKhoiChieu}
                        onChange={handleChange}
                        className={`w-full px-3 py-2.5 rounded-lg bg-white/10 text-sm border transition 
          ${errors.ngayKhoiChieu ? "border-red-400" : "border-gray-500"}
          focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none`}
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-300 font-medium mb-1">Đánh giá (0 - 10)</label>
                    <input
                        type="number"
                        name="danhGia"
                        value={form.danhGia}
                        min={0}
                        max={10}
                        onChange={handleChange}
                        className={`w-full px-3 py-2.5 rounded-lg bg-white/10 text-sm border transition 
          ${errors.danhGia ? "border-red-400" : "border-gray-500"}
          focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none`}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
                {[
                    { key: "hot", label: "🔥 Phim Hot" },
                    { key: "dangChieu", label: "🎬 Đang Chiếu" },
                    { key: "sapChieu", label: "⏳ Sắp Chiếu" },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() =>
                            setForm((prev) => ({ ...prev, [key]: !(prev as any)[key] }))
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200
          ${
                            (form as any)[key]
                                ? "bg-orange-500 border-orange-500 text-white shadow-md"
                                : "bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400"
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="flex justify-end gap-3 pt-5 border-t border-gray-700 mt-5">
                <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
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
