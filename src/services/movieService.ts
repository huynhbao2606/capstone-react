import api from "@api/api";
import type {IMovieParams} from "@/types/Params/IMovieParams.ts";

export const movieService = {
    getPaginatedMovie: (params: IMovieParams) => {
        const queryObj: Record<string, string> = {
            maNhom: params.maNhom || "GP01",
            soTrang: String(params.soTrang || 1),
            soPhanTuTrenTrang: String(params.soPhanTuTrenTrang || 10),
        };

        if (params.tenPhim && params.tenPhim.trim() !== "") {
            queryObj.tenPhim = params.tenPhim.trim();
        }

        const query = new URLSearchParams(queryObj).toString();

        return api.get(`/QuanLyPhim/LayDanhSachPhimPhanTrang?${query}`);
    },


    getDetail: (maPhim: number) =>
        api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`),
};