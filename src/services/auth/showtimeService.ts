import api from "@api/api.ts";

export const showtimeService = {
    getCinema: () => api.get("/QuanLyRap/LayThongTinHeThongRap"),

    getCinemaClusters: (maHeThongRap: string) =>
        api.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`),


    createShowtime: (data: {
        maPhim: number;
        ngayChieuGioChieu: string;
        maRap: string;
        giaVe: number;
    }) => api.post("/QuanLyDatVe/TaoLichChieu", data),
};
