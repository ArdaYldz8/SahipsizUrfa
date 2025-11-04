import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DovizKurlari from '@/components/sidebar/DovizKurlari';
import HavaDurumu from '@/components/sidebar/HavaDurumu';
import NobetciEczaneler from '@/components/sidebar/NobetciEczaneler';
import LigPuanDurumu from '@/components/sidebar/LigPuanDurumu';

interface Yazar {
  id: number;
  ad: string;
  slug: string;
  bio: string;
  avatar: string;
  uzmanlık: string;
  email: string;
  twitter?: string;
}

interface KoseYazisi {
  id: number;
  baslik: string;
  slug: string;
  ozet: string;
  tarih: string;
  okunma: number;
}

// Mock yazarlar
const yazarlar: Record<string, Yazar> = {
  'mehmet-yilmaz': {
    id: 1,
    ad: 'Prof. Dr. Mehmet Yılmaz',
    slug: 'mehmet-yilmaz',
    bio: 'Harran Üniversitesi Tarih Bölümü öğretim üyesi. Mezopotamya tarihi ve arkeolojisi üzerine çalışmalar yapıyor. 25 yıldır akademik kariyer devam ettiriyor ve Göbeklitepe kazılarında danışman olarak yer alıyor.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    uzmanlık: 'Tarih & Arkeoloji',
    email: 'myilmaz@harran.edu.tr',
    twitter: '@profmyilmaz'
  },
  'ayse-demir': {
    id: 2,
    ad: 'Ayşe Demir',
    slug: 'ayse-demir',
    bio: 'Gazeteci ve yazar. 20 yılı aşkın süredir yerel basında çalışıyor. Şanlıurfa\'nın kültürel mirası, mutfak kültürü ve geleneksel el sanatları üzerine yazıyor. Çeşitli ulusal gazetelerde de köşe yazıları yayınlanıyor.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    uzmanlık: 'Kültür & Sanat',
    email: 'ayse.demir@email.com',
    twitter: '@aysedemir'
  },
  'ahmet-kaya': {
    id: 3,
    ad: 'Ahmet Kaya',
    slug: 'ahmet-kaya',
    bio: 'Ekonomi uzmanı. GAP Bölge Kalkınma İdaresi\'nde ekonomi danışmanı olarak çalışıyor. Bölgesel kalkınma, tarım ekonomisi ve sürdürülebilir kalkınma konularında görüş bildiriyor.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    uzmanlık: 'Ekonomi',
    email: 'ahmetkaya@email.com'
  },
};

// Mock köşe yazıları
const koseYazilari: Record<string, KoseYazisi[]> = {
  'mehmet-yilmaz': [
    {
      id: 1,
      baslik: 'Göbeklitepe\'nin Dünya Tarihindeki Yeri',
      slug: 'gobeklitepenin-dunya-tarihindeki-yeri',
      ozet: '12 bin yıl önce inşa edilen Göbeklitepe, tarihin bilinen en eski tapınak kompleksi olarak insanlık tarihini yeniden yazıyor.',
      tarih: '2025-11-04T10:00:00',
      okunma: 5432
    },
    {
      id: 2,
      baslik: 'Harran\'ın Kadim Üniversitesi',
      slug: 'harranin-kadim-universitesi',
      ozet: 'Harran Üniversitesi, İslam\'ın altın çağında bilim ve felsefenin merkezi olmuştur.',
      tarih: '2025-11-01T09:00:00',
      okunma: 3421
    },
    {
      id: 3,
      baslik: 'Urfa Kalesi\'nin Tarihi Önemi',
      slug: 'urfa-kalesinin-tarihi-onemi',
      ozet: 'Şanlıurfa Kalesi, bölgenin stratejik konumunun bir göstergesi olarak tarihin her döneminde önemli rol oynamıştır.',
      tarih: '2025-10-28T14:30:00',
      okunma: 2876
    },
  ],
  'ayse-demir': [
    {
      id: 4,
      baslik: 'Urfa Mutfağının Eşsiz Lezzetleri',
      slug: 'urfa-mutfaginin-essiz-lezzetleri',
      ozet: 'Şanlıurfa mutfağı, Mezopotamya\'nın zengin kültürel mirasını sofralara taşıyor.',
      tarih: '2025-11-03T11:00:00',
      okunma: 4321
    },
    {
      id: 5,
      baslik: 'Geleneksel El Sanatlarımız',
      slug: 'geleneksel-el-sanatlarimiz',
      ozet: 'Urfa\'nın geleneksel el sanatları, kuşaktan kuşağa aktarılan bir kültürel miras.',
      tarih: '2025-10-30T10:00:00',
      okunma: 3654
    },
  ],
  'ahmet-kaya': [
    {
      id: 6,
      baslik: 'GAP\'ın Ekonomiye Katkıları',
      slug: 'gapin-ekonomiye-katkilari',
      ozet: 'Güneydoğu Anadolu Projesi, bölgenin ekonomik dönüşümünde kilit rol oynuyor.',
      tarih: '2025-11-02T13:00:00',
      okunma: 3876
    },
    {
      id: 7,
      baslik: 'Tarımda Dijital Dönüşüm',
      slug: 'tarimda-dijital-donusum',
      ozet: 'Dijital teknolojiler, Urfa\'nın tarım sektöründe verimliliği artırıyor.',
      tarih: '2025-10-29T09:30:00',
      okunma: 2987
    },
  ],
};

function getYazar(slug: string): Yazar | null {
  return yazarlar[slug] || null;
}

function getYazarKoseYazilari(slug: string): KoseYazisi[] {
  return koseYazilari[slug] || [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const yazar = getYazar(slug);

  if (!yazar) {
    return {
      title: 'Yazar Bulunamadı',
    };
  }

  return {
    title: `${yazar.ad} - Köşe Yazıları | UrfadanHaber`,
    description: yazar.bio,
  };
}

export default async function YazarDetay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const yazar = getYazar(slug);

  if (!yazar) {
    notFound();
  }

  const yazilar = getYazarKoseYazilari(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ana İçerik */}
        <div className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6">
            <ol className="flex items-center space-x-2 text-gray-600">
              <li><Link href="/" className="hover:text-primary">Ana Sayfa</Link></li>
              <li>/</li>
              <li><Link href="/kose-yazarlari" className="hover:text-primary">Köşe Yazarları</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{yazar.ad}</li>
            </ol>
          </nav>

          {/* Yazar Profil Kartı */}
          <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-lg p-8 mb-8 shadow-md">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white shadow-lg">
                <Image
                  src={yazar.avatar}
                  alt={yazar.ad}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{yazar.ad}</h1>
                <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {yazar.uzmanlık}
                </span>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {yazar.bio}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <a href={`mailto:${yazar.email}`} className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {yazar.email}
                  </a>
                  {yazar.twitter && (
                    <a href={`https://twitter.com/${yazar.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                      </svg>
                      {yazar.twitter}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Köşe Yazıları */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Köşe Yazıları</h2>
          </div>

          {yazilar.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Henüz yazı yok</h3>
              <p className="text-gray-500">Bu yazar henüz yazı yayınlamamıştır.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {yazilar.map((yazi) => (
                <article
                  key={yazi.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors flex-1">
                      {yazi.baslik}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(yazi.tarih).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {yazi.ozet}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span>{yazi.okunma.toLocaleString('tr-TR')} okuma</span>
                    </div>
                    <button className="text-primary font-semibold hover:underline text-sm">
                      Devamını Oku →
                    </button>
                  </div>
                </article>
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

          {/* Diğer Yazarlar */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Diğer Yazarlar
            </h3>
            <div className="space-y-3">
              {Object.values(yazarlar)
                .filter(y => y.slug !== slug)
                .slice(0, 4)
                .map((y) => (
                  <Link
                    key={y.id}
                    href={`/kose-yazarlari/${y.slug}`}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={y.avatar}
                        alt={y.ad}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{y.ad}</p>
                      <p className="text-xs text-gray-500 truncate">{y.uzmanlık}</p>
                    </div>
                  </Link>
                ))}
            </div>
            <Link
              href="/kose-yazarlari"
              className="block mt-4 text-center text-primary font-semibold text-sm hover:underline"
            >
              Tüm Yazarlar →
            </Link>
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
