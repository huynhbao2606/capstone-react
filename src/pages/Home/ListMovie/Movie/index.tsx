import type { IMovie } from "@/types/IMovie";
import { Link } from "react-router-dom";

type Props = {
    movie: IMovie;
};

export default function Movie({ movie }: Props) {
    return (
        <div
            className="group bg-transparent rounded-lg
                 text-center p-2 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-[3px]
                 hover:shadow-xl hover:bg-white/5"
        >
            <div className="relative mx-auto w-full max-w-[200px] aspect-[3/4] overflow-hidden rounded-md">
                <img
                    src={movie.hinhAnh}
                    alt={movie.tenPhim}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />

                <div className="absolute top-1.5 left-1.5 flex gap-1">
                    {movie.sapChieu && (
                        <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-amber-500 text-white">
              Sắp chiếu
            </span>
                    )}
                    {movie.hot && (
                        <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-rose-500 text-white">
              HOT
            </span>
                    )}
                    {movie.dangChieu && (
                        <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-emerald-500 text-white">
              Đang chiếu
            </span>
                    )}
                </div>

                <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <h3 className="mt-3 text-white text-2xl font-semibold line-clamp-2 group-hover:text-emerald-300 transition-colors">
                {movie.tenPhim}
            </h3>

            <div className="mt-3 flex items-center justify-center">
                <Link
                    to={`/detail/${movie.maPhim}`}
                    className="w-24 text-center px-3 py-1.5 rounded-full border border-white/30 text-white text-xs
                     transition hover:border-emerald-400 hover:bg-emerald-500/10"
                >
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
}
