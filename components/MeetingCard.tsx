import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
                <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
                    {meeting.meetingType} meeting
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                    {new Date(`${meeting.date}T00:00:00`).toLocaleDateString('en-NG', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </h2>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
                <p>
                    <strong>Presiding:</strong> {meeting.presiding}
                </p>
                <p>
                    <strong>Conducting:</strong> {meeting.conducting}
                </p>
            </div>

            <Link
                href={`/meetings/${meeting.id}`}
                className="mt-5 inline-block rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
                View Meeting
            </Link>
        </article>
    );
}