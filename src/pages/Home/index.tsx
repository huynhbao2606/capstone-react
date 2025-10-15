import ListMovie from "@pages/Home/List";
import BannerCarousel from "@/pages/Home/Banner";
import CinemaSection from "@/pages/Home/Cinema";
import "@/styles/background.css"

export default function Home() {
    return (
        <>
            <div className="min-h-screen">
                <BannerCarousel/>

                <section className="container mx-auto px-4 pt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Phim đang chiếu</h2>
                    </div>
                    <ListMovie />
                </section>

                <CinemaSection/>
            </div>
        </>

    );
}
