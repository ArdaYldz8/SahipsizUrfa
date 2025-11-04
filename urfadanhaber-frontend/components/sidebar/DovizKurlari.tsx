'use client';

import { useEffect, useState } from 'react';
import { getDovizKurlari, type DovizKuru } from '@/lib/api/doviz';

export default function DovizKurlari() {
  const [kurlar, setKurlar] = useState<DovizKuru[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDovizKurlari()
      .then(setKurlar)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Döviz Kurları</h3>
        <div className="animate-pulse space-y-2">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Döviz Kurları
      </h3>
      <div className="space-y-2">
        {kurlar.map((kur) => (
          <div
            key={kur.kod}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div>
              <div className="font-semibold text-gray-800">{kur.kod}</div>
              <div className="text-xs text-gray-500">{kur.isim}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                <span className="text-xs">Alış: </span>
                <span className="font-medium">{kur.alis > 0 ? kur.alis.toFixed(2) : '-'}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-xs">Satış: </span>
                <span className="font-medium">{kur.satis > 0 ? kur.satis.toFixed(2) : '-'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 mt-2 text-center">
        Kaynak: TCMB
      </div>
    </div>
  );
}
