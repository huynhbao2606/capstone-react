interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({currentPage, totalPages, onPageChange}: PaginationProps) {
    if (totalPages <= 1) return null;

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <nav aria-label="Pagination" className="flex justify-center mt-8">
            <ul className="inline-flex items-center gap-1 text-sm select-none">
                <li>
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg border backdrop-blur-sm transition-all
              ${
                            currentPage === 1
                                ? "border-white/10 text-white/30 cursor-not-allowed bg-white/5"
                                : "border-white/20 text-white/80 hover:bg-orange-500/20 hover:border-orange-400 hover:text-orange-300"
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

                {Array.from({length: totalPages}).map((_, index) => {
                    const page = index + 1;
                    return (
                        <li key={page}>
                            <button
                                onClick={() => onPageChange(page)}
                                className={`w-10 h-10 rounded-lg border backdrop-blur-sm transition-all
                  ${
                                    currentPage === page
                                        ? "bg-orange-500/90 border-orange-400 text-white font-semibold shadow-md"
                                        : "border-white/20 text-white/70 hover:bg-orange-500/20 hover:border-orange-400 hover:text-orange-300"
                                }`}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}

                <li>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg border backdrop-blur-sm transition-all
              ${
                            currentPage === totalPages
                                ? "border-white/10 text-white/30 cursor-not-allowed bg-white/5"
                                : "border-white/20 text-white/80 hover:bg-orange-500/20 hover:border-orange-400 hover:text-orange-300"
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
