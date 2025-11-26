'use client';

import { useEffect, useState } from 'react';
import { getPrayerTimes } from '@/lib/api/external';

interface PrayerTime {
    id?: number;
    vakit: string;
    saat: string;
}

export default function NamazVakitleri() {
    const [vakitler, setVakitler] = useState<PrayerTime[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getPrayerTimes('sanliurfa');
            setVakitler(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-green-500 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 bg-green-500 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    // Find next prayer time
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    let nextPrayerIndex = -1;
    for (let i = 0; i < vakitler.length; i++) {
        if (vakitler[i].saat > currentTime) {
            nextPrayerIndex = i;
            break;
        }
    }

    return (
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                    </svg>
                    Namaz Vakitleri
                </h3>
                <span className="text-sm opacity-90">Şanlıurfa</span>
            </div>

            {vakitler.length === 0 ? (
                <p className="text-center py-4 opacity-80">Veri yüklenemedi.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {vakitler.map((vakit, index) => (
                        <div
                            key={vakit.id || index}
                            className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 transition-all ${index === nextPrayerIndex
                                    ? 'ring-2 ring-white ring-opacity-80 bg-opacity-20'
                                    : 'hover:bg-opacity-20'
                                }`}
                        >
                            <div className="text-xs opacity-90 mb-1">{vakit.vakit}</div>
                            <div className="text-lg font-bold">{vakit.saat}</div>
                            {index === nextPrayerIndex && (
                                <div className="text-xs mt-1 font-medium opacity-90">Sonraki</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
