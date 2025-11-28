import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ReligiousDaily, RELIGIOUS_TYPES } from '@/types/religious';

export default async function DailyContent() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
    );

    const today = new Date().toISOString().split('T')[0];

    const { data } = await supabase
        .from('religious_daily')
        .select('*')
        .eq('display_date', today);

    const contentMap = (data || []).reduce((acc, item) => {
        acc[item.type] = item;
        return acc;
    }, {} as Record<string, ReligiousDaily>);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hadith */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative">
                    <h3 className="text-emerald-600 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        Günün Hadisi
                    </h3>
                    <blockquote className="text-gray-800 font-medium text-lg leading-relaxed mb-4">
                        "{contentMap['hadith']?.content || 'Bugün için hadis bulunamadı.'}"
                    </blockquote>
                    {contentMap['hadith']?.source && (
                        <p className="text-sm text-gray-500 italic">— {contentMap['hadith'].source}</p>
                    )}
                </div>
            </div>

            {/* Verse */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative">
                    <h3 className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        Günün Ayeti
                    </h3>
                    <blockquote className="text-gray-800 font-medium text-lg leading-relaxed mb-4">
                        "{contentMap['verse']?.content || 'Bugün için ayet bulunamadı.'}"
                    </blockquote>
                    {contentMap['verse']?.source && (
                        <p className="text-sm text-gray-500 italic">— {contentMap['verse'].source}</p>
                    )}
                </div>
            </div>

            {/* Prayer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative">
                    <h3 className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        Günün Duası
                    </h3>
                    <blockquote className="text-gray-800 font-medium text-lg leading-relaxed mb-4">
                        "{contentMap['prayer']?.content || 'Bugün için dua bulunamadı.'}"
                    </blockquote>
                    {contentMap['prayer']?.source && (
                        <p className="text-sm text-gray-500 italic">— {contentMap['prayer'].source}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
