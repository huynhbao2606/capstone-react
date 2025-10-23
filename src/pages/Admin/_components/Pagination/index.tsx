interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <nav aria-label="Pagination" className="flex justify-center mt-6">
            <ul className="inline-flex items-center -space-x-px text-sm select-none">
                {/* Prev */}
                <li>
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center px-3 h-10 leading-tight border rounded-s-lg transition-colors duration-150
          ${
                            currentPage === 1
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white text-gray-600 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                        }`}
                    >
                        <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                    </button>
                </li>

                {/* Page numbers */}
                {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                        <li key={page}>
                            <button
                                onClick={() => onPageChange(page)}
                                className={`flex items-center justify-center px-4 h-10 leading-tight border transition-colors duration-150 
              ${
                                    currentPage === page
                                        ? "bg-orange-500 text-white border-orange-500 font-semibold"
                                        : "bg-white text-gray-600 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                                }`}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}

                {/* Next */}
                <li>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center px-3 h-10 leading-tight border rounded-e-lg transition-colors duration-150
          ${
                            currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white text-gray-600 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                        }`}
                    >
                        <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
