'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Horoscope, ZODIAC_SIGNS } from '@/types/burc';

export default function AdminBurcList() {
    const [horoscopes, setHoroscopes] = useState<Horoscope[]>([]);
    const [loading, setLoading] = useState(true);
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        fetchHoroscopes();
    }, []);

    async function fetchHoroscopes() {
        try {
            // Fetch horoscopes for today
            const { data, error } = await supabase
                .from('horoscopes')
                .select('*')
                .eq('comment_date', today);

            if (error) throw error;
            setHoroscopes(data || []);
        } catch (error) {
            console.error('Error fetching horoscopes:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Günlük Burç Yorumları ({new Date().toLocaleDateString('tr-TR')})</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ZODIAC_SIGNS.map((sign) => {
                    const currentHoroscope = horoscopes.find(h => h.zodiac_sign === sign.id);
                    const isUpdated = !!currentHoroscope;

                    return (
                        <div key={sign.id} className={`bg-white rounded-lg shadow border-l-4 ${isUpdated ? 'border-green-500' : 'border-gray-200'} overflow-hidden`}>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{sign.name}</h3>
                                        <p className="text-sm text-gray-500">{sign.date}</p>
                                    </div>
                                    {isUpdated ? (
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Güncel</span>
                                    ) : (
                                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Bekliyor</span>
                                    )}
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]">
                                    {currentHoroscope ? currentHoroscope.daily_comment : 'Bugün için henüz yorum girilmemiş.'}
                                </p>

                                <Link
                                    href={`/admin/burc/${sign.id}`}
                                    className="block w-full text-center bg-gray-50 hover:bg-gray-100 text-indigo-600 font-medium py-2 rounded transition-colors"
                                >
                                    {isUpdated ? 'Düzenle' : 'Yorum Ekle'}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
