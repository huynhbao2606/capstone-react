import {useAppDispatch, useAppSelector} from "@redux/hooks.ts";
import {useEffect, useState} from "react";
import {fetchUser} from "@redux/slices/auth/userSlice.ts";
import UserList from "@pages/Admin/User/UserList";

export default function User(){
    const dispatch = useAppDispatch();
    const {data, loading } = useAppSelector((state ) => state.user.user);

    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");


    useEffect(()=>{
        dispatch(fetchUser({tuKhoa: keyword,soTrang: page,soPhanTuTrenTrang: 10}));
    },[dispatch,page,keyword])

    return (
        <UserList data={data} loading={loading} keyword={keyword} setKeyword={(e : any) =>setKeyword(e.target.value)} page={page} setPage={(p: any) => setPage(p)} />
    );
}