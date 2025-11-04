export interface HavaDurumu {
  sehir: string;
  sicaklik: number;
  aciklama: string;
  icon: string;
  nem: number;
  ruzgar: number;
}

/**
 * Next.js API route üzerinden hava durumu bilgisi çeker
 */
export async function getHavaDurumu(): Promise<HavaDurumu | null> {
  try {
    const response = await fetch('/api/hava-durumu', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Hava durumu API yanıt vermedi');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Hava durumu alınamadı:', error);
    return {
      sehir: 'Şanlıurfa',
      sicaklik: 25,
      aciklama: 'Güneşli',
      icon: '01d',
      nem: 40,
      ruzgar: 10,
    };
  }
}
