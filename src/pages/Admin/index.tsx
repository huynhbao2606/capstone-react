import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/redux/store.ts";
import {Navigate} from "react-router-dom";
import {tryAutoLogin} from "@redux/slices/auth/adminAuthSlice.ts";
import {useEffect} from "react";

export default function Admin(){
    const data = useSelector((state : RootState) => state.adminAuth.data);
    const dispatch = useDispatch<AppDispatch>();
    if(!data){
        return <Navigate to="/auth" />
    }

    useEffect(()=>{
        dispatch(tryAutoLogin())
    },[dispatch])

    return (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Thêm mới phim</h2>

            <form className="space-y-4 max-w-2xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tên phim</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Trailer</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    />
                </div>
            </form>
        </div>
    );
}