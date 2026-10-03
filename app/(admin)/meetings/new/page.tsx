import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900">
                Create New Meeting
            </h1>

            <p className="mt-2 mb-8 text-gray-600">
                Enter the details for the sacrament meeting.
            </p>

            <MeetingForm />
        </main>
    );
}