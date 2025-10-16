import ListMovie from "@pages/Home/ListMovie";
import BannerCarousel from "@/pages/Home/Banner";
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
            </div>
        </>

    );
}
