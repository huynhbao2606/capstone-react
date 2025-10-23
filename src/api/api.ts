import axios, { type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: "/api",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
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
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
        }
    } catch (error) {
        console.error("⚠️ Parse token failed:", error);
    }

    config.headers["TokenCybersoft"] = import.meta.env.VITE_TOKEN_CYBERSOFT;

    if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error?.response?.data?.content ||
            error?.response?.data?.message ||
            error.message ||
            "Lỗi không xác định từ server";
        console.error("API Error:", message);
        return Promise.reject({ message });
    }
);

export default api;
