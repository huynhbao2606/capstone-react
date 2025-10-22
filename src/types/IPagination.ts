export interface IPagination<T> {
    currentPage: number;
    totalCount: number;
    items: T[];
}
