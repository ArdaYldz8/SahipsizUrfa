export type ReligiousType = 'hadith' | 'verse' | 'prayer';

export interface ReligiousDaily {
    id: string;
    type: ReligiousType;
    content: string;
    source: string;
    display_date: string;
    created_at: string;
}

export const RELIGIOUS_TYPES: { value: ReligiousType; label: string }[] = [
    { value: 'hadith', label: 'Hadis-i Şerif' },
    { value: 'verse', label: 'Günün Ayeti' },
    { value: 'prayer', label: 'Günün Duası' },
];

export interface PrayerTime {
    vakit: string;
    saat: string;
}
