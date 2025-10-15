import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import BackgroundFire from "@components/Background";


export default function MainLayout() {
    return (
        <>

            <div className="relative min-h-screen text-white overflow-x-hidden">
                <BackgroundFire />

                <div className="relative z-10 pt-25">
                    <Navbar />
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    );
}
