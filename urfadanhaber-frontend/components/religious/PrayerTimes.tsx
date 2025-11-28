'use client';

import { useState, useEffect } from 'react';
import { getPrayerTimes } from '@/lib/api/external';
import { PrayerTime } from '@/types/religious';

export default function PrayerTimes() {
    const [times, setTimes] = useState<PrayerTime[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextPrayer, setNextPrayer] = useState<{ vakit: string; saat: string; remaining: string } | null>(null);

    useEffect(() => {
        async function loadTimes() {
            const data = await getPrayerTimes();
            if (data && data.length > 0) {
                setTimes(data);
                calculateNextPrayer(data);
            }
            setLoading(false);
        }
        loadTimes();

        const timer = setInterval(() => {
            if (times.length > 0) calculateNextPrayer(times);
        }, 60000);

        return () => clearInterval(timer);
    }, [times.length]);

    function calculateNextPrayer(prayerData: PrayerTime[]) {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        let next = prayerData.find(p => p.saat > currentTime);

        // If no next prayer today, it's Imsak tomorrow (simplified logic for now, assuming next day same times)
        if (!next) {
            next = prayerData.find(p => p.vakit === 'İmsak');
        }

        if (next) {
            const [hours, minutes] = next.saat.split(':').map(Number);
            let nextTime = new Date();
            nextTime.setHours(hours, minutes, 0);

            if (next.saat < currentTime) {
                nextTime.setDate(nextTime.getDate() + 1);
            }

            const diff = nextTime.getTime() - now.getTime();
            const diffHours = Math.floor(diff / (1000 * 60 * 60));
            const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setNextPrayer({
                vakit: next.vakit,
                saat: next.saat,
                remaining: `${diffHours} sa ${diffMinutes} dk`
            });
        }
    }

    if (loading) return <div className="animate-pulse h-32 bg-gray-100 rounded-xl"></div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-emerald-600 px-6 py-4 text-white flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg">Namaz Vakitleri</h3>
                    <p className="text-emerald-100 text-sm">Şanlıurfa</p>
                </div>
                {nextPrayer && (
                    <div className="text-right">
                        <p className="text-xs text-emerald-100 uppercase tracking-wider">{nextPrayer.vakit} Vaktine</p>
                        <p className="font-bold text-xl">{nextPrayer.remaining}</p>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-gray-100 border-b border-gray-100">
                {times.map((t, i) => {
                    const isNext = nextPrayer?.vakit === t.vakit;
                    return (
                        <div key={i} className={`p-4 text-center ${isNext ? 'bg-emerald-50' : ''}`}>
                            <p className={`text-xs font-medium uppercase mb-1 ${isNext ? 'text-emerald-600' : 'text-gray-500'}`}>
                                {t.vakit}
                            </p>
                            <p className={`font-bold text-lg ${isNext ? 'text-emerald-700' : 'text-gray-800'}`}>
                                {t.saat}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 text-center">
                Veriler Diyanet İşleri Başkanlığı'ndan alınmaktadır.
            </div>
        </div>
    );
}
