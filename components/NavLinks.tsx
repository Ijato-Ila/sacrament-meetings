'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'Meetings' },
    { href: '/meetings/current', label: 'Current Meeting' },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav aria-label="Main navigation">
            <ul className="flex flex-wrap gap-4">
                {links.map((link) => {
                    const isActive =
                        pathname === link.href ||
                        (link.href !== '/' && pathname.startsWith(link.href));

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition ${isActive
                                        ? 'bg-blue-900 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}