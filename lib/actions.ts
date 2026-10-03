'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
    addMeeting,
    deleteMeeting as deleteMeetingFromDb,
    updateMeeting as updateMeetingInDb,
} from './meetings-db';

import { MeetingFormSchema } from './validation';
import type { SacramentMeeting } from './types';

export type State = {
    errors?: Record<string, string[]>;
    message?: string;
};

function formDataToMeeting(formData: FormData): unknown {
    const announcements =
        formData.get('announcements')?.toString() ?? '';

    const wardBusiness =
        formData.get('wardBusiness')?.toString() ?? '';

    const speakers =
        formData.get('speakers')?.toString() ?? '';

    return {
        date: formData.get('date')?.toString() ?? '',
        meetingType: formData.get('meetingType')?.toString() ?? '',
        presiding: formData.get('presiding')?.toString() ?? '',
        conducting: formData.get('conducting')?.toString() ?? '',
        announcements,

        openingHymnNumber:
            formData.get('openingHymnNumber')?.toString() ?? '',

        openingHymnTitle:
            formData.get('openingHymnTitle')?.toString() ?? '',

        openingPrayer:
            formData.get('openingPrayer')?.toString() ?? '',

        wardBusiness,

        stakeBusiness:
            formData.get('stakeBusiness') === 'on',

        sacramentHymnNumber:
            formData.get('sacramentHymnNumber')?.toString() ?? '',

        sacramentHymnTitle:
            formData.get('sacramentHymnTitle')?.toString() ?? '',

        speakers,

        closingHymnNumber:
            formData.get('closingHymnNumber')?.toString() ?? '',

        closingHymnTitle:
            formData.get('closingHymnTitle')?.toString() ?? '',

        closingPrayer:
            formData.get('closingPrayer')?.toString() ?? '',
    };
}

function toMeetingData(data: {
    date: string;
    meetingType: SacramentMeeting['meetingType'];
    presiding: string;
    conducting: string;
    announcements?: string;
    openingHymnNumber: number;
    openingHymnTitle: string;
    openingPrayer: string;
    wardBusiness?: string;
    stakeBusiness: boolean;
    sacramentHymnNumber: number;
    sacramentHymnTitle: string;
    speakers?: string;
    closingHymnNumber: number;
    closingHymnTitle: string;
    closingPrayer: string;
}): Omit<SacramentMeeting, 'id'> {
    return {
        date: data.date,
        meetingType: data.meetingType,
        presiding: data.presiding,
        conducting: data.conducting,

        announcements: data.announcements
            ? data.announcements
                  .split('\n')
                  .map((item) => item.trim())
                  .filter(Boolean)
            : [],

        openingHymn: {
            number: data.openingHymnNumber,
            title: data.openingHymnTitle,
        },

        openingPrayer: data.openingPrayer,

        wardBusiness: data.wardBusiness
            ? data.wardBusiness
                  .split('\n')
                  .map((description) => ({
                      description: description.trim(),
                  }))
                  .filter((item) => item.description.length > 0)
            : [],

        stakeBusiness: data.stakeBusiness,

        sacramentHymn: {
            number: data.sacramentHymnNumber,
            title: data.sacramentHymnTitle,
        },

        speakers: data.speakers
            ? data.speakers
                  .split('\n')
                  .map((line) => {
                      const [name, topic] = line
                          .split('|')
                          .map((part) => part.trim());

                      return {
                          name: name ?? '',
                          topic: topic ?? '',
                          type: 'speaker' as const,
                      };
                  })
                  .filter((speaker) => speaker.name.length > 0)
            : [],

        closingHymn: {
            number: data.closingHymnNumber,
            title: data.closingHymnTitle,
        },

        closingPrayer: data.closingPrayer,
    };
}

export async function createMeeting(
    _previousState: State,
    formData: FormData,
): Promise<State> {
    try {
        const validatedFields = MeetingFormSchema.safeParse(
            formDataToMeeting(formData),
        );

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Please correct the highlighted fields.',
            };
        }

        await addMeeting(toMeetingData(validatedFields.data));

        revalidatePath('/meetings');
    } catch (error) {
        console.error('Failed to create meeting:', error);

        throw new Error(
            'Unable to create the meeting. Please try again.',
        );
    }

    redirect('/meetings');
}

export async function updateMeeting(
    id: number,
    _previousState: State,
    formData: FormData,
): Promise<State> {
    try {
        const validatedFields = MeetingFormSchema.safeParse(
            formDataToMeeting(formData),
        );

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Please correct the highlighted fields.',
            };
        }

        await updateMeetingInDb(
            id,
            toMeetingData(validatedFields.data),
        );

        revalidatePath('/meetings');
        revalidatePath(`/meetings/${id}`);
    } catch (error) {
        console.error(`Failed to update meeting ${id}:`, error);

        throw new Error(
            'Unable to update the meeting. Please try again.',
        );
    }

    redirect(`/meetings/${id}`);
}

export async function deleteMeeting(
    id: number,
    _formData: FormData,
): Promise<void> {
    void _formData;

    try {
        await deleteMeetingFromDb(id);

        revalidatePath('/meetings');
    } catch (error) {
        console.error(`Failed to delete meeting ${id}:`, error);

        throw new Error(
            'Unable to delete the meeting. Please try again.',
        );
    }

    redirect('/meetings');
}