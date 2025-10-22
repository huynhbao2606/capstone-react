export interface IProfile {
    taiKhoan?: string
    matKhau: string
    hoTen: string
    email: string
    soDT: string
    maNhom?: string
    maLoaiNguoiDung?: string
    loaiNguoiDung?: ILoaiNguoiDung
    thongTinDatVe?: IThongTinDatVe[]
}

export interface ILoaiNguoiDung {
    maLoaiNguoiDung: string
    tenLoai: string
}

export interface IThongTinDatVe {
    danhSachGhe: IDanhSachGhe[]
    maVe: number
    ngayDat: string
    tenPhim: string
    hinhAnh: string
    giaVe: number
    thoiLuongPhim: number
}

export interface IDanhSachGhe {
    maHeThongRap: string
    tenHeThongRap: string
    maCumRap: string
    tenCumRap: string
    maRap: number
    tenRap: string
    maGhe: number
    tenGhe: string
}