'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AramaKutusu from '@/components/AramaKutusu';
import { getWeather, getCurrency, getPrayerTimes } from '@/lib/api/external';
import BreakingNews from '@/components/BreakingNews';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [weather, setWeather] = useState<{ temp: number; unit: string } | null>(null);
  const [currency, setCurrency] = useState<{ usd: number; eur?: number } | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ vakit: string; saat: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const weatherData = await getWeather();
      if (weatherData) setWeather(weatherData);

      const currencyData = await getCurrency();
      if (currencyData) setCurrency(currencyData);

      const prayerData = await getPrayerTimes();
      if (prayerData && prayerData.length > 0) {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const next = prayerData.find((p: any) => p.saat > currentTime);
        if (next) setNextPrayer(next);
      }
    }
    fetchData();

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'GÜNCEL', href: '/' },
    { name: 'ŞANLIURFA', href: '/kategori/sanliurfa' },
    { name: 'TÜRKİYE', href: '/kategori/turkiye' },
    { name: 'SPOR', href: '/kategori/spor' },
    { name: 'EKONOMİ', href: '/kategori/ekonomi' },
    { name: 'EĞİTİM', href: '/kategori/egitim' },
    { name: 'SAĞLIK', href: '/kategori/saglik' },
    { name: 'KÜLTÜR', href: '/kategori/kultur-sanat' },
    { name: 'FOTO', href: '/foto-galeri' },
    { name: 'VİDEO', href: '/video-galeri' },
    { name: 'TAZİYE', href: '/taziye' },
    { name: 'BURÇLAR', href: '/burc' },
    { name: 'YÖRESEL', href: '/yoresel-yemekler' },
    { name: 'DİNİ BİLGİLER', href: '/dini-bilgiler' },
    { name: 'SORU SOR', href: '/uzmanina-sor' },
    { name: 'CANLI', href: '/canli-yayin', isLive: true },
  ];

  return (
    <header className="font-sans">
      {/* Top Bar - Dense Data */}
      <div className="bg-[#0f172a] text-gray-300 text-xs border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-8 flex justify-between items-center">
          {/* Left: Date & Location */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })}
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-gray-400 border-l border-gray-700 pl-4">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Şanlıurfa
            </span>
          </div>

          {/* Right: Financials & Weather */}
          <div className="flex items-center gap-4 overflow-hidden">
            {/* Ticker Effect for Data */}
            <div className="flex items-center gap-4 animate-none md:animate-none">
              {currency && (
                <>
                  <div className="flex items-center gap-1 text-green-400">
                    <span className="font-bold">$</span>
                    <span>{currency.usd?.toFixed(2)}</span>
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <span className="font-bold">€</span>
                    <span>{currency.eur?.toFixed(2)}</span>
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  </div>
                </>
              )}
              {weather && (
                <div className="flex items-center gap-1 text-blue-300 border-l border-gray-700 pl-4">
                  <span className="font-bold">{weather.temp}°</span>
                  <span className="text-gray-400 hidden sm:inline">Parçalı Bulutlu</span>
                </div>
              )}
              {nextPrayer && (
                <div className="flex items-center gap-1.5 text-secondary border-l border-gray-700 pl-4 font-medium">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
                  <span>{nextPrayer.vakit}: {nextPrayer.saat}</span>
                </div>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-4 border-l border-gray-700">
              <a href="#" className="hover:text-white transition-colors"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></a>
              <a href="#" className="hover:text-white transition-colors"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Area (Logo & Search) */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-64 h-16 transition-transform group-hover:scale-105 duration-300">
              <Image
                src="/logo.svg"
                alt="UrfadanHaber Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="w-full md:w-auto flex items-center gap-4">
            {/* Ad Space Placeholder (Optional) */}
            <div className="hidden lg:block w-[400px] h-[60px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs border border-gray-200 border-dashed">
              REKLAM ALANI 468x60
            </div>
            <div className="flex-1 md:flex-none">
              <AramaKutusu />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <div className={`bg-primary text-white shadow-md transition-all duration-300 z-50 border-b-4 border-secondary ${scrolled ? 'fixed top-0 left-0 right-0' : 'relative'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5 h-full overflow-x-auto no-scrollbar">
              {/* Home Icon */}
              <Link href="/" className="h-full px-2 flex items-center justify-center hover:bg-white/10 hover:text-secondary transition-colors border-r border-white/10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`h-full px-1.5 flex items-center font-bold text-[12px] lg:text-[13px] hover:bg-white/10 hover:text-secondary transition-colors whitespace-nowrap ${
                    // @ts-ignore
                    category.isLive ? 'text-red-400 animate-pulse' : ''
                    }`}
                >
                  {category.name}
                  {/* @ts-ignore */}
                  {category.isLive && (
                    <span className="ml-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Mobile Logo (Centered) */}
            <Link href="/" className="md:hidden absolute left-1/2 transform -translate-x-1/2 h-8 w-32">
              <Image
                src="/logo.svg"
                alt="UrfadanHaber"
                fill
                className="object-contain brightness-0 invert"
              />
            </Link>

            {/* Extra Actions */}
            <div className="hidden md:flex items-center h-full border-l border-white/10 pl-4 ml-4">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`md:hidden fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-sm transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="relative w-32 h-8">
                <Image
                  src="/logo.svg"
                  alt="UrfadanHaber"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-2">
              <div className="space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-medium text-lg"
                >
                  <svg className="w-5 h-5 mr-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  Ana Sayfa
                </Link>

                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors font-medium text-lg ${
                      // @ts-ignore
                      category.isLive ? 'text-red-400 bg-red-400/10' : 'text-white hover:bg-white/10'
                      }`}
                  >
                    {/* @ts-ignore */}
                    {category.isLive && <span className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></span>}
                    {category.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="flex justify-center gap-6 text-white/60">
                <a href="#" className="hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></a>
                <a href="#" className="hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg></a>
              </div>
              <div className="mt-4 text-center text-xs text-white/40">
                &copy; {new Date().getFullYear()} UrfadanHaber
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breaking News Ticker */}
      <BreakingNews />
    </header>
  );
}
