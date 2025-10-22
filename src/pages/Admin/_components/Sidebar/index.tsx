import { NavLink } from "react-router-dom";

const menu = [
    { name: "Users", path: "/admin/user" },
    { name: "Films", path: "/admin/film" },
    { name: "Showtime", path: "/admin/showtime" },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
            <div className="h-16 flex items-center justify-center border-b border-gray-700">
                <span className="text-xl font-bold text-orange-400 tracking-widest">CYBERSOFT</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 
              ${
                                isActive
                                    ? "bg-orange-500 text-white shadow-md"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`
                        }
                    >
                        <div className="flex items-center gap-2">
                            {item.name === "Users"}
                            {item.name === "Films"}
                            {item.name === "Cinema"}
                            <span>{item.name}</span>
                        </div>
                    </NavLink>
                ))}
            </nav>

            <div className="border-t border-gray-700 text-center py-3 text-xs text-gray-400">
                 Capstone
            </div>
        </aside>
    );
}
