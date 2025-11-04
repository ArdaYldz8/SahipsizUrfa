export interface DovizKuru {
  isim: string;
  kod: string;
  alis: number;
  satis: number;
  tarih: string;
}

/**
 * Next.js API route üzerinden döviz kurlarını çeker
 */
export async function getDovizKurlari(): Promise<DovizKuru[]> {
  try {
    const response = await fetch('/api/doviz', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Döviz API yanıt vermedi');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Döviz kurları alınamadı:', error);
    // Hata durumunda varsayılan değerler
    return [
      { isim: 'DOLAR', kod: 'USD', alis: 34.50, satis: 34.75, tarih: new Date().toISOString() },
      { isim: 'EURO', kod: 'EUR', alis: 37.20, satis: 37.50, tarih: new Date().toISOString() },
    ];
  }
}
