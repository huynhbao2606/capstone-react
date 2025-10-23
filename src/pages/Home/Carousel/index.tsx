import { Link } from "react-router-dom";

export default function Carousel() {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-sky-500/10 to-emerald-500/10">
            <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.25),transparent_60%)]" />
            <div className="relative mx-auto max-w-7xl px-6 py-14 text-white">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                    Đặt vé siêu nhanh. Lịch chiếu cập nhật liên tục.
                </h1>
                <p className="mt-3 text-white/80 max-w-2xl">
                    Chọn hệ thống rạp, xem suất chiếu theo ngày, giữ chỗ chỉ với 1 chạm.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/showtimes" className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold">
                        Đặt vé ngay
                    </Link>
                    <Link to="/showtimes" className="px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-sm">
                        Xem lịch chiếu
                    </Link>
                </div>

                <div className="mt-7 flex flex-wrap gap-6 text-sm text-white/70">
                    <span>Hơn 100+ rạp toàn quốc</span>
                    <span className="opacity-40">•</span>
                    <span>Cập nhật theo giờ</span>
                    <span className="opacity-40">•</span>
                    <span>Thanh toán an toàn</span>
                </div>
            </div>
        </section>
    );
}
