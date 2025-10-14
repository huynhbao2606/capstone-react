import type { AxiosError } from "axios";

export type Base<T> = {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
}


