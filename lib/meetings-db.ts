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

// Mutation stubs for future admin functionality.
export async function addMeeting(
    _meeting: Omit<SacramentMeeting, 'id'>,
): Promise<void> {
    // TODO: Implement database INSERT.
}

export async function updateMeeting(
    _id: number,
    _meeting: Partial<SacramentMeeting>,
): Promise<void> {
    // TODO: Implement database UPDATE.
}

export async function deleteMeeting(
    _id: number,
): Promise<void> {
    // TODO: Implement database DELETE.
}