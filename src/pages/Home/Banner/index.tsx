import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@redux/store";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination"
// @ts-ignore
import 'swiper/css/navigation';

import {fetchBanners} from "@redux/slices/home/bannerSlice.ts";

export default function BannerCarousel() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((s: RootState) => s.banner);

    useEffect(() => { dispatch(fetchBanners()); }, [dispatch]);

    if (loading) return <div className="p-6 text-center">Đang tải banner…</div>;
    if (error) return <div className="p-6 text-red-600">"Loi Roi</div>;
    if (!data?.length) return null;

    return (
        <div className="container mx-auto px-0 md:px-4 py-4">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                loop
                className="rounded-xl shadow-lg"
            >
                {data.map(b => (
                    <SwiperSlide key={b.maBanner}>
                        <Link to={`/detail/${b.maPhim}`} aria-label={`Xem phim ${b.maPhim}`}>
                            <img
                                src={b.hinhAnh}
                                alt={`Banner ${b.maPhim}`}
                                loading="lazy"
                                className="w-full h-[220px] md:h-[420px] object-cover rounded-xl"
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
