import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchMovies } from "@redux/slices/home/movieSlice";
import Loading from "@components/Loading";
import Movie from "@pages/Home/ListMovie/Movie";

export default function ListMovie() {
    const dispatch = useAppDispatch();
    const { data: movie, loading, error } = useAppSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies())

    }, [dispatch]);

    if (loading) return <Loading />;
    if (error) return <h1>Lỗi rồi</h1>;

    return (
        <>
            <div className="grid grid-cols-4 gap-6">
                {movie?.map((m) => (
                    <Movie key={m.maPhim} movie={m}  />
                ))}
            </div>
        </>

    );
}
