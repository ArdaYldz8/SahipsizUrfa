import { NextResponse } from 'next/server';

const COLLECT_API_KEY = 'apikey 1uaEvDchgm4jgEN1xjr4fW:5oyj6GgvC0gRUArsqwXE8h';

export async function GET() {
    try {
        const res = await fetch('https://api.collectapi.com/health/dutyPharmacy?il=Sanliurfa', {
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
        console.error('Pharmacy API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
