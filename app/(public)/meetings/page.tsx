import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import {
    getMeetings,
    getMeetingsTotalPages,
} from '@/lib/meetings-db';

interface MeetingsPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

export default async function MeetingsPage({
    searchParams,
}: MeetingsPageProps) {
    const params = await searchParams;

    const query = params.query ?? '';
    const currentPage = Number(params.page) || 1;

    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Sacrament Meetings
                </h1>

                <p className="mt-2 text-gray-600">
                    Browse current and past meeting programs.
                </p>
            </div>

            <MeetingSearch />

            {meetings.length === 0 ? (
                <p className="py-8 text-center text-gray-600">
                    No meetings found.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            )}

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </div>
    );
}