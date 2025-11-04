export interface Eczane {
  isim: string;
  adres: string;
  telefon: string;
  ilce: string;
}

/**
 * CollectAPI'den nöbetçi eczane bilgisi çeker
 * NOT: Ücretsiz API key gerekir: https://collectapi.com/
 * Alternatif: Web scraping yapılabilir (daha az güvenilir)
 */
export async function getNobetciEczaneler(): Promise<Eczane[]> {
  const API_KEY = process.env.COLLECTAPI_KEY;

  if (!API_KEY) {
    console.warn('CollectAPI key tanımlı değil');
    // Varsayılan örnek veri
    return [
      {
        isim: 'Örnek Eczane 1',
        adres: 'Esentepe Mah. Atatürk Blv. No:123',
        telefon: '0414 XXX XX XX',
        ilce: 'Esentepe',
      },
      {
        isim: 'Örnek Eczane 2',
        adres: 'Haliliye Mah. Cumhuriyet Cad. No:45',
        telefon: '0414 XXX XX XX',
        ilce: 'Haliliye',
      },
    ];
  }

  try {
    const response = await fetch(
      'https://api.collectapi.com/health/dutyPharmacy?il=Şanlıurfa',
      {
        headers: {
          'content-type': 'application/json',
          authorization: `apikey ${API_KEY}`,
        },
        next: { revalidate: 3600 }, // 1 saat cache (günlük değişir)
      }
    );

    if (!response.ok) {
      throw new Error('Nöbetçi eczane API yanıt vermedi');
    }

    const data = await response.json();

    if (data.success && data.result) {
      return data.result.map((eczane: any) => ({
        isim: eczane.name,
        adres: eczane.address,
        telefon: eczane.phone,
        ilce: eczane.dist || 'Merkez',
      }));
    }

    return [];
  } catch (error) {
    console.error('Nöbetçi eczane bilgisi alınamadı:', error);
    return [];
  }
}
