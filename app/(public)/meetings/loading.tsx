export default function Loading() {
    return (
        <div
            className="flex min-h-[300px] items-center justify-center"
            aria-label="Loading meetings"
        >
            <div className="text-center">
                <div
                    className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-900"
                    aria-hidden="true"
                />
                <p className="text-gray-600">Loading meeting programs...</p>
            </div>
        </div>
    );
}