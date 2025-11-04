'use client';

import { useEffect, useState } from 'react';

interface Takim {
  sira: number;
  ad: string;
  oynanan: number;
  galibiyet: number;
  beraberlik: number;
  maglubiyet: number;
  atilan: number;
  yenen: number;
  averaj: number;
  puan: number;
}

export default function LigPuanDurumu() {
  const [takimlar, setTakimlar] = useState<Takim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock veri - gerçek uygulamada API'dan gelecek
    setTimeout(() => {
      setTakimlar([
        {
          sira: 1,
          ad: 'Urfaspor',
          oynanan: 12,
          galibiyet: 8,
          beraberlik: 3,
          maglubiyet: 1,
          atilan: 24,
          yenen: 8,
          averaj: 16,
          puan: 27
        },
        {
          sira: 2,
          ad: 'Gaziantep FK',
          oynanan: 12,
          galibiyet: 7,
          beraberlik: 4,
          maglubiyet: 1,
          atilan: 21,
          yenen: 9,
          averaj: 12,
          puan: 25
        },
        {
          sira: 3,
          ad: 'Diyarbakırspor',
          oynanan: 12,
          galibiyet: 7,
          beraberlik: 3,
          maglubiyet: 2,
          atilan: 19,
          yenen: 11,
          averaj: 8,
          puan: 24
        },
        {
          sira: 4,
          ad: 'Adıyamanspor',
          oynanan: 12,
          galibiyet: 6,
          beraberlik: 4,
          maglubiyet: 2,
          atilan: 18,
          yenen: 10,
          averaj: 8,
          puan: 22
        },
        {
          sira: 5,
          ad: 'Mardinspor',
          oynanan: 12,
          galibiyet: 5,
          beraberlik: 5,
          maglubiyet: 2,
          atilan: 16,
          yenen: 12,
          averaj: 4,
          puan: 20
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-5 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Lig Puan Durumu
      </h3>

      <div className="text-xs text-gray-500 mb-3">
        TFF 2. Lig Beyaz Grup
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b-2 border-gray-200 text-gray-600">
              <th className="text-left py-2 px-1 font-semibold">#</th>
              <th className="text-left py-2 px-1 font-semibold">Takım</th>
              <th className="text-center py-2 px-1 font-semibold">O</th>
              <th className="text-center py-2 px-1 font-semibold">P</th>
            </tr>
          </thead>
          <tbody>
            {takimlar.map((takim, index) => (
              <tr
                key={takim.sira}
                className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                  takim.ad === 'Urfaspor' ? 'bg-primary/5 font-semibold' : ''
                }`}
              >
                <td className="py-2 px-1">
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs ${
                      index === 0
                        ? 'bg-yellow-400 text-white'
                        : index <= 2
                        ? 'bg-green-500 text-white'
                        : 'text-gray-600'
                    }`}
                  >
                    {takim.sira}
                  </span>
                </td>
                <td className="py-2 px-1 text-gray-900">
                  <div className="flex items-center gap-1">
                    {takim.ad === 'Urfaspor' && (
                      <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    <span className="truncate max-w-[100px]">{takim.ad}</span>
                  </div>
                </td>
                <td className="py-2 px-1 text-center text-gray-600">{takim.oynanan}</td>
                <td className="py-2 px-1 text-center font-bold text-gray-900">{takim.puan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t space-y-2 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
          <span>Şampiyonluk</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          <span>Play-off</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t">
        <button className="w-full text-center text-primary font-semibold text-xs hover:underline">
          Detaylı Puan Durumu →
        </button>
      </div>
    </div>
  );
}
