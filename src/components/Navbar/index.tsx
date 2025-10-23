import { NavLink, Link, useNavigate } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {userLogout} from "@redux/slices/auth/userAuthSlice.ts";
import type {RootState} from "@redux/store.ts";
import type {IUser} from "@/types/IUser.ts";


function getInitials(name?: string, fallback = "U") {
    if (!name) return fallback;
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase() || fallback;
}

export default function Navbar() {
    const { scrollY } = useScroll();
    const last = useRef(0);
    const [hidden, setHidden] = useState(false);

    const user = useAppSelector((state: RootState) => state.userAuth.data);
    const isAuthed = Boolean(user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


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
                                <div className="text-white font-extrabold tracking-widest text-sm">CAPSTONE</div>
                                <div className="text-white/80 text-[10px] tracking-widest">CYBERSOFT</div>
                            </div>
                        </Link>


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
                                <NavLink
                                    to="/movies"
                                    className={({ isActive }) =>
                                        `px-5 py-3 text-base font-semibold transition ${
                                            isActive ? "text-yellow-500 hover:text-yellow-600" : "text-white/90 hover:text-white"
                                        }`
                                    }
                                >
                                    Phim
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/cinemas"
                                    className={({ isActive }) =>
                                        `px-5 py-3 text-base font-semibold transition ${
                                            isActive ? "text-yellow-500 hover:text-yellow-600" : "text-white/90 hover:text-white"
                                        }`
                                    }
                                >
                                    Rạp
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/showtimes"
                                    className={({ isActive }) =>
                                        `px-5 py-3 text-base font-semibold transition ${
                                            isActive ? "text-yellow-500 hover:text-yellow-600" : "text-white/90 hover:text-white"
                                        }`
                                    }
                                >
                                    Lịch Chiếu
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/promotions"
                                    className={({ isActive }) =>
                                        `px-5 py-3 text-base font-semibold transition ${
                                            isActive ? "text-yellow-500 hover:text-yellow-600" : "text-white/90 hover:text-white"
                                        }`
                                    }
                                >
                                    Ưu Đãi
                                </NavLink>
                            </li>
                        </ul>


                        <div className="flex items-center gap-3">

                            {!isAuthed ? (
                                <div className="flex items-center gap-2">
                                    <Link
                                        to="/login"
                                        className="px-3 py-2 rounded-lg border border-white/15 text-white/90 hover:text-white hover:border-white/30 transition"
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
                                    >
                                        Đăng ký
                                    </Link>
                                </div>
                            ) : (
                                <UserMenu
                                    user={user}
                                    name={(user?.hoTen || user?.taiKhoan) as string}
                                    initials={getInitials(user?.hoTen || user?.taiKhoan, "U")}
                                    onLogout={() => {
                                        dispatch(userLogout());
                                        navigate("/", { replace: true });
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </motion.header>
    );
}


function useClickOutside<T extends HTMLElement>(open: boolean, onClose: () => void) {
    const ref = useRef<T | null>(null);
    useEffect(() => {
        if (!open) return;
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        }
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("mousedown", handler);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);
    return ref;
}

function UserMenu({user, name, initials, onLogout,}: { user?: IUser | null;name: string; initials: string; onLogout: () => void }) {
    const [open, setOpen] = useState(false);
    const ref = useClickOutside<HTMLDivElement>(open, () => setOpen(false));

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((s) => !s)}
                className="flex items-center gap-2 group"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="user-menu"
            >
        <span
            className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold"
            aria-hidden
        >
          {initials}
        </span>
                <span className="hidden sm:block text-white/90 font-medium truncate max-w-[140px]">
          {name}
        </span>
                <svg
                    className="hidden sm:block w-4 h-4 text-white/70 group-hover:text-white transition"
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden
                >
                    <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                </svg>
            </button>

            <div
                id="user-menu"
                role="menu"
                tabIndex={-1}
                className={`
          absolute right-0 mt-2 w-56 rounded-xl border border-white/10
          bg-slate-900/95 backdrop-blur shadow-lg
          transition origin-top-right
          ${open ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"}
        `}
            >
                <div className="px-4 py-3 border-b border-white/10">
                    <div className="text-xs text-white/60">Đang đăng nhập</div>
                    <div className="font-semibold truncate">{name}</div>
                </div>

                <ul className="py-1 text-sm" aria-label="User actions">
                    <li role="none">
                        <Link role="menuitem" to="/profile" className="block px-4 py-2 hover:bg-white/10 focus:bg-white/10 focus:outline-none" onClick={() => setOpen(false)}>
                            Profile
                        </Link>
                    </li>
                    <li role="none">
                        <Link role="menuitem" to="/my-tickets" className="block px-4 py-2 hover:bg-white/10 focus:bg-white/10 focus:outline-none" onClick={() => setOpen(false)}>
                            Vé đã đặt
                        </Link>
                    </li>
                    {user?.maLoaiNguoiDung === "QuanTri" ? (
                        <li role="none">
                            <Link role="menuitem" to="/admin" className="block px-4 py-2 hover:bg-white/10 focus:bg-white/10 focus:outline-none" onClick={() => setOpen(false)}>
                                Admin
                            </Link>
                        </li>
                    ): null}
                </ul>

                <button
                    role="menuitem"
                    onClick={() => { setOpen(false); onLogout(); }}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 text-sm focus:outline-none"
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}