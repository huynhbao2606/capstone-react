import api from "@api/api";
import type { IUser } from "@/types/IUser";
import type {IUserParams} from "@/types/IUserParams.ts";

export const userService = {
    getPaginatedUsers: (params: IUserParams) => {
        const query = new URLSearchParams({
            MaNhom: params.maNhom || "GP01",
            tuKhoa: params.tuKhoa || "",
            soTrang: String(params.soTrang || 1),
            soPhanTuTrenTrang: String(params.soPhanTuTrenTrang || 10),
        }).toString();

        return api.get(`/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?${query}`);
    },

    createUser: (data: IUser) => api.post("/QuanLyNguoiDung/ThemNguoiDung", data),
    updateUser: (data: IUser) => api.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data),
    deleteUser: (taiKhoan: string) =>
        api.delete(`/QuanLyNguoiDung/XoaNguoiDung?taiKhoan=${taiKhoan}`),
};
