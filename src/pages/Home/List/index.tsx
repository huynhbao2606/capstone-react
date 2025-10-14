import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchMovies } from "@redux/slices/home/movieSlice";
import Loading from "@components/Loading";
import Movie from "@pages/Home/List/Movie";

export default function ListMovie() {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    if (loading) return <Loading />;
    if (error) return <h1>Lỗi rồi</h1>;

    return (
        <>
            {data?.map((movie) => (
                <Movie key={movie.maPhim} movie={movie} />
            ))}
        </>
    );
}
