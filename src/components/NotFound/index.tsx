import "@styles/notfound.css"
import {NavLink} from "react-router-dom";
export default function NotFound() {
    return (
        <>
            <header className="top-header">
            </header>

            <div>
                <div className="starsec"></div>
                <div className="starthird"></div>
                <div className="starfourth"></div>
                <div className="starfifth"></div>
            </div>


            <div className="lamp__wrap">
                <div className="lamp">
                    <div className="cable"></div>
                    <div className="cover"></div>
                    <div className="in-cover">
                        <div className="bulb"></div>
                    </div>
                    <div className="light"></div>
                </div>
            </div>
            <section className="error">
                <div className="error__content">
                    <div className="error__message message">
                        <h1 className="message__title">Không Tìm Thấy Trang</h1>
                        <p className="message__text">Rất tiếc, trang bạn đang tìm kiếm không có ở đây.
                            Liên kết bạn đang theo dõi có thể đã bị hỏng hoặc không còn tồn tại. Vui lòng thử lại hoặc quay lại trang chủ.</p>
                    </div>
                    <div className="error__nav e-nav">
                        <NavLink to="/" target="_blanck" className="e-nav__link"></NavLink>
                    </div>
                </div>

            </section>

        </>
    );
}