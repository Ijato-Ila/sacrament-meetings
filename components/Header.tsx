import Link from 'next/link';

export default function Header() {
    const currentDate = new Date().toLocaleDateString('en-NG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                <div>
                    <Link href="/" className="text-2xl font-bold text-blue-900">
                        Calabar Nigeria Ward
                    </Link>
                    <p className="text-sm text-gray-600">
                        Sacrament Meeting Planner
                    </p>
                </div>

                <p className="text-sm text-gray-600">{currentDate}</p>
            </div>
        </header>
    );
}