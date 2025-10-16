import type {IMovie} from "@types/IMovie.ts";
import {Link} from "react-router";

type Props = {
    movie : IMovie
}

export default function Movie({ movie }: Props){
    return (
        <>
            <div className="group bg-transparent p-3 text-center
                        hover:shadow-xl transition-all duration-300">

                <div className="relative mx-auto w-full max-w-[250px] aspect-[3/4] overflow-hidden rounded-sm">
                    <img
                        src={movie.hinhAnh}
                        alt={movie.tenPhim}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    <div className="absolute top-2 left-2 flex gap-1.5">
                        {movie.sapChieu && (
                            <span className="px-2 py-0.5 text-[11px] rounded-full bg-amber-500 text-white">Sắp chiếu</span>
                        )}
                        {movie.hot && (
                            <span className="px-2 py-0.5 text-[11px] rounded-full bg-rose-500 text-white">HOT</span>
                        )}
                        {movie.dangChieu && (
                            <span className="px-2 py-0.5 text-[11px] rounded-full bg-emerald-500 text-white">Đang chiếu</span>
                        )}
                    </div>


                    <div className="pointer-events-none absolute inset-0 bg-black/50 opacity-0
                        transition-opacity duration-300 group-hover:opacity-100" />
                </div>


                <h3 className="mt-4 text-white text-lg font-semibold line-clamp-2">{movie.tenPhim}</h3>

                <div className="mt-4 flex items-center justify-center gap-3">
                    <Link
                        to={`/detail/${movie.maPhim}`}
                        className="w-28 text-center px-4 py-2 rounded-full border border-white/30 text-white text-sm
                         transition hover:border-white/60 hover:bg-white/10"
                    >
                        Xem chi tiết
                    </Link>
                </div>

            </div>
        </>
    );

}