import { Metadata } from 'next';
import DovizKurlari from '@/components/sidebar/DovizKurlari';
import HavaDurumu from '@/components/sidebar/HavaDurumu';
import NobetciEczaneler from '@/components/sidebar/NobetciEczaneler';
import LigPuanDurumu from '@/components/sidebar/LigPuanDurumu';

export const metadata: Metadata = {
  title: 'Taziyeler | UrfadanHaber',
  description: 'Şanlıurfa ve çevresinden taziye ilanları',
};

interface Taziye {
  id: number;
  vefatEden: string;
  vefatTarihi: string;
  cenazeTarihi: string;
  cenazeYeri: string;
  ailesi: string;
  mesaj?: string;
}

// Mock taziye ilanları
const taziyeler: Taziye[] = [
  {
    id: 1,
    vefatEden: 'Ahmet YILMAZ',
    vefatTarihi: '2025-11-03',
    cenazeTarihi: '2025-11-04T14:00:00',
    cenazeYeri: 'Haliliye Merkez Camii',
    ailesi: 'YILMAZ Ailesi',
    mesaj: 'Sevgili babamızı kaybetmenin derin üzüntüsünü yaşıyoruz.'
  },
  {
    id: 2,
    vefatEden: 'Fatma DEMİR',
    vefatTarihi: '2025-11-03',
    cenazeTarihi: '2025-11-04T13:00:00',
    cenazeYeri: 'Karaköprü Ulu Camii',
    ailesi: 'DEMİR Ailesi',
    mesaj: 'Annemizin vefatı dolayısıyla derin acımızı paylaşıyoruz.'
  },
  {
    id: 3,
    vefatEden: 'Mehmet KAYA',
    vefatTarihi: '2025-11-02',
    cenazeTarihi: '2025-11-03T15:30:00',
    cenazeYeri: 'Eyyübiye Merkez Camii',
    ailesi: 'KAYA Ailesi'
  },
  {
    id: 4,
    vefatEden: 'Ayşe ÖZKAN',
    vefatTarihi: '2025-11-02',
    cenazeTarihi: '2025-11-03T14:00:00',
    cenazeYeri: 'Siverek Ulu Camii',
    ailesi: 'ÖZKAN Ailesi',
    mesaj: 'Allah rahmet eylesin.'
  },
  {
    id: 5,
    vefatEden: 'Ali ARSLAN',
    vefatTarihi: '2025-11-01',
    cenazeTarihi: '2025-11-02T13:30:00',
    cenazeYeri: 'Viranşehir Merkez Camii',
    ailesi: 'ARSLAN Ailesi'
  },
];

export default function Taziyeler() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ana İçerik */}
        <div className="lg:col-span-2">
          {/* Başlık */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Taziyeler</h1>
            <p className="text-gray-600">Allah rahmet eylesin, mekanları cennet olsun</p>
            <div className="mt-4 h-1 w-20 bg-gray-800 rounded"></div>
          </div>

          {/* Bilgilendirme */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Taziye ilanı yayınlatmak için <a href="mailto:info@urfadanhaber.com" className="font-semibold underline">info@urfadanhaber.com</a> adresine e-posta gönderebilir veya <span className="font-semibold">0414 123 45 67</span> numaralı telefonu arayabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Taziye İlanları */}
          <div className="space-y-4">
            {taziyeler.map((taziye) => (
              <article
                key={taziye.id}
                className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Vefat Eden */}
                <div className="text-center mb-4 pb-4 border-b-2 border-gray-200">
                  <div className="inline-block">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{taziye.vefatEden}</h3>
                  <p className="text-sm text-gray-600">
                    Vefat Tarihi: {new Date(taziye.vefatTarihi).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Cenaze Bilgileri */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">CENAZE TARİHİ</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(taziye.cenazeTarihi).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        Saat: {new Date(taziye.cenazeTarihi).toLocaleTimeString('tr-TR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">CENAZE YERİ</p>
                      <p className="font-semibold text-gray-900">{taziye.cenazeYeri}</p>
                    </div>
                  </div>
                </div>

                {/* Mesaj */}
                {taziye.mesaj && (
                  <div className="mb-4">
                    <p className="text-gray-700 italic text-center">"{taziye.mesaj}"</p>
                  </div>
                )}

                {/* Aile */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Ailesi: <span className="font-semibold text-gray-900">{taziye.ailesi}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Başınız sağ olsun</p>
                </div>
              </article>
            ))}
          </div>

          {/* Dua */}
          <div className="mt-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6 text-center border border-gray-300">
            <svg className="w-8 h-8 mx-auto text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-gray-700 font-serif italic text-lg">
              "Allah rahmet eylesin, mekanları cennet olsun."
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Başınız sağ olsun, Allah sabır versin.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <HavaDurumu />
          <DovizKurlari />
          <NobetciEczaneler />
          <LigPuanDurumu />

          {/* Taziye İlanı Verme */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Taziye İlanı
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Taziye ilanınızı ücretsiz olarak yayınlatabilirsiniz.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:info@urfadanhaber.com" className="hover:underline">
                  info@urfadanhaber.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>0414 123 45 67</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition">
              İlan Ver
            </button>
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
