import type { AxiosError } from "axios";

export interface Base<T> {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
}


