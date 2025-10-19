import type {IMovieDetail} from "@/types/IMovie.ts";

export interface IHeThongRap {
    maHeThongRap: string;
    tenHeThongRap: string;
    biDanh: string;
    logo: string;
}


export interface ICinema {
    maRap: number | string;
    tenRap: string;
}

export interface ICumRap {
    maCumRap: string;
    tenCumRap: string;
    diaChi: string;
    hinhAnh?: string;
    danhSachRap?: ICinema[];
}

export interface ILichChieuPhim {
    maLichChieu: number | string;
    maRap: string;
    tenRap: string;
    ngayChieuGioChieu: string;
    giaVe: number;
    thoiLuong: number;
}


export interface ICumRapChieu {
    maCumRap: string;
    tenCumRap: string;
    diaChi: string;
    hinhAnh?: string;
    lichChieuPhim: ILichChieuPhim[];
}


export interface IHeThongRapChieu {
    maHeThongRap: string;
    tenHeThongRap: string;
    logo: string;
    cumRapChieu: ICumRapChieu[];
}


export interface ILichChieuTheoPhim extends IMovieDetail {
    heThongRapChieu: IHeThongRapChieu[];
}


export interface ILichChieuHeThongRap {
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
