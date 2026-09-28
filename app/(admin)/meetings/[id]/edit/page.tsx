interface EditMeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditMeetingPage({
    params,
}: EditMeetingPageProps) {
    const { id } = await params;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">
                Edit Meeting
            </h1>

            <p className="mt-2 text-gray-600">
                Meeting editing will be available here.
            </p>

            <p className="mt-4 text-sm text-gray-500">
                Meeting ID: {id}
            </p>
        </div>
    );
}