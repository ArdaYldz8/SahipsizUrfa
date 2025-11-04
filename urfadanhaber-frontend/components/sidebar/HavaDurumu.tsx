'use client';

import { useEffect, useState } from 'react';
import { getHavaDurumu, type HavaDurumu as HavaDurumuType } from '@/lib/api/hava-durumu';

export default function HavaDurumu() {
  const [hava, setHava] = useState<HavaDurumuType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHavaDurumu()
      .then(setHava)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Hava Durumu</h3>
        <div className="animate-pulse">
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!hava) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-4 text-white">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
        {hava.sehir}
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-5xl font-bold">{hava.sicaklik}°</div>
          <div className="ml-4">
            <div className="capitalize text-sm">{hava.aciklama}</div>
            <div className="text-xs opacity-90 mt-1">
              <div>Nem: %{hava.nem}</div>
              <div>Rüzgar: {hava.ruzgar} km/s</div>
            </div>
          </div>
        </div>
        <div className="text-6xl">
          {hava.icon && hava.icon.startsWith('01') && '☀️'}
          {hava.icon && hava.icon.startsWith('02') && '⛅'}
          {hava.icon && (hava.icon.startsWith('03') || hava.icon.startsWith('04')) && '☁️'}
          {hava.icon && (hava.icon.startsWith('09') || hava.icon.startsWith('10')) && '🌧️'}
          {hava.icon && hava.icon.startsWith('11') && '⛈️'}
          {hava.icon && hava.icon.startsWith('13') && '❄️'}
          {hava.icon && hava.icon.startsWith('50') && '🌫️'}
        </div>
      </div>
    </div>
  );
}
