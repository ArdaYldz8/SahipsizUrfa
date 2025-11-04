import Link from 'next/link';
import Image from 'next/image';
import DovizKurlari from '@/components/sidebar/DovizKurlari';
import HavaDurumu from '@/components/sidebar/HavaDurumu';
import NobetciEczaneler from '@/components/sidebar/NobetciEczaneler';
import LigPuanDurumu from '@/components/sidebar/LigPuanDurumu';
import { getHaberler } from '@/lib/api/strapi';

// Tarih formatlama fonksiyonu
function formatTarih(dateString: string): string {
  const date = new Date(dateString);
  const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  return `${date.getDate()} ${aylar[date.getMonth()]} ${date.getFullYear()}`;
}

// Varsayılan görsel
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop';

export default async function Home() {
  // Strapi'den haberleri çek
  const haberler = await getHaberler({ limit: 6 });

  // Eğer haber yoksa boş mesaj göster
  if (!haberler || haberler.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-gray-700">Henüz haber eklenmemiş. Lütfen Strapi admin panelinden haber ekleyin.</p>
        </div>
      </div>
    );
  }

  // Manşet (ilk haber)
  const mansetHaber = haberler[0];
  const digerHaberler = haberler.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ana İçerik */}
        <div className="lg:col-span-2">
          {/* Manşet */}
          <section className="mb-8">
            <Link href={`/haber/${mansetHaber.slug}`} className="block">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={mansetHaber.gorsel || DEFAULT_IMAGE}
                  alt={mansetHaber.baslik || 'Haber görseli'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <span className="bg-red-600 px-3 py-1 rounded text-sm font-semibold">SON DAKİKA</span>
                    <h2 className="text-4xl font-bold mt-4 mb-2 group-hover:text-blue-300 transition-colors">
                      {mansetHaber.baslik}
                    </h2>
                    <p className="text-lg opacity-90">
                      {mansetHaber.ozet}
                    </p>
                    <div className="flex items-center gap-4 text-sm mt-4">
                      <span>{formatTarih(mansetHaber.publishedAt)}</span>
                      <span>•</span>
                      <span>{mansetHaber.okunma} görüntülenme</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>

          {/* Haberler */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Son Haberler</h2>
            <div className="space-y-6">
              {digerHaberler.map((haber) => (
                <Link
                  key={haber.id}
                  href={`/haber/${haber.slug}`}
                  className="block"
                >
                  <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="md:flex">
                      <div className="md:w-1/3 relative h-48">
                        <Image
                          src={haber.gorsel || DEFAULT_IMAGE}
                          alt={haber.baslik || 'Haber görseli'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <span className="text-sm text-primary font-semibold">
                          {haber.kategori?.[0]?.ad || 'Genel'}
                        </span>
                        <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3 group-hover:text-primary transition-colors">
                          {haber.baslik}
                        </h3>
                        <p className="text-gray-600 mb-4">{haber.ozet}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div className="flex items-center gap-3">
                            <span>{formatTarih(haber.publishedAt)}</span>
                            <span>•</span>
                            <span>{haber.okunma} görüntülenme</span>
                          </div>
                          <span className="text-primary group-hover:underline font-semibold">
                            Devamını Oku →
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <HavaDurumu />
          <DovizKurlari />
          <NobetciEczaneler />
          <LigPuanDurumu />

          {/* En Çok Okunanlar */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              En Çok Okunanlar
            </h3>
            <ol className="space-y-3">
              {haberler.slice(0, 5).map((haber, index) => (
                <li key={haber.id} className="flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer">
                  <span className="font-bold text-primary text-lg">{index + 1}</span>
                  <Link href={`/haber/${haber.slug}`} className="text-sm text-gray-700 hover:text-primary">
                    {haber.baslik}
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {/* Reklam Alanı */}
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-500">
            <span>Reklam Alanı<br />300x250</span>
          </div>
        </div>
      </div>
    </div>
  );
}
