import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Haber {
  id: number;
  baslik: string;
  slug: string;
  icerik: string;
  ozet?: string;
  gorsel?: string;
  yazar?: string;
  okunma: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  kategori?: Kategori[];
}

export interface Kategori {
  id: number;
  ad: string;
  slug: string;
  aciklama?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Yazar {
  id: number;
  ad: string;
  slug: string;
  biyografi?: string;
  avatar?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Taziye {
  id: number;
  ad_soyad: string;
  vefat_tarihi?: string;
  cenaze_yeri?: string;
  cenaze_zamani?: string;
  mesaj?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Haberleri getir
export async function getHaberler(params?: {
  kategori?: string;
  limit?: number;
  sayfa?: number;
}): Promise<Haber[]> {
  try {
    const response = await strapiApi.get('/habers', {
      params: {
        populate: ['kategori'],
        filters: {
          ...(params?.kategori && { kategori: { slug: params.kategori } }),
        },
        pagination: {
          page: params?.sayfa || 1,
          pageSize: params?.limit || 10,
        },
        sort: ['publishedAt:desc'],
      },
    });

    return response.data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch (error) {
    console.error('Haberler getirilemedi:', error);
    return [];
  }
}

// Tek haber getir
export async function getHaber(slug: string): Promise<Haber | null> {
  try {
    const response = await strapiApi.get('/habers', {
      params: {
        filters: { slug },
        populate: ['kategori'],
      },
    });

    if (response.data.data.length === 0) return null;

    const item = response.data.data[0];
    return {
      id: item.id,
      ...item.attributes,
    };
  } catch (error) {
    console.error('Haber getirilemedi:', error);
    return null;
  }
}

// Kategorileri getir
export async function getKategoriler(): Promise<Kategori[]> {
  try {
    const response = await strapiApi.get('/kategoris');
    return response.data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch (error) {
    console.error('Kategoriler getirilemedi:', error);
    return [];
  }
}

// Yazarları getir
export async function getYazarlar(): Promise<Yazar[]> {
  try {
    const response = await strapiApi.get('/yazars');
    return response.data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch (error) {
    console.error('Yazarlar getirilemedi:', error);
    return [];
  }
}

// Tek yazar getir
export async function getYazar(slug: string): Promise<Yazar | null> {
  try {
    const response = await strapiApi.get('/yazars', {
      params: {
        filters: { slug },
      },
    });

    if (response.data.data.length === 0) return null;

    const item = response.data.data[0];
    return {
      id: item.id,
      ...item.attributes,
    };
  } catch (error) {
    console.error('Yazar getirilemedi:', error);
    return null;
  }
}

// Taziyeleri getir
export async function getTaziyeler(limit = 20): Promise<Taziye[]> {
  try {
    const response = await strapiApi.get('/taziyes', {
      params: {
        pagination: { pageSize: limit },
        sort: ['publishedAt:desc'],
      },
    });

    return response.data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch (error) {
    console.error('Taziyeler getirilemedi:', error);
    return [];
  }
}

export default strapiApi;
