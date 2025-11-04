import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DovizKurlari from '@/components/sidebar/DovizKurlari';
import HavaDurumu from '@/components/sidebar/HavaDurumu';
import NobetciEczaneler from '@/components/sidebar/NobetciEczaneler';
import LigPuanDurumu from '@/components/sidebar/LigPuanDurumu';

export const metadata: Metadata = {
  title: 'Köşe Yazarları | UrfadanHaber',
  description: 'UrfadanHaber köşe yazarları ve güncel yazıları',
};

interface Yazar {
  id: number;
  ad: string;
  slug: string;
  bio: string;
  avatar: string;
  uzmanlık: string;
  yaziSayisi: number;
}

// Mock yazarlar
const yazarlar: Yazar[] = [
  {
    id: 1,
    ad: 'Prof. Dr. Mehmet Yılmaz',
    slug: 'mehmet-yilmaz',
    bio: 'Harran Üniversitesi Tarih Bölümü öğretim üyesi. Mezopotamya tarihi ve arkeolojisi üzerine çalışmalar yapıyor.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    uzmanlık: 'Tarih & Arkeoloji',
    yaziSayisi: 48
  },
  {
    id: 2,
    ad: 'Ayşe Demir',
    slug: 'ayse-demir',
    bio: 'Gazeteci ve yazar. 20 yılı aşkın süredir yerel basında çalışıyor. Şanlıurfa\'nın kültürel mirası üzerine yazıyor.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    uzmanlık: 'Kültür & Sanat',
    yaziSayisi: 156
  },
  {
    id: 3,
    ad: 'Ahmet Kaya',
    slug: 'ahmet-kaya',
    bio: 'Ekonomi uzmanı. Bölgesel kalkınma ve tarım ekonomisi konularında görüş bildiriyor.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    uzmanlık: 'Ekonomi',
    yaziSayisi: 92
  },
  {
    id: 4,
    ad: 'Dr. Zeynep Arslan',
    slug: 'zeynep-arslan',
    bio: 'Sağlık Bakanlığı\'nda çalışan uzman doktor. Halk sağlığı ve sağlık politikaları üzerine yazıyor.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    uzmanlık: 'Sağlık',
    yaziSayisi: 67
  },
  {
    id: 5,
    ad: 'Mustafa Öztürk',
    slug: 'mustafa-ozturk',
    bio: 'Spor yazarı. Yerel ve ulusal futbol takımlarını yakından takip ediyor.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    uzmanlık: 'Spor',
    yaziSayisi: 203
  },
  {
    id: 6,
    ad: 'Fatma Şahin',
    slug: 'fatma-sahin',
    bio: 'Eğitimci ve yazar. Eğitim sistemindeki sorunlar ve çözüm önerileri üzerine yazıyor.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    uzmanlık: 'Eğitim',
    yaziSayisi: 84
  },
];

export default function KoseYazarlari() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ana İçerik */}
        <div className="lg:col-span-2">
          {/* Başlık */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Köşe Yazarları</h1>
            <p className="text-gray-600">Alanında uzman yazarlarımızın görüş ve analizleri</p>
            <div className="mt-4 h-1 w-20 bg-primary rounded"></div>
          </div>

          {/* Yazarlar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {yazarlar.map((yazar) => (
              <Link
                key={yazar.id}
                href={`/kose-yazarlari/${yazar.slug}`}
                className="group"
              >
                <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden h-full">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                        <Image
                          src={yazar.avatar}
                          alt={yazar.ad}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
                          {yazar.ad}
                        </h3>
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                          {yazar.uzmanlık}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {yazar.bio}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span>{yazar.yaziSayisi} yazı</span>
                      </div>
                      <span className="text-primary font-semibold text-sm group-hover:underline">
                        Yazılarını Oku →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <HavaDurumu />
          <DovizKurlari />
          <NobetciEczaneler />
          <LigPuanDurumu />

          {/* En Çok Okunan Köşe Yazıları */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              En Çok Okunan Yazılar
            </h3>
            <ol className="space-y-3">
              {[
                { yazar: 'Prof. Dr. Mehmet Yılmaz', baslik: 'Göbeklitepe\'nin Gizemi', okunma: 5432 },
                { yazar: 'Ayşe Demir', baslik: 'Şanlıurfa\'nın Kadim Mutfağı', okunma: 4321 },
                { yazar: 'Ahmet Kaya', baslik: 'Tarımda Dijitalleşme', okunma: 3876 },
                { yazar: 'Mustafa Öztürk', baslik: 'Urfaspor\'un Şampiyonluk Yolu', okunma: 3654 },
                { yazar: 'Dr. Zeynep Arslan', baslik: 'Pandemi Sonrası Sağlık', okunma: 3210 },
              ].map((yazi, i) => (
                <li key={i} className="flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer">
                  <span className="font-bold text-primary text-lg">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 font-medium line-clamp-2">{yazi.baslik}</p>
                    <p className="text-xs text-gray-500 mt-1">{yazi.yazar} • {yazi.okunma.toLocaleString('tr-TR')} okuma</p>
                  </div>
                </li>
              ))}
            </ol>
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
