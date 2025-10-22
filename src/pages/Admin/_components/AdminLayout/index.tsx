import {Outlet} from "react-router";
import Header from "@pages/Admin/_components/Header";
import Sidebar from "@pages/Admin/_components/Sidebar";

export default function AdminLayout(){
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar/>

            <div className="flex flex-col flex-1">
                <Header />

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}