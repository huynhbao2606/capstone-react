import api from "@api/api";

export const cinemaService = {
    getHeThongRap: (maNhom: string = "GP01") => {
        return api.get(`/QuanLyRap/LayThongTinHeThongRap?maNhom=${maNhom}`);
    },

    getLichChieuPhim: (maPhim: number) => {
        return api.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
    },

    getLichChieuHeThong: (maNhom: string = "GP01") => {
        return api.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`);
    },

    getCumRapTheoHeThong: (maHeThongRap: string) => {
        return api.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    },
};
