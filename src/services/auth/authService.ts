import type {IUser} from "@/types/IUser.ts";
import api from "@api/api.ts";
import type {IRegister} from "@/types/IRegister.ts";

export const authService = {
    login: (user : IUser) =>
        api.post("/QuanLyNguoiDung/DangNhap",user),

    register: (register: IRegister) =>
        api.post("/QuanLyNguoiDung/DangKy", {maNhom: "GP01", ...register}),
}