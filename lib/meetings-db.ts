import { neon } from '@neondatabase/serverless';

import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

type MeetingRow = {
    id: number;
    date: string;
    meeting_type: SacramentMeeting['meetingType'];
    presiding: string;
    conducting: string;
    announcements: string[];
    opening_hymn: SacramentMeeting['openingHymn'];
    opening_prayer: string;
    ward_business: SacramentMeeting['wardBusiness'];
    stake_business: boolean;
    sacrament_hymn: SacramentMeeting['sacramentHymn'];
    speakers: SacramentMeeting['speakers'];
    closing_hymn: SacramentMeeting['closingHymn'];
    closing_prayer: string;
};

function mapMeeting(row: MeetingRow): SacramentMeeting {
    return {
        id: row.id,
        date: row.date,
        meetingType: row.meeting_type,
        presiding: row.presiding,
        conducting: row.conducting,
        announcements: row.announcements ?? [],
        openingHymn: row.opening_hymn,
        openingPrayer: row.opening_prayer,
        wardBusiness: row.ward_business ?? [],
        stakeBusiness: row.stake_business,
        sacramentHymn: row.sacrament_hymn,
        speakers: row.speakers ?? [],
        closingHymn: row.closing_hymn,
        closingPrayer: row.closing_prayer,
    };
}

export async function getMeetings(
    query = '',
    currentPage = 1,
): Promise<SacramentMeeting[]> {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const search = `%${query}%`;

    const rows = await sql`
    SELECT
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE
      presiding ILIKE ${search}
      OR conducting ILIKE ${search}
      OR meeting_type ILIKE ${search}
      OR speakers::text ILIKE ${search}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

    return rows.map((row) => mapMeeting(row as MeetingRow));
}

export async function getMeetingsTotalPages(
    query = '',
): Promise<number> {
    const search = `%${query}%`;

    const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE
      presiding ILIKE ${search}
      OR conducting ILIKE ${search}
      OR meeting_type ILIKE ${search}
      OR speakers::text ILIKE ${search}
  `;

    const count = Number(rows[0].count);

    return Math.ceil(count / ITEMS_PER_PAGE);
}

export async function getMeetingById(
    id: number,
): Promise<SacramentMeeting | null> {
    const rows = await sql`
    SELECT
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

    if (rows.length === 0) {
        return null;
    }

    return mapMeeting(rows[0] as MeetingRow);
}

export async function getMeetingByDate(
    date: string,
): Promise<SacramentMeeting | null> {
    const rows = await sql`
    SELECT
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE date = ${date}
    LIMIT 1
  `;

    if (rows.length === 0) {
        return null;
    }

    return mapMeeting(rows[0] as MeetingRow);
}

export async function addMeeting(
    meeting: Omit<SacramentMeeting, 'id'>,
): Promise<void> {
    await sql`
        INSERT INTO meetings (
            date,
            meeting_type,
            presiding,
            conducting,
            announcements,
            opening_hymn,
            opening_prayer,
            ward_business,
            stake_business,
            sacrament_hymn,
            speakers,
            closing_hymn,
            closing_prayer
        )
        VALUES (
            ${meeting.date},
            ${meeting.meetingType},
            ${meeting.presiding},
            ${meeting.conducting},
            ${meeting.announcements ?? []},
            ${JSON.stringify(meeting.openingHymn)},
            ${meeting.openingPrayer},
            ${JSON.stringify(meeting.wardBusiness)},
            ${meeting.stakeBusiness},
            ${JSON.stringify(meeting.sacramentHymn)},
            ${JSON.stringify(meeting.speakers)},
            ${JSON.stringify(meeting.closingHymn)},
            ${meeting.closingPrayer}
        )
    `;
}

export async function updateMeeting(
    id: number,
    meeting: Partial<Omit<SacramentMeeting, 'id'>>,
): Promise<void> {
    await sql`
        UPDATE meetings
        SET
            date = COALESCE(${meeting.date ?? null}, date),
            meeting_type = COALESCE(
                ${meeting.meetingType ?? null},
                meeting_type
            ),
            presiding = COALESCE(
                ${meeting.presiding ?? null},
                presiding
            ),
            conducting = COALESCE(
                ${meeting.conducting ?? null},
                conducting
            ),
            announcements = COALESCE(
                ${meeting.announcements ?? null},
                announcements
            ),
            opening_hymn = COALESCE(
                ${meeting.openingHymn
            ? JSON.stringify(meeting.openingHymn)
            : null
        },
                opening_hymn
            ),
            opening_prayer = COALESCE(
                ${meeting.openingPrayer ?? null},
                opening_prayer
            ),
            ward_business = COALESCE(
                ${meeting.wardBusiness
            ? JSON.stringify(meeting.wardBusiness)
            : null
        },
                ward_business
            ),
            stake_business = COALESCE(
                ${meeting.stakeBusiness ?? null},
                stake_business
            ),
            sacrament_hymn = COALESCE(
                ${meeting.sacramentHymn
            ? JSON.stringify(meeting.sacramentHymn)
            : null
        },
                sacrament_hymn
            ),
            speakers = COALESCE(
                ${meeting.speakers
            ? JSON.stringify(meeting.speakers)
            : null
        },
                speakers
            ),
            closing_hymn = COALESCE(
                ${meeting.closingHymn
            ? JSON.stringify(meeting.closingHymn)
            : null
        },
                closing_hymn
            ),
            closing_prayer = COALESCE(
                ${meeting.closingPrayer ?? null},
                closing_prayer
            )
        WHERE id = ${id}
    `;
}

export async function deleteMeeting(id: number): Promise<void> {
    await sql`
        DELETE FROM meetings
        WHERE id = ${id}
    `;
}