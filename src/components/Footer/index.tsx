import { Link } from "react-router-dom";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-16 border-t border-white/10 bg-[#0b1220] text-white">
            <div className="pointer-events-none absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    <div className="md:col-span-1">
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

                        <p className="mt-3 text-sm text-white/70 max-w-xs">
                            Đặt vé nhanh chóng, lịch chiếu cập nhật theo hệ thống rạp trên toàn quốc.
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
                            >
                                {/* Facebook */}
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                    <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 4.99 3.66 9.14 8.44 9.94v-7.02H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.92h-2.34V22c4.78-.8 8.44-4.95 8.44-9.94z" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
                            >
                                {/* GitHub */}
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.03-.02-2.02-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.74.08-.73.08-.73 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.3 1.2-3.12-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.19.93-.26 1.92-.39 2.9-.39.99 0 1.98.13 2.91.39 2.22-1.5 3.2-1.19 3.2-1.19.63 1.58.23 2.75.11 3.04.75.82 1.2 1.86 1.2 3.12 0 4.44-2.7 5.41-5.28 5.7.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.22 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                    <path d="M18.244 2H21l-6.54 7.47L22 22h-6.91l-4.54-5.87L4.5 22H2l7.14-8.16L2 2h6.91l4.2 5.43L18.244 2Zm-2.421 18h1.86L8.33 4H6.47l9.353 16Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                            Khám phá
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-white/70">
                            <li><Link to="/lich-chieu" className="hover:text-white transition">Lịch chiếu</Link></li>
                            <li><Link to="/he-thong-rap" className="hover:text-white transition">Hệ thống rạp</Link></li>
                            <li><Link to="/uu-dai" className="hover:text-white transition">Ưu đãi</Link></li>
                            <li><Link to="/tin-tuc" className="hover:text-white transition">Tin tức</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                            Hỗ trợ
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-white/70">
                            <li><Link to="/ho-tro/dat-ve" className="hover:text-white transition">Hướng dẫn đặt vé</Link></li>
                            <li><Link to="/ho-tro/thanh-toan" className="hover:text-white transition">Phương thức thanh toán</Link></li>
                            <li><Link to="/lien-he" className="hover:text-white transition">Liên hệ</Link></li>
                            <li><Link to="/faq" className="hover:text-white transition">Câu hỏi thường gặp</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                            Pháp lý
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-white/70">
                            <li><Link to="/privacy" className="hover:text-white transition">Chính sách bảo mật</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition">Điều khoản sử dụng</Link></li>
                            <li><Link to="/cookies" className="hover:text-white transition">Cookies</Link></li>
                            <li><Link to="/bao-mat-thanh-toan" className="hover:text-white transition">Bảo mật thanh toán</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="my-8 h-px w-full bg-white/10" />

                <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-white/60">
                        © {year} <span className="font-medium text-white">HuynhBao</span>. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-white/70">
                        <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
                        <span className="text-white/30">•</span>
                        <Link to="/terms" className="hover:text-white transition">Terms</Link>
                        <span className="text-white/30">•</span>
                        <Link to="/contact" className="hover:text-white transition">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
