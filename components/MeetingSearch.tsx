'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        params.set('page', '1');

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="mb-8">
            <label
                htmlFor="meeting-search"
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                Search meetings
            </label>

            <input
                id="meeting-search"
                type="search"
                defaultValue={searchParams.get('query') ?? ''}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search by speaker, presiding, conducting, or meeting type"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
        </div>
    );
}