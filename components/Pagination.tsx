'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({
    totalPages,
    currentPage,
}: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function goToPage(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());

        replace(`${pathname}?${params.toString()}`);
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            className="mt-8 flex items-center justify-center gap-2"
            aria-label="Pagination"
        >
            <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="rounded border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>

            <span className="px-4 py-2 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
            </span>

            <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="rounded border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </nav>
    );
}