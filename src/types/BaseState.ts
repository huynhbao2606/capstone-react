import type {Base} from "@/types/Base.ts";

export const createBaseState = <T>(): Base<T> => ({
    data: null,
    loading: false,
    error: null,
});