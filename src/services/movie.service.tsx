import api from "@api/api";

export const movieService = {
    getMovies: (maNhom = "GP01") =>
        api.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`),

    getBanner: () => api.get("/QuanLyPhim/LayDanhSachBanner"),

    getDetail: (maPhim: number) =>
        api.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`),
};