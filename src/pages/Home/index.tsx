import ListMovie from "@pages/Home/ListMovie";
import Carousel from "@pages/Home/Carousel";
import "@/styles/background.css"
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@redux/store.ts";
import {userAutoLogin} from "@redux/slices/auth/userAuthSlice.ts";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(userAutoLogin())
    },[dispatch])
    return (
        <>
            <div className="min-h-screen">
                <div className={"mx-auto max-w-7xl"}>
                    <Carousel/>
                </div>


                <section className="container mx-auto px-4 pt-8">
                    <div className="flex items-center justify-between mb-4">
                    </div>
                    <div className={"mx-auto max-w-6xl"}>
                        <h2 className="text-2xl font-bold px-5">Danh Sách Phim</h2>
                        <ListMovie />
                    </div>
                </section>
            </div>
        </>

    );
}
