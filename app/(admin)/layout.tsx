export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Admin
                    </h2>
                </div>
            </div>

            <main className="mx-auto max-w-6xl px-6 py-10">
                {children}
            </main>
        </div>
    );
}