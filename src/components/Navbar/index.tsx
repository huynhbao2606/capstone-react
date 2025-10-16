import { NavLink, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";


export default function Navbar() {
    const { scrollY } = useScroll();
    const last = useRef(0);
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (y) => {
        const curr = y ?? 0;
        if (curr > last.current && curr > 80) setHidden(true);
        else setHidden(false);
        last.current = curr;
    });

    return (
        <motion.header
            initial={false}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-x-0 top-0 z-40"
        >
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md pointer-events-none" />
            <nav className="relative pointer-events-auto">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex h-20 items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-11 h-11 rounded bg-white flex items-center justify-center">
                                <span className="text-slate-900 font-extrabold text-lg">C</span>
                            </div>
                            <div className="leading-4">
                                <div className="text-white font-extrabold tracking-widest text-sm">
                                    CAPSTONE
                                </div>
                                <div className="text-white/80 text-[10px] tracking-widest">
                                    CYBERSOFT
                                </div>
                            </div>
                        </Link>

                        {/* Menu */}
                        <ul className="hidden md:flex items-center gap-2">
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        `px-5 py-3 text-base font-semibold transition ${
                                            isActive ? "text-yellow-500 hover:text-yellow-600" : "text-white/90 hover:text-white"
                                        }`
                                    }
                                >
                                    Trang Chủ
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/movies" className={({ isActive }) =>
                                    `px-5 py-3 text-base font-semibold transition ${
                                        isActive ? "text-yellow-500 hover:text-yellow-600" : "text-white/90 hover:text-white"
                                    }`
                                }>
                                    Phim
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/cinemas" className={({ isActive }) =>
                                    `px-5 py-3 text-base font-semibold transition ${
                                        isActive ? "text-yellow-500 hover:text-yellow-600" : "text-white/90 hover:text-white"
                                    }`
                                }>
                                    Rạp
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/showtimes" className={({ isActive }) =>
                                    `px-5 py-3 text-base font-semibold transition ${
                                        isActive ? "text-yellow-500 hover:text-yellow-600" : "text-white/90 hover:text-white"
                                    }`
                                }>
                                    Lịch Chiếu
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/promotions" className={({ isActive }) =>
                                    `px-5 py-3 text-base font-semibold transition ${
                                        isActive ? "text-yellow-500 hover:text-yellow-600" : "text-white/90 hover:text-white"
                                    }`
                                }>
                                    Ưu Đãi
                                </NavLink>
                            </li>
                        </ul>


                        <div className="flex items-center gap-3">
                            <button
                                className="p-2 text-white/90 hover:text-white"
                                aria-label="Tìm kiếm"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="11" cy="11" r="7" strokeWidth="2" />
                                    <path d="M21 21l-3.5-3.5" strokeWidth="2" />
                                </svg>
                            </button>

                            <Link
                                to="/profile"
                                className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold hover:bg-orange-500 transition"
                            >
                                B
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </motion.header>
    );
}
