import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

async function getMeetings(): Promise<SacramentMeeting[]> {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/meetings`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch meetings');
    }

    return response.json() as Promise<SacramentMeeting[]>;
}

export default async function MeetingsPage() {
    const meetings = await getMeetings();

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

            <div className="grid gap-6 md:grid-cols-2">
                {meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
            </div>
        </div>
    );
}