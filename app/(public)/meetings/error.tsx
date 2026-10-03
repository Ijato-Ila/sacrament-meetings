'use client';

import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="mx-auto max-w-2xl px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
                Something went wrong
            </h1>

            <p className="mt-4 text-gray-600">
                We could not load the meetings. Please try again.
            </p>

            <div className="mt-6 flex justify-center gap-3">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                >
                    Try Again
                </button>

                <Link
                    href="/meetings"
                    className="rounded-md border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-50"
                >
                    Back to Meetings
                </Link>
            </div>

            <p className="sr-only">{error.message}</p>
        </main>
    );
}