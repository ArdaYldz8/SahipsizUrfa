import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">UrfadanHaber</h3>
            <p className="text-sm">
              Şanlıurfa ve bölgesinden son dakika haberleri, yerel haberler, ulusal haberler ve daha fazlası.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Ana Sayfa</Link></li>
              <li><Link href="/kategori/sanliurfa" className="hover:text-white">Şanlıurfa</Link></li>
              <li><Link href="/kategori/turkiye" className="hover:text-white">Türkiye</Link></li>
              <li><Link href="/kose-yazarlari" className="hover:text-white">Köşe Yazarları</Link></li>
              <li><Link href="/taziyeler" className="hover:text-white">Taziyeler</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/kategori/spor" className="hover:text-white">Spor</Link></li>
              <li><Link href="/kategori/magazin" className="hover:text-white">Magazin</Link></li>
              <li><Link href="/kategori/ekonomi" className="hover:text-white">Ekonomi</Link></li>
              <li><Link href="/kategori/saglik" className="hover:text-white">Sağlık</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@urfadanhaber.com</li>
              <li>Tel: +90 (414) XXX XX XX</li>
              <li className="flex gap-3 mt-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center">
          <p>&copy; {currentYear} UrfadanHaber. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
