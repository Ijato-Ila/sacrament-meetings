import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
                Meeting Not Found
            </h1>

            <p className="mt-4 text-gray-600">
                We could not find the meeting you are trying to edit.
            </p>

            <Link
                href="/meetings"
                className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
                Back to Meetings
            </Link>
        </main>
    );
}