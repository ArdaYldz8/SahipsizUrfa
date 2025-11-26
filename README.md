# UrfadanHaber - Modern Yerel Haber Portalı

Şanlıurfa ve bölgesine odaklanan, modern, SEO uyumlu ve yüksek performanslı haber sitesi projesi. Strapi CMS ile yönetilen içerik yapısı ve Next.js 16 ile geliştirilmiş performanslı frontend.

## 📋 İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Teknoloji Stack](#teknoloji-stack)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum](#kurulum)
- [Strapi Backend Yapılandırması](#strapi-backend-yapılandırması)
- [Frontend Yapılandırması](#frontend-yapılandırması)
- [API Entegrasyonları](#api-entegrasyonları)
- [Özellikler](#özellikler)
- [Bilinen Sorunlar ve Çözümler](#bilinen-sorunlar-ve-çözümler)
- [Geliştirme Notları](#geliştirme-notları)
- [Deployment](#deployment)
- [Komutlar](#komutlar)

---

## 🎯 Proje Hakkında

UrfadanHaber, Şanlıurfa ve bölgesine yönelik modern bir haber portalıdır. Proje, headless CMS yaklaşımı ile backend ve frontend'in tamamen ayrı çalıştığı bir mimari kullanır.

### Temel Özellikler
- ✅ Responsive ve mobil uyumlu tasarım
- ✅ SEO optimizasyonu (Next.js SSR/SSG)
- ✅ Kategori bazlı haber yönetimi
- ✅ Köşe yazarları bölümü
- ✅ Taziye ilanları
- ✅ Canlı döviz kurları (TCMB)
- ✅ Hava durumu (OpenWeatherMap)
- ✅ Nöbetçi eczaneler (CollectAPI)
- ✅ Lig puan durumu (CollectAPI)
- ✅ Sosyal medya paylaşım butonları
- ✅ Dark mode desteği (planlı)

---

## 🛠 Teknoloji Stack

### Frontend
| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| **Next.js** | 16.0.1 | React framework (App Router, Turbopack) |
| **React** | 19 | UI kütüphanesi |
| **TypeScript** | 5.x | Tip güvenliği |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Axios** | latest | HTTP client |
| **next/image** | built-in | Optimize edilmiş resim yönetimi |

### Backend
| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| **Strapi** | 5.30.0 | Headless CMS |
| **SQLite** | 11.3.0 | Veritabanı (better-sqlite3) |
| **Node.js** | 20.18.0 | Runtime environment |
| **TypeScript** | 5.x | Backend tip güvenliği |

### Harici API'ler
- **TCMB XML API** - Döviz kurları
- **OpenWeatherMap API** - Hava durumu
- **CollectAPI** - Nöbetçi eczane ve lig puan durumu

---

## 📁 Proje Yapısı

```
Insallah/
├── urfadanhaber-backend/           # Strapi CMS Backend
│   ├── .tmp/                       # Strapi geçici dosyalar
│   ├── config/                     # Strapi konfigürasyon
│   │   ├── admin.ts
│   │   ├── api.ts
│   │   ├── database.ts
│   │   ├── middlewares.ts
│   │   └── server.ts
│   ├── database/
│   │   └── migrations/
│   ├── public/
│   │   └── uploads/                # Medya dosyaları
│   ├── src/
│   │   ├── admin/
│   │   ├── api/                    # API endpoints
│   │   │   ├── haber/             # Content Type: Haber
│   │   │   ├── kategori/          # Content Type: Kategori
│   │   │   ├── yazar/             # Content Type: Yazar
│   │   │   └── taziye/            # Content Type: Taziye
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── urfadanhaber-frontend/          # Next.js Frontend
│   ├── app/                        # Next.js App Router
│   │   ├── (root)/
│   │   │   └── page.tsx           # Ana sayfa
│   │   ├── api/                    # API routes
│   │   │   ├── doviz/
│   │   │   ├── hava-durumu/
│   │   │   ├── nobetci-eczane/
│   │   │   └── puan-cetveli/
│   │   ├── kategori/
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Kategori sayfası
│   │   ├── haber/
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Haber detay sayfası
│   │   ├── kose-yazarlari/
│   │   ├── taziyeler/
│   │   ├── layout.tsx             # Root layout
│   │   ├── error.tsx              # Error boundary
│   │   ├── not-found.tsx          # 404 sayfası
│   │   └── global-error.tsx       # Global error handler
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── sidebar/
│   │       ├── DovizKurlari.tsx
│   │       ├── HavaDurumu.tsx
│   │       ├── NobetciEczaneler.tsx
│   │       └── LigPuanDurumu.tsx
│   ├── lib/
│   │   └── api/
│   │       ├── strapi.ts          # Strapi API helper
│   │       ├── doviz.ts
│   │       ├── hava-durumu.ts
│   │       ├── nobetci-eczane.ts
│   │       └── puan-cetveli.ts
│   ├── public/
│   │   └── images/
│   ├── styles/
│   │   └── globals.css
│   ├── .env.local                  # Environment variables
│   ├── .env.example
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── README.md                       # Bu dosya
```

---

## 🚀 Kurulum ve Çalıştırma

### 1. Backend (Go)

Backend servisi `urfadanhaber-backend` klasöründe bulunur.

```bash
cd urfadanhaber-backend
go run main.go
```

Backend `http://localhost:8080` adresinde çalışacaktır.

### 2. Frontend (Next.js)

Frontend uygulaması `urfadanhaber-frontend` klasöründe bulunur.

```bash
cd urfadanhaber-frontend
npm run dev
```

Frontend `http://localhost:3000` adresinde çalışacaktır.

---

## 🗄️ Strapi Backend Yapılandırması

### Content Types (İçerik Modelleri)

#### 1. Haber (Content Type: haber)

**Alanlar:**
| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `baslik` | Text (Short) | ✅ | Haber başlığı |
| `slug` | UID (attached to baslik) | ✅ | URL-friendly başlık |
| `ozet` | Text (Long) | ❌ | Kısa özet (meta description) |
| `icerik` | Rich Text (Markdown) | ✅ | Ana içerik |
| `gorsel` | Text (Short) | ❌ | Görsel URL'si |
| `yazar` | Text (Short) | ❌ | Yazar adı |
| `okunma` | Number (Integer) | ✅ | Görüntülenme sayısı (default: 0) |
| `kategori` | Relation | ❌ | Kategori ile ilişki (oneToMany) |

**Relation Detayı:**
- Haber → Kategori: Many to One
- Strapi v5'te array olarak gelir: `kategori: Kategori[]`

#### 2. Kategori (Content Type: kategori)

**Alanlar:**
| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `ad` | Text (Short) | ✅ | Kategori adı |
| `slug` | UID (attached to ad) | ✅ | URL-friendly ad |
| `aciklama` | Text (Long) | ❌ | Kategori açıklaması |

#### 3. Yazar (Content Type: yazar)

**Alanlar:**
| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `ad` | Text (Short) | ✅ | Yazar adı |
| `slug` | UID (attached to ad) | ✅ | URL-friendly ad |
| `biyografi` | Text (Long) | ❌ | Yazar biyografisi |
| `avatar` | Text (Short) | ❌ | Avatar URL'si |
| `email` | Email | ✅ | Email adresi |

#### 4. Taziye (Content Type: taziye)

**Alanlar:**
| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `ad_soyad` | Text (Short) | ✅ | Merhum ad soyad |
| `vefat_tarihi` | Date | ❌ | Vefat tarihi |
| `cenaze_yeri` | Text (Short) | ❌ | Cenaze yeri |
| `cenaze_zamani` | DateTime | ❌ | Cenaze zamanı |
| `mesaj` | Text (Long) | ❌ | Taziye mesajı |

### Strapi API Endpoints

Backend çalıştığında aşağıdaki endpoint'ler kullanılabilir:

```
GET  /api/habers              # Tüm haberleri listele
GET  /api/habers/:id          # ID ile haber getir
GET  /api/habers?filters[slug][$eq]=slug-degeri  # Slug ile haber getir

GET  /api/kategoris           # Tüm kategorileri listele
GET  /api/kategoris/:id       # ID ile kategori getir

GET  /api/yazars              # Tüm yazarları listele
GET  /api/yazars/:id          # ID ile yazar getir

GET  /api/taziyes             # Tüm taziyeleri listele
GET  /api/taziyes/:id         # ID ile taziye getir
```

**Query Parametreleri:**
```
?populate=kategori            # İlişkili kategoriyi dahil et
?filters[kategori][slug][$eq]=sanliurfa  # Kategoriye göre filtrele
?pagination[page]=1           # Sayfa numarası
?pagination[pageSize]=10      # Sayfa başına kayıt
?sort=publishedAt:desc        # Yayın tarihine göre sırala
```

**Örnek Request:**
```bash
curl http://localhost:1337/api/habers?populate=kategori&filters[kategori][slug][$eq]=sanliurfa&pagination[pageSize]=5
```

---

## 💻 Frontend Yapılandırması

### Sayfa Yapısı

#### 1. Ana Sayfa (`/`)
- **Dosya:** `app/page.tsx`
- **Özellikler:**
  - Manşet haber (büyük görsel ile)
  - Son haberler listesi
  - Sidebar widgetları
  - En çok okunanlar

#### 2. Kategori Sayfası (`/kategori/[slug]`)
- **Dosya:** `app/kategori/[slug]/page.tsx`
- **Özellikler:**
  - Kategoriye ait haberler (grid layout)
  - Sayfalama (pagination)
  - SEO meta tags (dynamic)

#### 3. Haber Detay (`/haber/[slug]`)
- **Dosya:** `app/haber/[slug]/page.tsx`
- **Özellikler:**
  - Tam haber içeriği
  - Sosyal medya paylaşım butonları
  - İlgili haberler
  - Breadcrumb navigation

#### 4. Error Pages
- **404:** `app/not-found.tsx` - Sayfa bulunamadı
- **Error:** `app/error.tsx` - Genel hatalar
- **Global Error:** `app/global-error.tsx` - Kritik hatalar

### API Helper Functions

**Dosya:** `lib/api/strapi.ts`

```typescript
// Haberleri getir
getHaberler(params?: {
  kategori?: string;
  limit?: number;
  sayfa?: number;
}): Promise<Haber[]>

// Tek haber getir
getHaber(slug: string): Promise<Haber | null>

// Kategorileri getir
getKategoriler(): Promise<Kategori[]>

// Yazarları getir
getYazarlar(): Promise<Yazar[]>

// Tek yazar getir
getYazar(slug: string): Promise<Yazar | null>

// Taziyeleri getir
getTaziyeler(limit?: number): Promise<Taziye[]>
```

**Kullanım Örneği:**

```typescript
import { getHaberler, getKategoriler } from '@/lib/api/strapi';

// Server Component içinde
export default async function HomePage() {
  const haberler = await getHaberler({ limit: 6 });
  const kategoriler = await getKategoriler();

  return (
    <div>
      {haberler.map(haber => (
        <div key={haber.id}>{haber.baslik}</div>
      ))}
    </div>
  );
}
```

### Tailwind CSS Konfigürasyonu

**Primary Color:** Mavi tonları (haber siteleri için standart)
**Secondary Color:** Kırmızı tonları (vurgu, uyarı)

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: '#0066cc',
      secondary: '#e63946',
    }
  }
}
```

### Image Optimization

**next.config.js** içinde external domain'ler tanımlı:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
    {
      protocol: 'http',
      hostname: 'localhost',
    },
  ],
}
```

---

## 🔌 API Entegrasyonları

### 1. Döviz Kurları

**Kaynak:** TCMB (Türkiye Cumhuriyet Merkez Bankası)

**Endpoint:** `app/api/doviz/route.ts`

**API URL:** `https://www.tcmb.gov.tr/kurlar/today.xml`

**Cache:** 1 saat (revalidate: 3600)

**Response:**
```json
{
  "usd": { "alis": "32.50", "satis": "32.55" },
  "eur": { "alis": "35.20", "satis": "35.25" }
}
```

### 2. Hava Durumu

**Kaynak:** OpenWeatherMap API

**Endpoint:** `app/api/hava-durumu/route.ts`

**API URL:** `https://api.openweathermap.org/data/2.5/weather?q=Sanliurfa,TR&appid={API_KEY}&units=metric&lang=tr`

**Cache:** 30 dakika (revalidate: 1800)

**Response:**
```json
{
  "sicaklik": 28,
  "durum": "Açık",
  "nem": 45,
  "ruzgar": 12
}
```

### 3. Nöbetçi Eczaneler

**Kaynak:** CollectAPI

**Endpoint:** `app/api/nobetci-eczane/route.ts`

**API URL:** `https://api.collectapi.com/health/dutyPharmacy?ilce=merkez&il=sanliurfa`

**Cache:** 1 saat (revalidate: 3600)

**Headers:**
```
authorization: apikey {COLLECTAPI_KEY}
content-type: application/json
```

**Response:**
```json
[
  {
    "name": "Eczane Adı",
    "address": "Adres",
    "phone": "0414 XXX XX XX",
    "loc": "Merkez"
  }
]
```

### 4. Lig Puan Durumu

**Kaynak:** CollectAPI

**Endpoint:** `app/api/puan-cetveli/route.ts`

**API URL:** `https://api.collectapi.com/football/league?league=super-lig`

**Cache:** 2 saat (revalidate: 7200)

**Response:**
```json
[
  {
    "rank": 1,
    "team": "Takım Adı",
    "play": 30,
    "win": 20,
    "draw": 5,
    "lose": 5,
    "point": 65
  }
]
```

---

## ✨ Özellikler

### ✅ Tamamlanan Özellikler

**Backend:**
- [x] Strapi v5.30.0 kurulumu
- [x] SQLite veritabanı yapılandırması
- [x] Content Type'lar (Haber, Kategori, Yazar, Taziye)
- [x] API permissions yapılandırması
- [x] Relation'lar (Haber-Kategori)

**Frontend:**
- [x] Next.js 16 + React 19 setup
- [x] TypeScript konfigürasyonu
- [x] Tailwind CSS v4 entegrasyonu
- [x] App Router yapısı
- [x] Header & Footer componentleri
- [x] Mobile menu
- [x] Ana sayfa tasarımı ve implementasyonu
- [x] Kategori sayfası (dinamik routing)
- [x] Haber detay sayfası
- [x] Error pages (404, error, global-error)
- [x] Strapi API entegrasyonu
- [x] Sidebar widgetları:
  - [x] Döviz kurları (TCMB)
  - [x] Hava durumu (OpenWeatherMap)
  - [x] Nöbetçi eczaneler (CollectAPI)
  - [x] Lig puan durumu (CollectAPI)
- [x] Responsive design
- [x] SEO meta tags
- [x] Sosyal medya paylaşım butonları
- [x] Image optimization

### 🚧 Geliştirilmesi Planlanan

- [ ] Arama fonksiyonu
- [ ] Köşe yazarları sayfası
- [ ] Taziyeler sayfası
- [ ] Yorum sistemi
- [ ] Admin paneli (frontend)
- [ ] Dark mode
- [ ] PWA desteği
- [ ] Push notifications
- [ ] Performance monitoring
- [ ] Analytics entegrasyonu

---

## 🐛 Bilinen Sorunlar ve Çözümler

### 1. Image Alt Property Hatası

**Sorun:**
```
Image is missing required "alt" property
```

**Sebep:** Next.js Image component'i SEO için `alt` prop'unun boş olmamasını zorunlu kılar.

**Çözüm:**
```typescript
<Image
  src={haber.gorsel || DEFAULT_IMAGE}
  alt={haber.baslik || 'Haber görseli'}  // Fallback değer eklendi
  fill
/>
```

### 2. Strapi v5 Relation Array Formatı

**Sorun:** Strapi v5'te many-to-one relation'lar array olarak dönüyor.

**Eski API Response:**
```json
{
  "kategori": {
    "data": {
      "id": 1,
      "attributes": { "ad": "Şanlıurfa" }
    }
  }
}
```

**Yeni API Response (Strapi v5):**
```json
{
  "kategori": [
    {
      "id": 1,
      "ad": "Şanlıurfa",
      "slug": "sanliurfa"
    }
  ]
}
```

**Çözüm:**
```typescript
// Interface güncellemesi
export interface Haber {
  kategori?: Kategori[];  // Array olarak tanımlandı
}

// Kullanım
const kategoriAd = haber.kategori?.[0]?.ad || 'Genel';
```

### 3. CORS Hatası (Geliştirme)

**Sorun:** Frontend'den backend'e istek atarken CORS hatası.

**Çözüm:** Strapi `config/middlewares.ts` dosyasında:
```typescript
export default [
  'strapi::cors',  // CORS middleware aktif
  // ...
];
```

### 4. Görsel Yükleme (404 Error)

**Sorun:** Strapi'de yüklenen görseller 404 veriyor.

**Sebep:** `public/uploads` klasörü yoksa veya izinler yanlış.

**Çözüm:**
```bash
mkdir -p urfadanhaber-backend/public/uploads
chmod 755 urfadanhaber-backend/public/uploads
```

### 5. Slug Otomatik Oluşmama

**Sorun:** Haber eklerken slug otomatik oluşmuyor.

**Çözüm:** Strapi Content Manager'da:
1. Haber eklerken önce `baslik` alanını doldurun
2. `slug` alanı otomatik dolar
3. Gerekirse manuel düzenleyebilirsiniz

### 6. Environment Variables Tanınmıyor

**Sorun:** `.env.local` dosyası okunmuyor.

**Çözüm:**
- Dosya adının `.env.local` olduğundan emin olun
- Frontend sunucusunu restart edin (`npm run dev`)
- `NEXT_PUBLIC_` prefix'i olmadan server-side değişkenler kullanılamaz

---

## 📝 Geliştirme Notları

### Strapi Geliştirme İpuçları

1. **Content Type Oluştururken:**
   - `slug` alanlarını mutlaka UID tipi yapın
   - `baslik` veya `ad` alanına bağlayın
   - Relation'larda field name'i tekil kullanın (kategoris ❌, kategori ✅)

2. **API Permissions:**
   - Public role için sadece `find` ve `findOne` yeterli
   - `create`, `update`, `delete` authenticated kullanıcılar için

3. **Media Upload:**
   - Strapi Media Library kullanılabilir
   - Alternatif: External URL (Unsplash, Cloudinary vb.)

### Next.js Geliştirme İpuçları

1. **Server Components (Varsayılan):**
   ```typescript
   // ✅ Server Component - API'yi direkt çağırabilir
   export default async function Page() {
     const data = await getHaberler();
     return <div>{data}</div>;
   }
   ```

2. **Client Components (use client):**
   ```typescript
   'use client';
   // ❌ useState, useEffect gibi hooks için gerekli
   export default function Component() {
     const [state, setState] = useState();
   }
   ```

3. **Image Optimization:**
   - Her zaman `next/image` kullanın
   - External domain'leri `next.config.js`'te tanımlayın
   - `alt` prop'u zorunlu (SEO)

4. **Metadata (SEO):**
   ```typescript
   export async function generateMetadata({ params }): Promise<Metadata> {
     return {
       title: 'Sayfa Başlığı',
       description: 'Açıklama',
       openGraph: { ... }
     };
   }
   ```

### API Route Caching

Next.js 15+ ile caching değişti:

```typescript
export async function GET() {
  const res = await fetch(url, {
    next: { revalidate: 3600 }  // 1 saat cache
  });

  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
```

### TypeScript Tipleri

**Strapi Response Formatı:**
```typescript
interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
```

---

## 🚀 Deployment

### Backend (Strapi) Deployment

**Önerilen Platform:** Railway, Render, Heroku, DigitalOcean

**Adımlar:**

1. **Database Değişikliği:**
   ```bash
   npm install pg  # PostgreSQL için
   ```

2. **Environment Variables:**
   ```env
   NODE_ENV=production
   DATABASE_CLIENT=postgres
   DATABASE_URL=postgresql://...
   ADMIN_JWT_SECRET=random_secret_key
   API_TOKEN_SALT=random_salt_key
   APP_KEYS=key1,key2,key3,key4
   JWT_SECRET=random_jwt_secret
   ```

3. **Build:**
   ```bash
   npm run build
   npm run start
   ```

### Frontend (Next.js) Deployment

**Önerilen Platform:** Vercel, Netlify, Railway

**Vercel Deployment (Önerilen):**

1. GitHub'a push yapın
2. Vercel'de import edin
3. Environment variables ekleyin:
   ```env
   NEXT_PUBLIC_STRAPI_URL=https://your-strapi-backend.com
   NEXT_PUBLIC_OPENWEATHER_API_KEY=...
   COLLECTAPI_KEY=...
   ```
4. Deploy!

**Manuel Deployment:**
```bash
npm run build
npm run start
```

### Production Checklist

- [ ] Environment variables production'a taşındı
- [ ] Database production'a (PostgreSQL) geçirildi
- [ ] Strapi admin şifresi güçlü yapıldı
- [ ] API rate limiting eklendi
- [ ] HTTPS sertifikası kuruldu
- [ ] Domain yapılandırıldı
- [ ] Analytics eklendi
- [ ] Error monitoring (Sentry vb.) kuruldu
- [ ] Backup stratejisi belirlendi

---

## 📜 Komutlar

### Backend (Strapi)

```bash
# Development
npm run develop          # Geliştirme modu (auto-reload + admin panel)
npm run dev             # Alias for develop

# Production
npm run build           # Production build
npm run start           # Production server

# Diğer
npm run strapi          # Strapi CLI
npm run strapi console  # Strapi console
```

### Frontend (Next.js)

```bash
# Development
npm run dev             # Development server (Turbopack)

# Production
npm run build           # Production build
npm run start           # Production server

# Linting ve Formatting
npm run lint            # ESLint kontrolü
npm run lint:fix        # ESLint otomatik düzeltme
```

### Tüm Projeyi Çalıştırma

```bash
# Terminal 1 - Backend
cd urfadanhaber-backend
npm run develop

# Terminal 2 - Frontend
cd urfadanhaber-frontend
npm run dev
```

**Erişim:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:1337/api
- Strapi Admin: http://localhost:1337/admin

---

## 📞 Destek ve İletişim

### Sorun mu Yaşıyorsunuz?

1. **README'yi dikkatlice okuyun** - Çoğu sorun burada çözülmüş
2. **Console'u kontrol edin** - Browser ve terminal hataları
3. **Strapi logs'u inceleyin** - Backend hatalar için
4. **GitHub Issues** - Yeni sorun bildirin

### Proje Bilgileri

- **Proje Adı:** UrfadanHaber
- **Versiyon:** 1.0.0
- **Geliştirme Başlangıç:** 2025
- **Lisans:** MIT
- **Repository:** [GitHub URL]

### Teknoloji Sürümleri

```json
{
  "next": "16.0.1",
  "react": "19.0.0",
  "@strapi/strapi": "5.30.0",
  "typescript": "5.x",
  "tailwindcss": "4.x",
  "node": "20.18.0"
}
```

---

## 📄 Lisans

MIT License

Copyright (c) 2025 UrfadanHaber

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🎉 Teşekkürler

- **Next.js Team** - Harika bir framework için
- **Strapi Team** - Esnek headless CMS için
- **Tailwind CSS** - Modern CSS araçları için
- **Vercel** - Deployment platform'u için

---

**Son Güncelleme:** 2025-11-05
**Doküman Versiyonu:** 2.0.0
