import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="grid items-center gap-10 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Calabar Nigeria Ward
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Sacrament Meeting Planner
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Plan, review, and print sacrament meeting programs for current
            and past Sundays.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/meetings/current"
              className="rounded-md bg-blue-900 px-5 py-3 font-medium text-white hover:bg-blue-800"
            >
              View Current Meeting
            </Link>

            <Link
              href="/meetings"
              className="rounded-md border border-gray-300 px-5 py-3 font-medium text-gray-800 hover:bg-gray-50"
            >
              Browse All Meetings
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl">
          <Image
            src="/meeting-placeholder.svg"
            alt="Sacrament meeting program illustration"
            width={800}
            height={500}
            className="h-auto w-full"
            priority
          />
        </div>
      </section>
    </div>
  );
}