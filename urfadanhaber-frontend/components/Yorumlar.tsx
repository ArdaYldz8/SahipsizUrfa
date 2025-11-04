'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Yorum {
  id: number;
  ad: string;
  avatar?: string;
  tarih: string;
  icerik: string;
  cevaplar?: Yorum[];
}

interface YorumlarProps {
  haberId: number;
}

export default function Yorumlar({ haberId }: YorumlarProps) {
  // Mock yorumlar - gerçek uygulamada API'dan gelecek
  const [yorumlar, setYorumlar] = useState<Yorum[]>([
    {
      id: 1,
      ad: 'Mehmet Yılmaz',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      tarih: '2025-11-04T12:30:00',
      icerik: 'Göbeklitepe gerçekten muhteşem bir yer. Geçen ay ziyaret ettim ve büyülendim. Bu yeni bulgular çok heyecan verici!',
      cevaplar: [
        {
          id: 2,
          ad: 'Ayşe Kaya',
          tarih: '2025-11-04T13:15:00',
          icerik: 'Ben de geçen yıl gittim, kesinlikle görülmesi gereken bir yer. UNESCO listesinde olması da çok önemli.'
        }
      ]
    },
    {
      id: 3,
      ad: 'Ahmet Demir',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      tarih: '2025-11-04T14:00:00',
      icerik: 'Kazı çalışmaları ne zaman tamamlanacak? Tüm alanın açılmasını sabırsızlıkla bekliyorum.'
    },
    {
      id: 4,
      ad: 'Fatma Öztürk',
      tarih: '2025-11-04T15:20:00',
      icerik: 'Şanlıurfa\'nın turizm potansiyeli çok yüksek. Göbeklitepe\'nin yanı sıra Balıklıgöl, Harran gibi tarihi yerler de çok güzel.'
    }
  ]);

  const [yeniYorum, setYeniYorum] = useState({ ad: '', email: '', icerik: '' });
  const [gonderiliyor, setGonderiliyor] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGonderiliyor(true);

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      const yorum: Yorum = {
        id: Date.now(),
        ad: yeniYorum.ad,
        tarih: new Date().toISOString(),
        icerik: yeniYorum.icerik
      };

      setYorumlar([yorum, ...yorumlar]);
      setYeniYorum({ ad: '', email: '', icerik: '' });
      setGonderiliyor(false);
    }, 1000);
  };

  const YorumKarti = ({ yorum, cevap = false }: { yorum: Yorum; cevap?: boolean }) => (
    <div className={`${cevap ? 'ml-12 mt-4' : ''}`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          {yorum.avatar ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={yorum.avatar}
                alt={yorum.ad}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{yorum.ad}</h4>
              <time className="text-xs text-gray-500">
                {new Date(yorum.tarih).toLocaleString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
            <p className="text-gray-700 leading-relaxed">{yorum.icerik}</p>
          </div>
          {!cevap && (
            <button className="mt-2 text-sm text-primary hover:underline font-medium">
              Yanıtla
            </button>
          )}
        </div>
      </div>
      {yorum.cevaplar && yorum.cevaplar.map(cevapYorum => (
        <YorumKarti key={cevapYorum.id} yorum={cevapYorum} cevap={true} />
      ))}
    </div>
  );

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        Yorumlar ({yorumlar.reduce((acc, y) => acc + 1 + (y.cevaplar?.length || 0), 0)})
      </h2>

      {/* Yorum Formu */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Yorum Yap</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="ad" className="block text-sm font-medium text-gray-700 mb-2">
                Adınız *
              </label>
              <input
                type="text"
                id="ad"
                required
                value={yeniYorum.ad}
                onChange={(e) => setYeniYorum({ ...yeniYorum, ad: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Adınızı girin"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-posta *
              </label>
              <input
                type="email"
                id="email"
                required
                value={yeniYorum.email}
                onChange={(e) => setYeniYorum({ ...yeniYorum, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="E-posta adresiniz"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="icerik" className="block text-sm font-medium text-gray-700 mb-2">
              Yorumunuz *
            </label>
            <textarea
              id="icerik"
              required
              rows={4}
              value={yeniYorum.icerik}
              onChange={(e) => setYeniYorum({ ...yeniYorum, icerik: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Yorumunuzu yazın..."
            />
          </div>
          <button
            type="submit"
            disabled={gonderiliyor}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {gonderiliyor ? 'Gönderiliyor...' : 'Yorum Gönder'}
          </button>
        </form>
      </div>

      {/* Yorumlar Listesi */}
      <div className="space-y-6">
        {yorumlar.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
          </div>
        ) : (
          yorumlar.map(yorum => (
            <YorumKarti key={yorum.id} yorum={yorum} />
          ))
        )}
      </div>
    </div>
  );
}
