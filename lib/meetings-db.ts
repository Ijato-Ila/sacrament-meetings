import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-09-20',
        meetingType: 'regular',
        presiding: 'Bishop Edet',
        conducting: 'Brother Ekong',
        announcements: [
            'Ward temple night is September 25.',
            'Youth activity will be held Wednesday.'
        ],
        openingHymn: {
            number: 2,
            title: 'The Spirit of God'
        },
        openingPrayer: 'Sister Ekanem',
        wardBusiness: [
            {
                description: 'Sustaining of new Primary presidency'
            }
        ],
        stakeBusiness: false,
        sacramentHymn: {
            number: 169,
            title: 'In Remembrance of Thy Suffering'
        },
        speakers: [
            {
                name: 'Sister Ansa',
                topic: 'Faith in Jesus Christ',
                type: 'speaker'
            },
            {
                name: 'Ikot Ekpene Ward Choir',
                topic: 'Come, Ye Children of the Lord',
                type: 'musical-number'
            },
            {
                name: 'Brother Udo',
                topic: 'Following the Savior',
                type: 'speaker'
            }
        ],
        closingHymn: {
            number: 31,
            title: 'O God, Our Help in Ages Past'
        },
        closingPrayer: 'Brother Akpan'
    },
    {
        id: 2,
        date: '2026-09-13',
        meetingType: 'testimony',
        presiding: 'Bishop Edet',
        conducting: 'Sister Ufot',
        announcements: [
            'Relief Society activity is September 18.'
        ],
        openingHymn: {
            number: 85,
            title: 'How Firm a Foundation'
        },
        openingPrayer: 'Brother Udo',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: {
            number: 172,
            title: 'In Humility, Our Savior'
        },
        speakers: [
            {
                name: 'Ward Members',
                topic: 'Testimonies',
                type: 'speaker'
            }
        ],
        closingHymn: {
            number: 91,
            title: 'Father, Thy Children to Thee'
        },
        closingPrayer: 'Sister Ansa'
    },
    {
        id: 3,
        date: '2026-09-06',
        meetingType: 'regular',
        presiding: 'Bishop Edet',
        conducting: 'Brother Udo',
        announcements: [
            'Primary program rehearsal begins this week.'
        ],
        openingHymn: {
            number: 66,
            title: 'Rejoice, the Lord Is King!'
        },
        openingPrayer: 'Sister Etim',
        wardBusiness: [
            {
                description: 'Sustaining of new Sunday School teacher'
            }
        ],
        stakeBusiness: true,
        sacramentHymn: {
            number: 181,
            title: 'Jesus of Nazareth, Savior and King'
        },
        speakers: [
            {
                name: 'Sister Johnson',
                topic: 'Serving Others',
                type: 'speaker'
            },
            {
                name: 'Youth Choir',
                topic: 'I Am a Child of God',
                type: 'musical-number'
            }
        ],
        closingHymn: {
            number: 223,
            title: 'Have I Done Any Good?'
        },
        closingPrayer: 'Brother Essien'
    },
    {
        id: 4,
        date: '2026-08-30',
        meetingType: 'stake',
        presiding: 'President Inyang',
        conducting: 'Brother Nse',
        announcements: [],
        openingHymn: {
            number: 3,
            title: 'Now We Sing with One Accord'
        },
        openingPrayer: 'Sister Eyo',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: {
            number: 174,
            title: 'While of These Emblems We Partake'
        },
        speakers: [
            {
                name: 'President Inyang',
                topic: 'Strengthening Families',
                type: 'speaker'
            },
            {
                name: 'Calabar Nigeria Stake Choir',
                topic: 'Come, Follow Me',
                type: 'musical-number'
            }
        ],
        closingHymn: {
            number: 85,
            title: 'How Firm a Foundation'
        },
        closingPrayer: 'Brother Bassey'
    },
    {
        id: 5,
        date: '2026-08-23',
        meetingType: 'general',
        presiding: 'President Inyang',
        conducting: 'Sister Imaobong',
        announcements: [
            'General meeting resources are available online.'
        ],
        openingHymn: {
            number: 96,
            title: 'Dearest Children, God Is Near You'
        },
        openingPrayer: 'Brother Nse',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: {
            number: 169,
            title: 'In Remembrance of Thy Suffering'
        },
        speakers: [
            {
                name: 'Elder Okon',
                topic: 'Discipleship',
                type: 'speaker'
            }
        ],
        closingHymn: {
            number: 219,
            title: 'Because I Have Been Given Much'
        },
        closingPrayer: 'Sister Mfon'
    }
];

export function getMeetings(
    date?: string | null
): SacramentMeeting[] {
    if (date) {
        return meetings.filter((meeting) => meeting.date === date);
    }

    return meetings;
}

export function getMeetingById(
    id: number
): SacramentMeeting | null {
    return meetings.find((meeting) => meeting.id === id) ?? null;
}