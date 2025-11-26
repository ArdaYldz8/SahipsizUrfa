import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DovizKurlari from '@/components/sidebar/DovizKurlari';
import HavaDurumu from '@/components/sidebar/HavaDurumu';
import NobetciEczaneler from '@/components/sidebar/NobetciEczaneler';
import LigPuanDurumu from '@/components/sidebar/LigPuanDurumu';
import { getNewsDetail, getNews } from '@/lib/api/backend';

// Tarih formatlama fonksiyonu
function formatTarih(dateString: string): string {
  const date = new Date(dateString);
  const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  return `${date.getDate()} ${aylar[date.getMonth()]} ${date.getFullYear()}`;
}

// Saat formatlama fonksiyonu
function formatSaat(dateString: string): string {
  const date = new Date(dateString);
  const saat = date.getHours().toString().padStart(2, '0');
  const dakika = date.getMinutes().toString().padStart(2, '0');
  return `${saat}:${dakika}`;
}

// Varsayılan görsel
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop';

export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const haber = await getNewsDetail(slug);

  if (!haber) {
    return {
      title: 'Haber Bulunamadı',
    };
  }

  return {
    title: `${haber.headline} | UrfadanHaber`,
    description: haber.description,
    openGraph: {
      title: haber.headline,
      description: haber.description || '',
      images: haber.image ? [haber.image] : undefined,
      type: 'article',
      publishedTime: haber.datePublished,
    },
  };
}

export default async function HaberDetay({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const haber = await getNewsDetail(slug);

  if (!haber) {
    notFound();
  }

  // İlgili haberleri çek
  const tumHaberler = await getNews();
  const ilgiliHaberler = tumHaberler
    .filter(h => h.category === haber.category && h.id !== haber.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <div className="relative h-[500px] w-full bg-black">
        <Image
          src={haber.image || DEFAULT_IMAGE}
          alt={haber.headline || 'Haber görseli'}
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Breadcrumb Overlay */}
        <div className="absolute top-6 left-0 right-0">
          <div className="container mx-auto px-4">
            <nav className="text-sm">
              <ol className="flex items-center space-x-2 text-white/80">
                <li><Link href="/" className="hover:text-white">Ana Sayfa</Link></li>
                <li>/</li>
                {haber.category && (
                  <>
                    <li><span className="capitalize">{haber.category}</span></li>
                  </>
                )}
              </ol>
            </nav>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              {haber.category && (
                <span className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase mb-4">
                  {haber.category}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
                {haber.headline}
              </h1>
              <div className="flex items-center gap-6 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{formatTarih(haber.datePublished)}, {formatSaat(haber.datePublished)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span>{haber.publisher || 'UrfadanHaber'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              {/* Description/Lead */}
              {haber.description && (
                <p className="text-xl text-gray-700 font-medium leading-relaxed mb-8 pb-8 border-b-2 border-gray-100">
                  {haber.description}
                </p>
              )}

              {/* Article Body */}
              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: haber.content || '' }}
              />

              {/* Social Share */}
              <div className="mt-12 pt-8 border-t-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Haberi Paylaş</h3>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                    Twitter
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.362.792 2.678 1.04 2.861.248.181 3.387 5.168 8.192 7.247 1.144.495 2.039.79 2.737.987 1.148.365 2.194.314 3.018.19.922-.138 1.76-.564 2.009-1.12.248-.556.248-1.034.173-1.12-.075-.087-.248-.149-.545-.298z" />
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            </article>

            {/* Related News */}
            {ilgiliHaberler.length > 0 && (
              <section className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                  İlgili Haberler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ilgiliHaberler.map((ilgiliHaber) => (
                    <Link
                      key={ilgiliHaber.id}
                      href={`/haber/${ilgiliHaber.id}`}
                      className="group block"
                    >
                      <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all h-full border border-gray-100">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={ilgiliHaber.image || DEFAULT_IMAGE}
                            alt={ilgiliHaber.headline || 'Haber görseli'}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {ilgiliHaber.headline}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {ilgiliHaber.description}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <HavaDurumu />
              <DovizKurlari />
              <NobetciEczaneler />
              <LigPuanDurumu />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
