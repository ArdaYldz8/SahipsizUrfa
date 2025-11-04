import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DovizKurlari from '@/components/sidebar/DovizKurlari';
import HavaDurumu from '@/components/sidebar/HavaDurumu';
import NobetciEczaneler from '@/components/sidebar/NobetciEczaneler';
import LigPuanDurumu from '@/components/sidebar/LigPuanDurumu';

interface Haber {
  id: number;
  baslik: string;
  slug: string;
  ozet: string;
  gorsel: string;
  kategori: string;
  yazar: string;
  tarih: string;
  okunma: number;
}

// Mock arama fonksiyonu - gerçek uygulamada API'dan gelecek
function aramaYap(query: string): Haber[] {
  const tumHaberler: Haber[] = [
    {
      id: 1,
      baslik: 'Şanlıurfa\'da Tarihi Keşif: Göbeklitepe\'de Yeni Bulgular',
      slug: 'sanliurfada-tarihi-kesif-gobeklitepede-yeni-bulgular',
      ozet: 'Göbeklitepe kazılarında ortaya çıkan yeni bulgular, tarihin en eski tapınak kompleksi hakkında bilinen her şeyi değiştirebilir.',
      gorsel: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop',
      kategori: 'Şanlıurfa',
      yazar: 'Ahmet Yılmaz',
      tarih: '2025-11-04T10:30:00',
      okunma: 1543
    },
    {
      id: 2,
      baslik: 'Karaköprü Belediyesi Yeni Park Projesi Başlattı',
      slug: 'karakopru-belediyesi-yeni-park-projesi-baslatti',
      ozet: 'Karaköprü Belediyesi, ilçenin farklı noktalarına modern parklar yapıyor.',
      gorsel: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&h=400&fit=crop',
      kategori: 'Şanlıurfa',
      yazar: 'Ayşe Kaya',
      tarih: '2025-11-04T09:15:00',
      okunma: 892
    },
    {
      id: 3,
      baslik: 'Halfeti\'de Turizm Sezonu Erken Başladı',
      slug: 'halfetide-turizm-sezonu-erken-basladi',
      ozet: 'Batık şehir Halfeti, bu yıl erken gelen bahar ile birlikte turistlerin akınına uğradı.',
      gorsel: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
      kategori: 'Şanlıurfa',
      yazar: 'Mehmet Demir',
      tarih: '2025-11-03T14:20:00',
      okunma: 654
    },
    {
      id: 4,
      baslik: 'Harran Üniversitesi Yeni Bölümler Açıyor',
      slug: 'harran-universitesi-yeni-bolumler-aciyor',
      ozet: 'Harran Üniversitesi, önümüzdeki akademik yılda 3 yeni bölüm açacak.',
      gorsel: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop',
      kategori: 'Şanlıurfa',
      yazar: 'Fatma Öz',
      tarih: '2025-11-03T11:45:00',
      okunma: 432
    },
    {
      id: 5,
      baslik: 'Urfaspor Deplasmanda Kazandı',
      slug: 'urfaspor-deplasmanda-kazandi',
      ozet: 'Urfaspor, deplasmanda rakibini 2-1 mağlup ederek üst sıralara yükseldi.',
      gorsel: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
      kategori: 'Spor',
      yazar: 'Mustafa Öztürk',
      tarih: '2025-11-03T20:00:00',
      okunma: 987
    },
    {
      id: 6,
      baslik: 'Urfa Mutfağı Dünya Mirası Yolunda',
      slug: 'urfa-mutfagi-dunya-mirasi-yolunda',
      ozet: 'Şanlıurfa\'nın zengin mutfak kültürü UNESCO Dünya Mirası listesine aday gösterildi.',
      gorsel: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
      kategori: 'Şanlıurfa',
      yazar: 'Ayşe Demir',
      tarih: '2025-11-02T15:30:00',
      okunma: 756
    }
  ];

  // Basit arama - başlık, özet ve kategoride arama yapıyor
  const aramaKelimesi = query.toLowerCase();
  return tumHaberler.filter(haber =>
    haber.baslik.toLowerCase().includes(aramaKelimesi) ||
    haber.ozet.toLowerCase().includes(aramaKelimesi) ||
    haber.kategori.toLowerCase().includes(aramaKelimesi)
  );
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || '';

  return {
    title: `"${query}" için Arama Sonuçları | UrfadanHaber`,
    description: `${query} araması için haber sonuçları`,
  };
}

export default async function AramaSayfasi({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = params.q || '';
  const sonuclar = aramaYap(query);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ana İçerik */}
        <div className="lg:col-span-2">
          {/* Arama Başlığı */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Arama Sonuçları
            </h1>
            <p className="text-gray-600">
              <span className="font-semibold">"{query}"</span> için {sonuclar.length} sonuç bulundu
            </p>
            <div className="mt-4 h-1 w-20 bg-primary rounded"></div>
          </div>

          {/* Arama Sonuçları */}
          {sonuclar.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Sonuç bulunamadı</h3>
              <p className="text-gray-500 mb-4">
                "{query}" için herhangi bir sonuç bulunamadı.
              </p>
              <p className="text-sm text-gray-500">
                Arama önerileri:
              </p>
              <ul className="text-sm text-gray-500 mt-2 space-y-1">
                <li>• Yazım hatası olmadığından emin olun</li>
                <li>• Daha genel kelimeler kullanmayı deneyin</li>
                <li>• Farklı anahtar kelimeler deneyin</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-6">
              {sonuclar.map((haber) => (
                <Link
                  key={haber.id}
                  href={`/haber/${haber.slug}`}
                  className="block"
                >
                  <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="md:flex">
                      <div className="md:w-1/3 relative h-48">
                        <Image
                          src={haber.gorsel}
                          alt={haber.baslik}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <span className="text-sm text-primary font-semibold">{haber.kategori}</span>
                        <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3 group-hover:text-primary transition-colors">
                          {haber.baslik}
                        </h3>
                        <p className="text-gray-600 mb-4">{haber.ozet}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span>{haber.yazar}</span>
                            <span>•</span>
                            <time>
                              {new Date(haber.tarih).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </time>
                            <span>•</span>
                            <span>{haber.okunma} görüntülenme</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <HavaDurumu />
          <DovizKurlari />
          <NobetciEczaneler />
          <LigPuanDurumu />

          {/* Popüler Aramalar */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              Popüler Aramalar
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Göbeklitepe', 'Halfeti', 'Urfaspor', 'Harran', 'Balıklıgöl', 'GAP'].map((kelime) => (
                <Link
                  key={kelime}
                  href={`/arama?q=${encodeURIComponent(kelime)}`}
                  className="px-3 py-1 bg-gray-100 hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
                >
                  {kelime}
                </Link>
              ))}
            </div>
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
