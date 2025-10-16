import ListMovie from "@pages/Home/ListMovie";
import BannerCarousel from "@/pages/Home/Banner";
import "@/styles/background.css"

export default function Home() {
    return (
        <>
            <div className="min-h-screen">
                <div className={"mx-auto max-w-7xl"}>
                    <BannerCarousel/>
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
