'use client';

import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    const date = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
        'en-NG',
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    );

    return (
        <article className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-sm print:shadow-none">
            <header className="border-b border-gray-200 pb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                    {meeting.meetingType} meeting
                </p>

                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                    Sacrament Meeting
                </h1>

                <p className="mt-2 text-gray-600">{date}</p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <p>
                        <strong>Presiding:</strong> {meeting.presiding}
                    </p>
                    <p>
                        <strong>Conducting:</strong> {meeting.conducting}
                    </p>
                </div>
            </header>

            {meeting.announcements && meeting.announcements.length > 0 && (
                <section className="border-b border-gray-200 py-6">
                    <h2 className="text-xl font-bold text-gray-900">Announcements</h2>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
                        {meeting.announcements.map((announcement) => (
                            <li key={announcement}>{announcement}</li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="border-b border-gray-200 py-6">
                <h2 className="text-xl font-bold text-gray-900">Opening</h2>

                <div className="mt-4 space-y-3 text-gray-700">
                    <p>
                        <strong>Opening Hymn:</strong> Hymn {meeting.openingHymn.number} —{' '}
                        {meeting.openingHymn.title}
                    </p>

                    <p>
                        <strong>Opening Prayer:</strong> {meeting.openingPrayer}
                    </p>
                </div>
            </section>

            <section className="border-b border-gray-200 py-6">
                <h2 className="text-xl font-bold text-gray-900">Ward Business</h2>

                {meeting.wardBusiness.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                        {meeting.wardBusiness.map((item) => (
                            <li key={item.description}>{item.description}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-3 text-gray-600">No ward business.</p>
                )}

                <p className="mt-4 text-gray-700">
                    <strong>Stake Business:</strong>{' '}
                    {meeting.stakeBusiness ? 'Yes' : 'No'}
                </p>
            </section>

            <section className="border-b border-gray-200 py-6">
                <h2 className="text-xl font-bold text-gray-900">
                    Sacrament and Program
                </h2>

                <p className="mt-4 text-gray-700">
                    <strong>Sacrament Hymn:</strong> Hymn{' '}
                    {meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
                </p>

                <div className="mt-6">
                    <h3 className="font-semibold text-gray-900">Speakers and Music</h3>

                    <ul className="mt-3 space-y-4">
                        {meeting.speakers.map((item) => (
                            <li
                                key={`${item.name}-${item.topic}`}
                                className="rounded-lg bg-gray-50 p-4"
                            >
                                <p className="font-semibold text-gray-900">
                                    {item.name}
                                </p>
                                <p className="text-sm capitalize text-blue-700">
                                    {item.type.replace('-', ' ')}
                                </p>

                                {item.topic && (
                                    <p className="mt-1 text-gray-700">
                                        {item.topic}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-6">
                <h2 className="text-xl font-bold text-gray-900">Closing</h2>

                <div className="mt-4 space-y-3 text-gray-700">
                    <p>
                        <strong>Closing Hymn:</strong> Hymn {meeting.closingHymn.number} —{' '}
                        {meeting.closingHymn.title}
                    </p>

                    <p>
                        <strong>Closing Prayer:</strong> {meeting.closingPrayer}
                    </p>
                </div>
            </section>

            <div className="mt-6 print:hidden">
                <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-md bg-blue-900 px-5 py-2.5 font-medium text-white hover:bg-blue-800"
                >
                    Print Program
                </button>
            </div>
        </article>
    );
}