import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
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

    const meeting = getMeetingById(meetingId);

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
        </div>
    );
}