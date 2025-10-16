import api from '@api/api'

export const ticketService = {
    getDanhSachPhongVe: (maLichChieu : number) => {
        return api.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }
}