import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DovizKurlari from '@/components/sidebar/DovizKurlari';
import HavaDurumu from '@/components/sidebar/HavaDurumu';
import NobetciEczaneler from '@/components/sidebar/NobetciEczaneler';
import LigPuanDurumu from '@/components/sidebar/LigPuanDurumu';
import { getNewsByCategory } from '@/lib/api/backend';
import { getCategoryConfig } from '@/lib/constants/categories';
import CategoryHero from '@/components/category/CategoryHero';

// Tarih formatlama fonksiyonu
function formatTarih(dateString: string): string {
  const date = new Date(dateString);
  const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  return `${date.getDate()} ${aylar[date.getMonth()]} ${date.getFullYear()}`;
}

// Varsayılan görsel
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop';

const ITEMS_PER_PAGE = 12; // Increased for better grid layout

export async function generateMetadata({ params, searchParams }: {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ page?: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;
  const config = getCategoryConfig(slug);

  const pageNumber = page ? parseInt(page) : 1;
  const pageTitle = pageNumber > 1
    ? `${config.label} Haberleri - Sayfa ${pageNumber} | UrfadanHaber`
    : `${config.label} Haberleri | UrfadanHaber`;

  return {
    title: pageTitle,
    description: config.description,
    openGraph: {
      title: `${config.label} Haberleri`,
      description: config.description,
    },
  };
}

export default async function KategoriSayfasi({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const config = getCategoryConfig(slug);

  const currentPage = page ? parseInt(page) : 1;

  // Bu kategoriye ait tüm haberleri çek
  const allHaberler = await getNewsByCategory(slug);

  // İlk 5 haberi manşet (hero) için ayır
  const heroNews = allHaberler.slice(0, 5);

  // Geri kalanları grid için ayır (Pagination bu kalanlar üzerinden yapılacak)
  const remainingNews = allHaberler.slice(5);
  const totalPages = Math.ceil(remainingNews.length / ITEMS_PER_PAGE);

  // Sayfalama için veriyi dilimle
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const gridNews = remainingNews.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Category Header with Dynamic Color */}
      <div className={`mb-8 border-b-4 pb-4 ${config.borderClass}`}>
        <h1 className={`text-4xl font-black uppercase tracking-tight ${config.textClass}`}>
          {config.label}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">{config.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ana İçerik */}
        <div className="lg:col-span-2">

          {/* HERO SLIDER (Only on first page) */}
          {currentPage === 1 && heroNews.length > 0 && (
            <CategoryHero news={heroNews} config={config} />
          )}

          {/* Haberler Grid */}
          {gridNews.length === 0 && heroNews.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-gray-700">Bu kategoride henüz haber bulunmuyor.</p>
            </div>
          ) : (
            <>
              {gridNews.length > 0 && (
                <h3 className={`text-xl font-bold text-gray-900 mb-6 border-l-4 pl-3 ${config.borderClass}`}>
                  Diğer Haberler
                </h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gridNews.map((haber) => (
                  <Link
                    key={haber.id}
                    href={`/haber/${haber.id}`}
                    className="block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all group border border-gray-100"
                  >
                    <article>
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={haber.image || DEFAULT_IMAGE}
                          alt={haber.headline || 'Haber görseli'}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute top-0 left-0 ${config.bgClass} text-white text-xs font-bold px-2 py-1 rounded-br-lg`}>
                          {config.label}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {haber.headline}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{haber.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {formatTarih(haber.datePublished)}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              {/* Previous Button */}
              {currentPage > 1 && (
                <Link
                  href={`/kategori/${slug}?page=${currentPage - 1}`}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition border border-gray-300"
                >
                  ←
                </Link>
              )}

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const showPage =
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                if (!showPage) {
                  if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                }

                return pageNum === currentPage ? (
                  <span
                    key={pageNum}
                    className={`px-4 py-2 text-white rounded-lg font-semibold ${config.bgClass}`}
                  >
                    {pageNum}
                  </span>
                ) : (
                  <Link
                    key={pageNum}
                    href={`/kategori/${slug}?page=${pageNum}`}
                    className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition border border-gray-300"
                  >
                    {pageNum}
                  </Link>
                );
              })}

              {/* Next Button */}
              {currentPage < totalPages && (
                <Link
                  href={`/kategori/${slug}?page=${currentPage + 1}`}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition border border-gray-300"
                >
                  →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Sidebar Reklam */}
          <div className="bg-gray-100 rounded-lg h-[300px] flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <span className="block text-2xl font-bold mb-1">REKLAM</span>
              <span className="text-sm">300x250</span>
            </div>
          </div>

          <HavaDurumu />
          <DovizKurlari />
          <NobetciEczaneler />
          <LigPuanDurumu />
        </div>
      </div>
    </div>
  );
}
