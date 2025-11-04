import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Sayfa Bulunamadı | UrfadanHaber',
  description: 'Aradığınız sayfa bulunamadı',
};

export default function NotFound() {
  const popularLinks = [
    { name: 'Ana Sayfa', href: '/', icon: '🏠' },
    { name: 'Şanlıurfa Haberleri', href: '/kategori/sanliurfa', icon: '📰' },
    { name: 'Son Dakika', href: '/kategori/turkiye', icon: '⚡' },
    { name: 'Spor', href: '/kategori/spor', icon: '⚽' },
    { name: 'Köşe Yazarları', href: '/kose-yazarlari', icon: '✍️' },
    { name: 'Taziyeler', href: '/taziyeler', icon: '🕊️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">404</h1>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Sayfa Bulunamadı
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
            </p>
            <p className="text-gray-500 text-sm">
              Lütfen adres çubuğundaki URL'yi kontrol edin veya aşağıdaki bağlantılardan birine tıklayın.
            </p>
          </div>

          {/* Search Box */}
          <div className="mb-8">
            <form action="/arama" method="get" className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="search"
                  name="q"
                  placeholder="Haber ara..."
                  className="w-full px-5 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition"
                  aria-label="Ara"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Popular Links */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popüler Sayfalar
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {popularLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-primary hover:text-white rounded-lg transition-colors group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Sorun devam ediyorsa{' '}
            <a href="mailto:info@urfadanhaber.com" className="text-primary hover:underline font-semibold">
              info@urfadanhaber.com
            </a>
            {' '}adresinden bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
