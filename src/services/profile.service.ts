import api from "@api/api.ts";

export const profileService = {
    getProfile: () => api.post("/QuanLyNguoiDung/ThongTinTaiKhoan")
}