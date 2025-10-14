import {Outlet} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/redux/store.ts";
import {Navigate} from "react-router-dom";
import {actionLogout, tryAutoLogin} from "@/redux/slices/auth/slice.tsx";
import {useEffect} from "react";

export default function Admin(){
    const data = useSelector((state : RootState) => state.auth.data);
    const dispatch = useDispatch<AppDispatch>();
    if(!data){
        return <Navigate to="/auth" />
    }

    useEffect(()=>{
        dispatch(tryAutoLogin())
    },[dispatch])

    return(
        <>
            <button type="submit" className={"bg-red-500 text-white px-4 py-2 rounded"} onClick={() => { dispatch(actionLogout())}}>Logout</button>
            <h1>Admin</h1>
            <Outlet/>
        </>
    )
}