import axios, {type InternalAxiosRequestConfig} from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    let authorization: string | null = null;
    try {

        const isAdminRoute =
            typeof window !== "undefined" && location.pathname.startsWith("/admin");

        const rawInfo =
            localStorage.getItem(isAdminRoute ? "ADMIN_INFO" : "USER_INFO") ||
            localStorage.getItem("ADMIN_INFO") ||
            localStorage.getItem("USER_INFO");

        if (rawInfo) {
            const { accessToken } = JSON.parse(rawInfo);
            if (accessToken) {
                authorization = `Bearer ${accessToken}`;
            }
        }
    } catch (error) {
        console.error("Parse token failed:", error);
    }

    config.headers["Authorization"] = authorization;
    config.headers["TokenCybersoft"] = import.meta.env.VITE_TOKEN_CYBERSOFT;

    return config;
});

export default api;
