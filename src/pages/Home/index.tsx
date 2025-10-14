import Footer from "@components/Footer";
import {Outlet} from "react-router";
import Navbar from "@components/Navbar";
import Banner from "@pages/Home/Banner";

export default function Home(){
    return (
        <>
            <Navbar/>
            <Banner/>
            <Outlet/>
            <Footer/>
        </>
    )
}