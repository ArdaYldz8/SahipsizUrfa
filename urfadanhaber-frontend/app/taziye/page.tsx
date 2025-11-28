'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Condolence } from '@/types/taziye';

export default function TaziyePage() {
    const [condolences, setCondolences] = useState<Condolence[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCondolences() {
            try {
                const { data, error } = await supabase
                    .from('condolences')
                    .select('*')
                    .eq('is_active', true)
                    .order('death_date', { ascending: false });

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

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 border-b-4 border-gray-800 pb-4">
                <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900">
                    Taziye Köşesi
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Şanlıurfa'da vefat eden hemşehrilerimize Allah'tan rahmet, yakınlarına başsağlığı dileriz.
                </p>
            </div>

            {condolences.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">Güncel taziye ilanı bulunmuyor.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {condolences.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-gray-800 hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            {item.deceased_name}
                                        </h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            Vefat: {new Date(item.death_date).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>
                                    {/* Icon removed as per user request */}
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Defin Bilgileri</h4>
                                        <p className="text-gray-700 mt-1">{item.funeral_info}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Taziye Adresi</h4>
                                        <p className="text-gray-700 mt-1">{item.condolence_address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
