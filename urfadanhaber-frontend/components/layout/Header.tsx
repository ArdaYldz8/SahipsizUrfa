'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AramaKutusu from '@/components/AramaKutusu';
import { getWeather, getCurrency, getPrayerTimes } from '@/lib/api/external';

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
    { name: 'GÜNCEL', href: '/', icon: null },
    { name: 'ŞANLIURFA', href: '/kategori/sanliurfa', icon: null },
    { name: 'TÜRKİYE', href: '/kategori/turkiye', icon: null },
    { name: 'SPOR', href: '/kategori/spor', icon: null },
    { name: 'EKONOMİ', href: '/kategori/ekonomi', icon: null },
    { name: 'EĞİTİM', href: '/kategori/egitim', icon: null },
    { name: 'SAĞLIK', href: '/kategori/saglik', icon: null },
    { name: 'KÜLTÜR SANAT', href: '/kategori/kultur-sanat', icon: null },
    { name: 'YAZARLAR', href: '/kose-yazarlari', icon: null },
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
                <div className="flex items-center gap-1.5 text-yellow-500 border-l border-gray-700 pl-4 font-medium">
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
      <div className={`bg-primary text-white shadow-md transition-all duration-300 z-50 ${scrolled ? 'fixed top-0 left-0 right-0' : 'relative'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 h-full overflow-x-auto no-scrollbar">
              {/* Home Icon */}
              <Link href="/" className="h-full px-3 flex items-center justify-center hover:bg-white/10 transition-colors border-r border-white/10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="h-full px-4 flex items-center font-bold text-sm tracking-wide hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  {category.name}
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

            {/* Extra Actions */}
            <div className="hidden md:flex items-center h-full border-l border-white/10 pl-4 ml-4">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div className={`md:hidden bg-[#1e3a8a] border-t border-white/10 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <nav className="flex flex-col p-4 space-y-2">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 hover:bg-white/10 rounded text-sm font-bold"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div className="border-b border-gray-200">
        <BreakingNews />
      </div>
    </header>
  );
}

import BreakingNews from '@/components/BreakingNews';
