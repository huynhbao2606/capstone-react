import { useAppDispatch } from "@redux/hooks";
import {Link, useNavigate} from "react-router-dom";
import {actionLogout} from "@redux/slices/auth/adminAuthSlice.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(actionLogout());
        navigate("/auth");
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-gray-700 text-lg">Admin Panel</h1>

                <Link
                    to="/"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-gray-300
                        text-gray-600 hover:bg-gray-100 transition"
                >
                    <FontAwesomeIcon icon={faHouse} className="text-orange-500" />
                    Trang chủ
                </Link>
            </div>

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full font-semibold">
                    A
                </div>
                <button
                    onClick={handleLogout}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                    Đăng xuất
                </button>
            </div>
        </header>
    );
}
