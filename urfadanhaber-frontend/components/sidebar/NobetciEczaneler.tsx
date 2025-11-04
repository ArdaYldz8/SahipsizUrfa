'use client';

import { useEffect, useState } from 'react';

interface Eczane {
  ad: string;
  adres: string;
  telefon: string;
  ilce: string;
}

export default function NobetciEczaneler() {
  const [eczaneler, setEczaneler] = useState<Eczane[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock veri - gerçek uygulamada API'dan gelecek
    setTimeout(() => {
      setEczaneler([
        {
          ad: 'Şifa Eczanesi',
          adres: 'Haliliye Merkez, Atatürk Bulvarı No:45',
          telefon: '0414 215 34 56',
          ilce: 'Haliliye'
        },
        {
          ad: 'Sağlık Eczanesi',
          adres: 'Karaköprü, Zübeyde Hanım Cad. No:12',
          telefon: '0414 318 76 54',
          ilce: 'Karaköprü'
        },
        {
          ad: 'Merkez Eczanesi',
          adres: 'Eyyübiye, Cumhuriyet Meydanı No:8',
          telefon: '0414 225 89 32',
          ilce: 'Eyyübiye'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-5 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
        </svg>
        Nöbetçi Eczaneler
      </h3>

      <div className="text-xs text-gray-500 mb-3 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        {new Date().toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </div>

      <div className="space-y-3">
        {eczaneler.map((eczane, index) => (
          <div
            key={index}
            className="border-l-4 border-green-500 bg-green-50 p-3 rounded hover:bg-green-100 transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm mb-1">{eczane.ad}</h4>
                <p className="text-xs text-gray-600 mb-1 flex items-start">
                  <svg className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{eczane.adres}</span>
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${eczane.telefon}`}
                    className="text-xs text-green-700 font-semibold hover:underline flex items-center"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {eczane.telefon}
                  </a>
                  <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                    {eczane.ilce}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t text-center">
        <p className="text-xs text-gray-500">
          Acil durumlarda <a href="tel:112" className="text-green-600 font-semibold hover:underline">112</a> arayabilirsiniz
        </p>
      </div>
    </div>
  );
}
