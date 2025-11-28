import { NextResponse } from 'next/server';

const COLLECT_API_KEY = 'apikey 1uaEvDchgm4jgEN1xjr4fW:5oyj6GgvC0gRUArsqwXE8h';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'sanliurfa';

    try {
        const res = await fetch(`https://api.collectapi.com/pray/all?city=${city}`, {
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

        if (!data.success) {
            return NextResponse.json({ error: 'API returned failure' }, { status: 502 });
        }

        return NextResponse.json(data.result);
    } catch (error) {
        console.error('Prayer Times API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
