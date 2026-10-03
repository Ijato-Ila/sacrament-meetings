'use client';

import { useActionState } from 'react';

import {
    createMeeting,
    updateMeeting,
    type State,
} from '@/lib/actions';

import type { SacramentMeeting } from '@/lib/types';

const initialState: State = {};

function FieldError({
    id,
    errors,
}: {
    id: string;
    errors?: string[];
}) {
    if (!errors?.length) {
        return null;
    }

    return (
        <p
            id={`${id}-error`}
            className="mt-1 text-sm text-red-600"
        >
            {errors.join(', ')}
        </p>
    );
}

interface MeetingFormProps {
    meeting?: SacramentMeeting;
    meetingId?: number;
}

export default function MeetingForm({
    meeting,
    meetingId,
}: MeetingFormProps) {
    const isEditing = Boolean(meeting && meetingId);

    const action = isEditing
        ? updateMeeting.bind(null, meetingId!)
        : createMeeting;

    const [state, formAction, pending] = useActionState(
        action,
        initialState,
    );

    return (
        <form action={formAction} className="space-y-6">
            <div aria-live="polite">
                {state.message && (
                    <p className="text-sm text-red-600">
                        {state.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                >
                    Meeting Date
                </label>

                <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    defaultValue={meeting?.date ?? ''}
                    aria-describedby={
                        state.errors?.date
                            ? 'date-error'
                            : undefined
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />

                <FieldError
                    id="date"
                    errors={state.errors?.date}
                />
            </div>

            <div>
                <label
                    htmlFor="meetingType"
                    className="block text-sm font-medium text-gray-700"
                >
                    Meeting Type
                </label>

                <select
                    id="meetingType"
                    name="meetingType"
                    defaultValue={
                        meeting?.meetingType ?? 'sacrament'
                    }
                    required
                    aria-describedby={
                        state.errors?.meetingType
                            ? 'meetingType-error'
                            : undefined
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                    <option value="sacrament">
                        Sacrament Meeting
                    </option>
                    <option value="first-sunday-sacrament">
                        First Sunday Sacrament
                    </option>
                    <option value="stake-conference">
                        Stake Conference
                    </option>
                    <option value="general-conference">
                        General Conference
                    </option>
                </select>

                <FieldError
                    id="meetingType"
                    errors={state.errors?.meetingType}
                />
            </div>

            <div>
                <label
                    htmlFor="presiding"
                    className="block text-sm font-medium text-gray-700"
                >
                    Presiding
                </label>

                <input
                    id="presiding"
                    name="presiding"
                    type="text"
                    required
                    defaultValue={meeting?.presiding ?? ''}
                    aria-describedby={
                        state.errors?.presiding
                            ? 'presiding-error'
                            : undefined
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />

                <FieldError
                    id="presiding"
                    errors={state.errors?.presiding}
                />
            </div>

            <div>
                <label
                    htmlFor="conducting"
                    className="block text-sm font-medium text-gray-700"
                >
                    Conducting
                </label>

                <input
                    id="conducting"
                    name="conducting"
                    type="text"
                    required
                    defaultValue={meeting?.conducting ?? ''}
                    aria-describedby={
                        state.errors?.conducting
                            ? 'conducting-error'
                            : undefined
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />

                <FieldError
                    id="conducting"
                    errors={state.errors?.conducting}
                />
            </div>

            <div>
                <label
                    htmlFor="announcements"
                    className="block text-sm font-medium text-gray-700"
                >
                    Announcements
                </label>

                <textarea
                    id="announcements"
                    name="announcements"
                    rows={3}
                    defaultValue={
                        meeting?.announcements?.join('\n') ?? ''
                    }
                    placeholder="One announcement per line"
                    aria-describedby={
                        state.errors?.announcements
                            ? 'announcements-error'
                            : undefined
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />

                <FieldError
                    id="announcements"
                    errors={state.errors?.announcements}
                />
            </div>

            <fieldset className="space-y-4 rounded-md border border-gray-200 p-4">
                <legend className="px-2 text-lg font-semibold text-gray-900">
                    Opening
                </legend>

                <div>
                    <label
                        htmlFor="openingHymnNumber"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Opening Hymn Number
                    </label>

                    <input
                        id="openingHymnNumber"
                        name="openingHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={
                            meeting?.openingHymn.number ?? ''
                        }
                        aria-describedby={
                            state.errors?.openingHymnNumber
                                ? 'openingHymnNumber-error'
                                : undefined
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />

                    <FieldError
                        id="openingHymnNumber"
                        errors={state.errors?.openingHymnNumber}
                    />
                </div>

                <div>
                    <label
                        htmlFor="openingHymnTitle"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Opening Hymn Title
                    </label>

                    <input
                        id="openingHymnTitle"
                        name="openingHymnTitle"
                        type="text"
                        required
                        defaultValue={
                            meeting?.openingHymn.title ?? ''
                        }
                        aria-describedby={
                            state.errors?.openingHymnTitle
                                ? 'openingHymnTitle-error'
                                : undefined
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />

                    <FieldError
                        id="openingHymnTitle"
                        errors={state.errors?.openingHymnTitle}
                    />
                </div>

                <div>
                    <label
                        htmlFor="openingPrayer"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Opening Prayer
                    </label>

                    <input
                        id="openingPrayer"
                        name="openingPrayer"
                        type="text"
                        required
                        defaultValue={meeting?.openingPrayer ?? ''}
                        aria-describedby={
                            state.errors?.openingPrayer
                                ? 'openingPrayer-error'
                                : undefined
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />

                    <FieldError
                        id="openingPrayer"
                        errors={state.errors?.openingPrayer}
                    />
                </div>
            </fieldset>

            <div>
                <label
                    htmlFor="wardBusiness"
                    className="block text-sm font-medium text-gray-700"
                >
                    Ward Business
                </label>

                <textarea
                    id="wardBusiness"
                    name="wardBusiness"
                    rows={3}
                    defaultValue={
                        meeting?.wardBusiness
                            ?.map((item) => item.description)
                            .join('\n') ?? ''
                    }
                    placeholder="One item per line"
                    aria-describedby={
                        state.errors?.wardBusiness
                            ? 'wardBusiness-error'
                            : undefined
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />

                <FieldError
                    id="wardBusiness"
                    errors={state.errors?.wardBusiness}
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    id="stakeBusiness"
                    name="stakeBusiness"
                    type="checkbox"
                    defaultChecked={meeting?.stakeBusiness ?? false}
                />

                <label
                    htmlFor="stakeBusiness"
                    className="text-sm font-medium text-gray-700"
                >
                    Include Stake Business
                </label>
            </div>

            <fieldset className="space-y-4 rounded-md border border-gray-200 p-4">
                <legend className="px-2 text-lg font-semibold text-gray-900">
                    Sacrament
                </legend>

                <div>
                    <label
                        htmlFor="sacramentHymnNumber"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Sacrament Hymn Number
                    </label>

                    <input
                        id="sacramentHymnNumber"
                        name="sacramentHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={
                            meeting?.sacramentHymn.number ?? ''
                        }
                        aria-describedby={
                            state.errors?.sacramentHymnNumber
                                ? 'sacramentHymnNumber-error'
                                : undefined
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />

                    <FieldError
                        id="sacramentHymnNumber"
                        errors={state.errors?.sacramentHymnNumber}
                    />
                </div>

                <div>
                    <label
                        htmlFor="sacramentHymnTitle"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Sacrament Hymn Title
                    </label>

                    <input
                        id="sacramentHymnTitle"
                        name="sacramentHymnTitle"
                        type="text"
                        required
                        defaultValue={
                            meeting?.sacramentHymn.title ?? ''
                        }
                        aria-describedby={
                            state.errors?.sacramentHymnTitle
                                ? 'sacramentHymnTitle-error'
                                : undefined
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />

                    <FieldError
                        id="sacramentHymnTitle"
                        errors={state.errors?.sacramentHymnTitle}
                    />
                </div>
            </fieldset>

            <div>
                <label
                    htmlFor="speakers"
                    className="block text-sm font-medium text-gray-700"
                >
                    Speakers
                </label>

                <textarea
                    id="speakers"
                    name="speakers"
                    rows={4}
                    defaultValue={
                        meeting?.speakers
                            ?.map(
                                (speaker) =>
                                    `${speaker.name} | ${speaker.topic}`,
                            )
                            .join('\n') ?? ''
                    }
                    placeholder="One speaker per line: Name | Topic"
                    aria-describedby={
                        state.errors?.speakers
                            ? 'speakers-error'
                            : undefined
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />

                <FieldError
                    id="speakers"
                    errors={state.errors?.speakers}
                />
            </div>

            <fieldset className="space-y-4 rounded-md border border-gray-200 p-4">
                <legend className="px-2 text-lg font-semibold text-gray-900">
                    Closing
                </legend>

                <div>
                    <label
                        htmlFor="closingHymnNumber"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Closing Hymn Number
                    </label>

                    <input
                        id="closingHymnNumber"
                        name="closingHymnNumber"
                        type="number"
                        min="1"
                        required
                        defaultValue={
                            meeting?.closingHymn.number ?? ''
                        }
                        aria-describedby={
                            state.errors?.closingHymnNumber
                                ? 'closingHymnNumber-error'
                                : undefined
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />

                    <FieldError
                        id="closingHymnNumber"
                        errors={state.errors?.closingHymnNumber}
                    />
                </div>

                <div>
                    <label
                        htmlFor="closingHymnTitle"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Closing Hymn Title
                    </label>

                    <input
                        id="closingHymnTitle"
                        name="closingHymnTitle"
                        type="text"
                        required
                        defaultValue={
                            meeting?.closingHymn.title ?? ''
                        }
                        aria-describedby={
                            state.errors?.closingHymnTitle
                                ? 'closingHymnTitle-error'
                                : undefined
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />

                    <FieldError
                        id="closingHymnTitle"
                        errors={state.errors?.closingHymnTitle}
                    />
                </div>

                <div>
                    <label
                        htmlFor="closingPrayer"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Closing Prayer
                    </label>

                    <input
                        id="closingPrayer"
                        name="closingPrayer"
                        type="text"
                        required
                        defaultValue={meeting?.closingPrayer ?? ''}
                        aria-describedby={
                            state.errors?.closingPrayer
                                ? 'closingPrayer-error'
                                : undefined
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />

                    <FieldError
                        id="closingPrayer"
                        errors={state.errors?.closingPrayer}
                    />
                </div>
            </fieldset>

            <button
                type="submit"
                disabled={pending}
                className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {pending
                    ? isEditing
                        ? 'Updating Meeting...'
                        : 'Creating Meeting...'
                    : isEditing
                        ? 'Update Meeting'
                        : 'Create Meeting'}
            </button>
        </form>
    );
}