import Link from 'next/link';

export default function MeetingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="mx-auto max-w-6xl">
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Meeting Programs
                        </h1>
                        <p className="text-sm text-gray-600">
                            View current and past sacrament meetings.
                        </p>
                    </div>

                    <nav aria-label="Meetings navigation">
                        <ul className="flex flex-wrap gap-4 text-sm font-medium">
                            <li>
                                <Link
                                    href="/meetings"
                                    className="text-blue-900 hover:underline"
                                >
                                    All Meetings
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/meetings/current"
                                    className="text-blue-900 hover:underline"
                                >
                                    Current Meeting
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {children}
        </section>
    );
}