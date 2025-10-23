import api from "@api/api.ts";
import type {IRegister} from "@/types/IRegister.ts";

export const authService = {
    login: (user : {taiKhoan : string; matKhau: string}) =>
        api.post("/QuanLyNguoiDung/DangNhap",user),

    register: (register: IRegister) =>
        api.post("/QuanLyNguoiDung/DangKy", {maNhom: "GP01", ...register}),
}