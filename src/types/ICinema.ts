import type {MovieDetail} from "@types/IMovie.ts";

export interface HeThongRap {
    maHeThongRap: string;
    tenHeThongRap: string;
    biDanh: string;
    logo: string;
}


export interface ICinema {
    maRap: number | string;
    tenRap: string;
}

export interface CumRap {
    maCumRap: string;
    tenCumRap: string;
    diaChi: string;
    hinhAnh?: string;
    danhSachRap?: ICinema[];
}

export interface LichChieuPhim {
    maLichChieu: number | string;
    maRap: string;
    tenRap: string;
    ngayChieuGioChieu: string;
    giaVe: number;
    thoiLuong: number;
}


export interface CumRapChieu {
    maCumRap: string;
    tenCumRap: string;
    diaChi: string;
    hinhAnh?: string;
    lichChieuPhim: LichChieuPhim[];
}


export interface HeThongRapChieu {
    maHeThongRap: string;
    tenHeThongRap: string;
    logo: string;
    cumRapChieu: CumRapChieu[];
}


export interface LichChieuTheoPhim extends MovieDetail {
    heThongRapChieu: HeThongRapChieu[];
}


export interface LichChieuHeThongRap {
    maHeThongRap: string;
    tenHeThongRap: string;
    logo: string;
    maNhom: string;
    lstCumRap: {
        maCumRap: string;
        tenCumRap: string;
        diaChi: string;
        hinhAnh: string;
        danhSachPhim: {
            maPhim: number;
            tenPhim: string;
            hinhAnh: string;
            hot: boolean;
            dangChieu: boolean;
            sapChieu: boolean;
            lstLichChieuTheoPhim: {
                maLichChieu: number;
                maRap: string;
                tenRap: string;
                ngayChieuGioChieu: string;
                giaVe: number;
            }[];
        }[];
    }[];
}
