import api from "@api/api.ts";
import type {IProfile} from "@/types/IProfile.ts";

export const profileService = {
    getProfile: () => api.post("/QuanLyNguoiDung/ThongTinTaiKhoan"),
    updateProfile: (user : IProfile) => api.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", user),
}