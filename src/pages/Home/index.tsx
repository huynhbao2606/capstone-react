import ListMovie from "@pages/Home/List";
import BannerCarousel from "@pages/Home/Banner";
import CinemaSection from "@pages/Home/Cinema";

export default function Home() {
    return (
        <>
            <div className="min-h-screen">
                <BannerCarousel />
                <section className="container mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-4">Phim đang chiếu</h2>
                    <ListMovie/>
                </section>
                <CinemaSection />
            </div>
        </>
    );
}
