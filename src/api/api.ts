import axios, {type InternalAxiosRequestConfig} from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    let authorization: string | null = null;
    try {
        const adminInfo = localStorage.getItem("ADMIN_INFO");
        if (adminInfo) {
            const { accessToken } = JSON.parse(adminInfo);
            if (accessToken) {
                authorization = `Bearer ${accessToken}`;
            }
        }
    } catch (error) {
        console.error("Parse ADMIN_INFO failed:", error);
    }



    config.headers["Authorization"] = authorization;
    config.headers["TokenCybersoft"] = import.meta.env.VITE_TOKEN_CYBERSOFT;

    return config;
});

export default api;
