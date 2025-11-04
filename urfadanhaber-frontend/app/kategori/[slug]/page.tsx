import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DovizKurlari from '@/components/sidebar/DovizKurlari';
import HavaDurumu from '@/components/sidebar/HavaDurumu';
import NobetciEczaneler from '@/components/sidebar/NobetciEczaneler';
import LigPuanDurumu from '@/components/sidebar/LigPuanDurumu';
import { getHaberler, getKategoriler } from '@/lib/api/strapi';

// Tarih formatlama fonksiyonu
function formatTarih(dateString: string): string {
  const date = new Date(dateString);
  const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  return `${date.getDate()} ${aylar[date.getMonth()]} ${date.getFullYear()}`;
}

// Varsayılan görsel
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop';

const ITEMS_PER_PAGE = 9;

export async function generateMetadata({ params, searchParams }: {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ page?: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;

  // Kategorileri Strapi'den çek
  const kategoriler = await getKategoriler();
  const kategori = kategoriler.find(k => k.slug === slug);

  if (!kategori) {
    return {
      title: 'Kategori Bulunamadı',
    };
  }

  const pageNumber = page ? parseInt(page) : 1;
  const pageTitle = pageNumber > 1
    ? `${kategori.ad} Haberleri - Sayfa ${pageNumber} | UrfadanHaber`
    : `${kategori.ad} Haberleri | UrfadanHaber`;

  return {
    title: pageTitle,
    description: kategori.aciklama || `${kategori.ad} kategorisinden son haberler`,
    openGraph: {
      title: `${kategori.ad} Haberleri`,
      description: kategori.aciklama || `${kategori.ad} kategorisinden son haberler`,
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

  // Strapi'den kategorileri ve haberleri çek
  const kategoriler = await getKategoriler();
  const kategori = kategoriler.find(k => k.slug === slug);

  if (!kategori) {
    notFound();
  }

  const currentPage = page ? parseInt(page) : 1;

  // Bu kategoriye ait tüm haberleri çek
  const allHaberler = await getHaberler({ kategori: slug, limit: 100 });
  const totalPages = Math.ceil(allHaberler.length / ITEMS_PER_PAGE);

  // Sayfalama için veriyi dilimle
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const haberler = allHaberler.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ana İçerik */}
        <div className="lg:col-span-2">
          {/* Kategori Başlığı */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{kategori.ad}</h1>
            <p className="text-gray-600">{kategori.aciklama}</p>
          </div>

          {/* Haberler Grid */}
          {haberler.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-gray-700">Bu kategoride henüz haber bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {haberler.map((haber) => (
                <Link
                  key={haber.id}
                  href={`/haber/${haber.slug}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <article>
                    <div className="relative h-48">
                      <Image
                        src={haber.gorsel || DEFAULT_IMAGE}
                        alt={haber.baslik || 'Haber görseli'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {haber.baslik}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{haber.ozet}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatTarih(haber.publishedAt)}</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{haber.okunma}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2">
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
                // Sadece mevcut sayfanın etrafındaki sayıları göster
                const showPage =
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                if (!showPage) {
                  // Üç nokta göster (sadece bir kez)
                  if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return (
                      <span key={pageNum} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return pageNum === currentPage ? (
                  <span
                    key={pageNum}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-semibold"
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
        <div className="space-y-6">
          <HavaDurumu />
          <DovizKurlari />
          <NobetciEczaneler />
          <LigPuanDurumu />

          {/* Reklam Alanı */}
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-500">
            <span>Reklam Alanı<br />300x250</span>
          </div>
        </div>
      </div>
    </div>
  );
}
