import Link from 'next/link';
import { notFound } from 'next/navigation';

import MeetingDetail from '@/components/MeetingDetail';
import { deleteMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

interface MeetingPageProps {
    params: Promise<{ id: string }>;
}

export default async function MeetingPage({
    params,
}: MeetingPageProps) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId)) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return (
        <div>
            <div className="mb-6">
                <Link
                    href="/meetings"
                    className="text-sm font-medium text-blue-900 hover:underline"
                >
                    ← Back to all meetings
                </Link>
            </div>

            <MeetingDetail meeting={meeting} />

            <div className="mt-8 flex gap-3">
                <Link
                    href={`/meetings/${meeting.id}/edit`}
                    className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                >
                    Edit Meeting
                </Link>

                <form action={deleteMeeting.bind(null, meeting.id)}>
                    <button
                        type="submit"
                        className="rounded-md bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
                    >
                        Delete Meeting
                    </button>
                </form>
            </div>
        </div>
    );
}