import { useAppDispatch } from "@redux/hooks";
import { useNavigate } from "react-router-dom";
import {actionLogout} from "@redux/slices/auth/adminAuthSlice.ts";

export default function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(actionLogout());
        navigate("/auth");
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <h1 className="font-semibold text-gray-700 text-lg">Admin Panel</h1>

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
