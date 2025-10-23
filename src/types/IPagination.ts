export interface IPagination<T> {
    currentPage: number;
    count: number;
    totalPages: number;
    totalCount : number;
    items?: T[];
}
