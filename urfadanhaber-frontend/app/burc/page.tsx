'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Horoscope, ZODIAC_SIGNS } from '@/types/burc';

export default function BurcPage() {
    const [horoscopes, setHoroscopes] = useState<Horoscope[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSign, setSelectedSign] = useState<string | null>(null);
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        async function fetchHoroscopes() {
            try {
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
        fetchHoroscopes();
    }, [today]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 border-b-4 border-purple-600 pb-4">
                <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900">
                    Günlük Burç Yorumları
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })} tarihli burç yorumlarınız.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar: Sign Selector */}
                <div className="lg:col-span-1 space-y-2">
                    {ZODIAC_SIGNS.map((sign) => (
                        <button
                            key={sign.id}
                            onClick={() => setSelectedSign(sign.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${selectedSign === sign.id
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-purple-50'
                                }`}
                        >
                            <span className="font-bold">{sign.name}</span>
                            <span className={`text-xs ${selectedSign === sign.id ? 'text-purple-200' : 'text-gray-400'}`}>
                                {sign.date}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Main Content: Display Comment */}
                <div className="lg:col-span-3">
                    {selectedSign ? (
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl">
                                    🔮
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">
                                        {ZODIAC_SIGNS.find(s => s.id === selectedSign)?.name} Burcu
                                    </h2>
                                    <p className="text-purple-600 font-medium">
                                        {ZODIAC_SIGNS.find(s => s.id === selectedSign)?.date}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-pink-50 rounded-lg p-4 text-center">
                                    <div className="text-pink-600 font-bold mb-1">AŞK</div>
                                    <div className="text-yellow-400 text-lg">
                                        {'★'.repeat(horoscopes.find(h => h.zodiac_sign === selectedSign)?.love_rating || 0)}
                                        <span className="text-gray-300">{'★'.repeat(5 - (horoscopes.find(h => h.zodiac_sign === selectedSign)?.love_rating || 0))}</span>
                                    </div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4 text-center">
                                    <div className="text-green-600 font-bold mb-1">PARA</div>
                                    <div className="text-yellow-400 text-lg">
                                        {'★'.repeat(horoscopes.find(h => h.zodiac_sign === selectedSign)?.money_rating || 0)}
                                        <span className="text-gray-300">{'★'.repeat(5 - (horoscopes.find(h => h.zodiac_sign === selectedSign)?.money_rating || 0))}</span>
                                    </div>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-4 text-center">
                                    <div className="text-blue-600 font-bold mb-1">SAĞLIK</div>
                                    <div className="text-yellow-400 text-lg">
                                        {'★'.repeat(horoscopes.find(h => h.zodiac_sign === selectedSign)?.health_rating || 0)}
                                        <span className="text-gray-300">{'★'.repeat(5 - (horoscopes.find(h => h.zodiac_sign === selectedSign)?.health_rating || 0))}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
                                {horoscopes.find(h => h.zodiac_sign === selectedSign)?.daily_comment ? (
                                    <p>{horoscopes.find(h => h.zodiac_sign === selectedSign)?.daily_comment}</p>
                                ) : (
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                        <p className="text-yellow-700 m-0">
                                            Bu burç için henüz bugünün yorumu eklenmemiş. Lütfen daha sonra tekrar kontrol ediniz.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {horoscopes.find(h => h.zodiac_sign === selectedSign)?.daily_comment && (
                                <div className="border-t border-gray-100 pt-6">
                                    <div className="bg-purple-50 rounded-xl p-6">
                                        <div className="mb-4">
                                            <span className="text-purple-800 font-bold text-sm uppercase tracking-wider">Günün Mottosu</span>
                                            <p className="text-purple-900 text-xl font-serif italic mt-1">
                                                "{horoscopes.find(h => h.zodiac_sign === selectedSign)?.motto || 'Bugün senin günün!'}"
                                            </p>
                                        </div>
                                        <div className="flex gap-8">
                                            <div>
                                                <span className="text-purple-800 font-bold text-xs uppercase">Şanslı Sayı</span>
                                                <p className="text-gray-900 font-bold text-lg">{horoscopes.find(h => h.zodiac_sign === selectedSign)?.lucky_number || '-'}</p>
                                            </div>
                                            <div>
                                                <span className="text-purple-800 font-bold text-xs uppercase">Şanslı Renk</span>
                                                <p className="text-gray-900 font-bold text-lg">{horoscopes.find(h => h.zodiac_sign === selectedSign)?.lucky_color || '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-xl p-12 text-center text-white flex flex-col items-center justify-center h-full min-h-[400px]">
                            <div className="text-6xl mb-6">✨</div>
                            <h2 className="text-3xl font-bold mb-4">Burcunuzu Seçin</h2>
                            <p className="text-purple-100 text-lg max-w-md">
                                Günlük burç yorumunuzu okumak için sol taraftaki listeden burcunuzu seçiniz.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
