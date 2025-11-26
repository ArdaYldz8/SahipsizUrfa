'use client';

import { useState, useEffect } from 'react';
import { getPharmacies } from '@/lib/api/external';

interface Pharmacy {
  name: string;
  address: string;
  phone: string;
  dist: string;
}

export default function NobetciEczaneler() {
  const [date, setDate] = useState('');
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tarihi formatla
    const d = new Date();
    setDate(d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }));

    // Veriyi çek
    async function fetchData() {
      const data = await getPharmacies();
      setPharmacies(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-4">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="text-green-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Nöbetçi Eczaneler</h3>
      </div>

      <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{date}</span>
      </div>

      {/* List */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {pharmacies.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p>Nöbetçi eczane bilgisi yüklenemedi.</p>
            <p className="text-xs mt-1">Lütfen daha sonra tekrar deneyiniz.</p>
          </div>
        ) : (
          pharmacies.map((pharmacy, index) => (
            <div key={index} className="bg-green-50 rounded-lg p-4 relative overflow-hidden border-l-4 border-green-500 transition-all hover:shadow-md">
              <div className="pr-20"> {/* Badge için yer bırak */}
                <h4 className="font-bold text-gray-900 text-lg mb-1">{pharmacy.name}</h4>

                <div className="flex items-start gap-2 text-gray-600 text-sm mb-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{pharmacy.address}</span>
                </div>

                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{pharmacy.phone}</span>
                </div>
              </div>

              {/* District Badge */}
              <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {pharmacy.dist}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 border-t border-gray-100 pt-4">
        Acil durumlarda <span className="text-green-600 font-bold">112</span> arayabilirsiniz
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
