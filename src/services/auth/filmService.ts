import api from "@api/api.ts";
import type {IFilmParams} from "@/types/Params/IFilmParams.ts";

export const filmService = {
    getPaginatedFilms: (params: IFilmParams) => {
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

    createFilms: (data: FormData) =>
         api.post("/QuanLyPhim/ThemPhimUploadHinh", data,),

    updateFilms: (data: FormData) =>
        api.post("/QuanLyPhim/CapNhatPhimUpload", data, {}),

    deleteFilms: (maPhim: number) => api.delete(`/QuanLyPhim/XoaPhim?maPhim=${maPhim}`),
}