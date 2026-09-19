export default function Footer() {
    return (
        <footer className="mt-12 border-t border-gray-200 bg-gray-100">
            <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-gray-600">
                <p>
                    © {new Date().getFullYear()} Calabar Nigeria Ward — Sacrament
                    Meeting Planner
                </p>
            </div>
        </footer>
    );
}