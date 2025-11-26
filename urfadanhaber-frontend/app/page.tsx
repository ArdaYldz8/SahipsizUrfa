import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import DovizKurlari from '@/components/sidebar/DovizKurlari';
import HavaDurumu from '@/components/sidebar/HavaDurumu';
import NobetciEczaneler from '@/components/sidebar/NobetciEczaneler';
import LigPuanDurumu from '@/components/sidebar/LigPuanDurumu';
import MostReadWidget from '@/components/sidebar/MostReadWidget';
import AuthorsWidget from '@/components/sidebar/AuthorsWidget';
import HeroSection from '@/components/home/HeroSection';
import HeadlinesStrip from '@/components/home/HeadlinesStrip';
import CategoryBlock from '@/components/home/CategoryBlock';
import { getNews } from '@/lib/api/backend';

export const metadata: Metadata = {
  title: 'UrfadanHaber - Şanlıurfa\'nın En Güncel Haber Sitesi',
  description: 'Şanlıurfa son dakika haberleri, güncel gelişmeler ve yerel haberler UrfadanHaber\'de.',
  openGraph: {
    title: 'UrfadanHaber - Şanlıurfa\'nın En Güncel Haber Sitesi',
    description: 'Şanlıurfa son dakika haberleri, güncel gelişmeler ve yerel haberler UrfadanHaber\'de.',
    type: 'website',
  },
};

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
  // Backend'den haberleri çek
  const haberlerRaw = await getNews();

  // Eğer haber yoksa boş mesaj göster
  if (!haberlerRaw || haberlerRaw.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-gray-700">Henüz haber eklenmemiş. Lütfen backend servisini kontrol edin.</p>
        </div>
      </div>
    );
  }

  // Map data to match component interfaces
  const haberler = haberlerRaw.map((item: any) => ({
    id: item.id,
    title: item.headline,
    slug: item.slug || item.id.toString(), // Use actual slug from backend, fallback to ID
    image_url: item.image || DEFAULT_IMAGE,
    category: item.category || 'GÜNCEL',
    published_at: item.datePublished,
    description: item.description
  }));

  // Split data for different sections
  // 1. Hero Section (Top 10: 5 Slider + 5 Side)
  const heroNews = haberler.slice(0, 10);

  // 2. Headlines Strip (Next 10)
  const stripNews = haberler.slice(10, 20);

  // 3. Main Content Grid (Remaining)
  const gridNews = haberler.slice(5); // Show more news (starting from index 5)

  // Mock data for categories (using same news for demo)
  const sanliurfaNews = haberler.slice(0, 4);
  const sporNews = haberler.slice(4, 8);
  const ekonomiNews = haberler.slice(8, 12);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-6 pb-8">
        <HeroSection news={heroNews} />
      </section>

      {/* 2. Headlines Strip */}
      <section className="mb-8">
        <HeadlinesStrip news={stripNews.length > 0 ? stripNews : heroNews} />
      </section>

      {/* 3. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (News Grid & Categories) */}
          <div className="lg:col-span-2 space-y-10">

            {/* Latest News Grid */}
            <section>
              <div className="flex items-center justify-between mb-6 border-b-2 border-gray-100 pb-2">
                <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-primary pl-3">
                  SON HABERLER
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gridNews.length > 0 ? gridNews.map((haber: any) => (
                  <Link
                    key={haber.id}
                    href={`/haber/${haber.slug}`}
                    className="group block bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={haber.image_url}
                        alt={haber.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        {haber.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {haber.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {haber.description}
                      </p>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {formatTarih(haber.published_at)}
                      </span>
                    </div>
                  </Link>
                )) : (
                  <p className="text-gray-500 col-span-2">Daha fazla haber bulunamadı.</p>
                )}
              </div>
            </section>

            {/* Category Blocks */}
            <CategoryBlock title="ŞANLIURFA" href="/kategori/sanliurfa" news={sanliurfaNews} />
            <CategoryBlock title="SPOR" href="/kategori/spor" news={sporNews} color="text-red-600" />
            <CategoryBlock title="EKONOMİ" href="/kategori/ekonomi" news={ekonomiNews} color="text-green-600" />

          </div>

          {/* Right Column (Sidebar) */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="sticky top-24 space-y-8">
              <MostReadWidget news={heroNews.slice(0, 5)} />
              <AuthorsWidget />
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
