'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Condolence } from '@/types/taziye';

export default function TaziyeWidget() {
    const [condolences, setCondolences] = useState<Condolence[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCondolences() {
            try {
                const { data, error } = await supabase
                    .from('condolences')
                    .select('*')
                    .eq('is_active', true)
                    .order('death_date', { ascending: false })
                    .limit(5);

                if (error) throw error;
                setCondolences(data || []);
            } catch (error) {
                console.error('Error fetching condolences:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCondolences();
    }, []);

    if (loading) return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
                <div className="h-12 bg-gray-100 rounded"></div>
                <div className="h-12 bg-gray-100 rounded"></div>
                <div className="h-12 bg-gray-100 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-800">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    TAZİYE KÖŞESİ
                </h3>
                <Link href="/taziye" className="text-xs text-gray-400 hover:text-white transition-colors">
                    Tümü &rarr;
                </Link>
            </div>
            <div className="divide-y divide-gray-100">
                {condolences.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                        Bugün için taziye ilanı bulunmamaktadır.
                    </div>
                ) : (
                    condolences.map((item) => (
                        <div key={item.id} className="p-3 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{item.deceased_name}</p>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.funeral_info}</p>
                                </div>
                                <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                    {new Date(item.death_date).toLocaleDateString('tr-TR')}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="bg-gray-50 px-4 py-2 text-center border-t border-gray-100">
                <Link href="/taziye" className="text-xs font-medium text-gray-600 hover:text-primary transition-colors">
                    Tüm Taziye İlanlarını Gör
                </Link>
            </div>
        </div>
    );
}
