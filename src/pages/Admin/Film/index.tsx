import {useAppDispatch, useAppSelector} from "@redux/hooks.ts";
import {useEffect, useState} from "react";
import { fetchFilms} from "@redux/slices/auth/flimsSlice.ts";
import FilmsList from "@pages/Admin/Film/FilmsList";

export default function Film(){
    const dispatch = useAppDispatch();
    const {data, loading } = useAppSelector((state ) => state.film);

    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");

    useEffect(()=>{
        dispatch(fetchFilms({tenPhim: keyword,soTrang: page,soPhanTuTrenTrang: 10}));
    },[dispatch,page,keyword])

    return (
        <FilmsList data={data} loading={loading} keyword={keyword} setKeyword={(e : any) =>setKeyword(e.target.value)} page={page} setPage={(p: any) => setPage(p)} />
    )
}