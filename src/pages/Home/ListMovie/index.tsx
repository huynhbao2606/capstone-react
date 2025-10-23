import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchMovies } from "@redux/slices/home/movieSlice";
import Loading from "@components/Loading";
import Movie from "@pages/Home/ListMovie/Movie";
import Pagination from "@components/Pagination";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default function ListMovie() {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((state) => state.movies);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchMovies({ tenPhim: search, soTrang: page, soPhanTuTrenTrang: 10 }));
    }, [dispatch, page, search]);



    if (loading) return <Loading />;
    if (error) return <h1 className="text-center text-red-500 py-10">Lỗi tải danh sách phim!</h1>;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="relative w-full sm:w-80">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm phim..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-white/10
                       text-sm text-white placeholder-gray-400
                       focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
                />
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {data?.items?.length ? (
                    data?.items.map((movie) => <Movie key={movie.maPhim} movie={movie} />)
                ) : (
                    <p className="col-span-full text-center text-white/70">Không tìm thấy phim nào</p>
                )}
            </div>

            <div className="mt-10 flex justify-center">
                <Pagination
                    currentPage={page}
                    totalPages={Math.ceil((data?.totalCount || 0) / 10)}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}
