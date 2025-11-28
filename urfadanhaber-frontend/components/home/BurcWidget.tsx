'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ZODIAC_SIGNS } from '@/types/burc';
import { useRouter } from 'next/navigation';

export default function BurcWidget() {
    const router = useRouter();
    const [selectedSign, setSelectedSign] = useState('');

    const handleSignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sign = e.target.value;
        if (sign) {
            // Redirect to the burc page with the selected sign (we'll need to handle this on the page side or just let user select there)
            // For now, let's just go to the page. Ideally, we could pass the sign as a query param or state.
            // But since the page uses local state for selection, we might just redirect to /burc.
            // To make it better, let's update /burc/page.tsx to accept a query param later.
            // For now, just redirecting to /burc is fine, or we can use localStorage.
            router.push('/burc');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
            <div className="bg-purple-900 px-4 py-3 flex justify-between items-center border-b border-purple-800">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="text-lg">🔮</span>
                    GÜNLÜK BURÇLAR
                </h3>
            </div>
            <div className="p-4">
                <p className="text-gray-600 text-sm mb-4">
                    Bugün yıldızlar sizin için ne söylüyor? Burcunuzu seçin ve öğrenin.
                </p>
                <div className="relative">
                    <select
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block"
                        onChange={handleSignChange}
                        value={selectedSign}
                    >
                        <option value="">Burcunuzu Seçiniz</option>
                        {ZODIAC_SIGNS.map((sign) => (
                            <option key={sign.id} value={sign.id}>
                                {sign.name} ({sign.date})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4 text-center">
                    <Link href="/burc" className="text-xs font-medium text-purple-600 hover:text-purple-800 transition-colors">
                        Tüm Burç Yorumlarını Gör &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
