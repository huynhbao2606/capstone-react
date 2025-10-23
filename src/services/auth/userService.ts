import api from "@api/api";
import type { IUser } from "@/types/IUser";
import type {IUserParams} from "@/types/Params/IUserParams.ts";

export const userService = {
    getPaginatedUsers: (params: IUserParams) => {
        const queryObj: Record<string, string> = {
            MaNhom: params.maNhom || "GP01",
            soTrang: String(params.soTrang || 1),
            soPhanTuTrenTrang: String(params.soPhanTuTrenTrang || 10),
        };

        if (params.tuKhoa && params.tuKhoa.trim() !== "") {
            queryObj.tuKhoa = params.tuKhoa.trim();
        }

        const query = new URLSearchParams(queryObj).toString();

        return api.get(`/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?${query}`);
    },

    createUser: (data: IUser) => api.post("/QuanLyNguoiDung/ThemNguoiDung", data),
    updateUser: (data: IUser) => api.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data),
    deleteUser: (taiKhoan: string) => api.delete(`/QuanLyNguoiDung/XoaNguoiDung?taiKhoan=${taiKhoan}`),
    getRoleUser: () => api.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung")
};
