import { NextResponse } from 'next/server';

const COLLECT_API_KEY = 'apikey 1uaEvDchgm4jgEN1xjr4fW:5oyj6GgvC0gRUArsqwXE8h';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const league = searchParams.get('league') || 'tff-1-lig';

    try {
        const res = await fetch(`https://api.collectapi.com/football/league?league=${league}`, {
            headers: {
                'authorization': COLLECT_API_KEY,
                'content-type': 'application/json'
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await res.json();

        // Fallback logic if API fails (similar to Go backend)
        if (!data.success) {
            // Mock data for TFF 1. Lig if API fails (e.g. limit reached)
            if (league === 'tff-1-lig') {
                return NextResponse.json([
                    { rank: 1, team: "Şanlıurfaspor", play: 12, win: 8, draw: 3, lose: 1, goalfor: 24, goalagainst: 8, goaldistance: 16, point: 27 },
                    { rank: 2, team: "Kocaelispor", play: 12, win: 7, draw: 4, lose: 1, goalfor: 21, goalagainst: 9, goaldistance: 12, point: 25 },
                    { rank: 3, team: "Bandırmaspor", play: 12, win: 7, draw: 3, lose: 2, goalfor: 19, goalagainst: 11, goaldistance: 8, point: 24 },
                    { rank: 4, team: "Erzurumspor FK", play: 12, win: 6, draw: 4, lose: 2, goalfor: 18, goalagainst: 10, goaldistance: 8, point: 22 },
                    { rank: 5, team: "Fatih Karagümrük", play: 12, win: 5, draw: 5, lose: 2, goalfor: 16, goalagainst: 12, goaldistance: 4, point: 20 },
                ]);
            }
            return NextResponse.json({ error: 'API returned failure' }, { status: 502 });
        }

        return NextResponse.json(data.result);
    } catch (error) {
        console.error('Standings API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
