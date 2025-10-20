import api from '@api/api'
import type {IBookTickets} from "@/types/IBookTickets.ts";

export const ticketService = {
    getDanhSachPhongVe: (maLichChieu : number) => {
        return api.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    },

    postDatVe : (datVe : IBookTickets) => {
        return api.post('QuanLyDatVe/DatVe ', datVe );
    }
}