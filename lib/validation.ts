import { z } from 'zod';

export const MeetingFormSchema = z.object({
    date: z.string().min(1, 'Date is required.'),
    meetingType: z.enum([
        'sacrament',
        'first-sunday-sacrament',
        'stake-conference',
        'general-conference',
    ]),
    presiding: z.string().min(1, 'Presiding is required.'),
    conducting: z.string().min(1, 'Conducting is required.'),
    announcements: z.string().optional(),
    openingHymnNumber: z.coerce.number().int().positive(
        'Opening hymn number is required.',
    ),
    openingHymnTitle: z.string().min(1, 'Opening hymn title is required.'),
    openingPrayer: z.string().min(1, 'Opening prayer is required.'),
    wardBusiness: z.string().optional(),
    stakeBusiness: z.boolean().default(false),
    sacramentHymnNumber: z.coerce.number().int().positive(
        'Sacrament hymn number is required.',
    ),
    sacramentHymnTitle: z.string().min(
        1,
        'Sacrament hymn title is required.',
    ),
    speakers: z.string().optional(),
    closingHymnNumber: z.coerce.number().int().positive(
        'Closing hymn number is required.',
    ),
    closingHymnTitle: z.string().min(1, 'Closing hymn title is required.'),
    closingPrayer: z.string().min(1, 'Closing prayer is required.'),
});

export type MeetingFormData = z.infer<typeof MeetingFormSchema>;