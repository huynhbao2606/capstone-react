import type {Movie} from "@/types/Movie.ts";
import {Link} from "react-router";

type Props = {
    movie : Movie
}

export default function Movie({ movie }: Props){
    return (
        <Link key={movie.maPhim}
              to={`/detail/${movie.maPhim}`}>
            <div className="max-w-sm rounded-lg border shadow-md overflow-hidden">
                <img
                    src={movie.hinhAnh}
                    alt={movie.tenPhim}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{movie.tenPhim}</h2>
                    <p className="text-sm text-gray-600 mb-2">{movie.moTa}</p>
                    <p className="text-sm">Ngày khởi chiếu: {movie.ngayKhoiChieu}</p>
                    <p className="text-sm">Đánh giá: ⭐ {movie.danhGia}</p>

                    <div className="flex gap-2 mt-2">
                        {movie.dangChieu && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                  Đang chiếu
                </span>
                        )}
                        {movie.sapChieu && (
                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  Sắp chiếu
                </span>
                        )}
                        {movie.hot && (
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                  HOT
                </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}