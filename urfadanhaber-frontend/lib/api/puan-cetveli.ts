export interface Takim {
  sira: number;
  isim: string;
  oynanan: number;
  galibiyet: number;
  beraberlik: number;
  maglubiyet: number;
  attigiGol: number;
  yedigiGol: number;
  averaj: number;
  puan: number;
}

/**
 * CollectAPI'den Süper Lig puan durumunu çeker
 * NOT: Ücretsiz API key gerekir: https://collectapi.com/
 */
export async function getSuperLigPuanCetveli(): Promise<Takim[]> {
  const API_KEY = process.env.COLLECTAPI_KEY;

  if (!API_KEY) {
    console.warn('CollectAPI key tanımlı değil');
    // Varsayılan örnek veri
    return [
      { sira: 1, isim: 'Galatasaray', oynanan: 12, galibiyet: 10, beraberlik: 2, maglubiyet: 0, attigiGol: 35, yedigiGol: 10, averaj: 25, puan: 32 },
      { sira: 2, isim: 'Fenerbahçe', oynanan: 12, galibiyet: 9, beraberlik: 2, maglubiyet: 1, attigiGol: 32, yedigiGol: 12, averaj: 20, puan: 29 },
      { sira: 3, isim: 'Beşiktaş', oynanan: 12, galibiyet: 8, beraberlik: 3, maglubiyet: 1, attigiGol: 28, yedigiGol: 14, averaj: 14, puan: 27 },
      { sira: 4, isim: 'Trabzonspor', oynanan: 12, galibiyet: 7, beraberlik: 3, maglubiyet: 2, attigiGol: 25, yedigiGol: 15, averaj: 10, puan: 24 },
      { sira: 5, isim: 'Başakşehir', oynanan: 12, galibiyet: 6, beraberlik: 4, maglubiyet: 2, attigiGol: 22, yedigiGol: 16, averaj: 6, puan: 22 },
    ];
  }

  try {
    const response = await fetch(
      'https://api.collectapi.com/football/league?league=super-lig',
      {
        headers: {
          'content-type': 'application/json',
          authorization: `apikey ${API_KEY}`,
        },
        next: { revalidate: 7200 }, // 2 saat cache
      }
    );

    if (!response.ok) {
      throw new Error('Puan cetveli API yanıt vermedi');
    }

    const data = await response.json();

    if (data.success && data.result) {
      return data.result.slice(0, 10).map((takim: any, index: number) => ({
        sira: index + 1,
        isim: takim.team,
        oynanan: takim.play,
        galibiyet: takim.win,
        beraberlik: takim.draw,
        maglubiyet: takim.lose,
        attigiGol: takim.goalFor,
        yedigiGol: takim.goalAgainst,
        averaj: takim.goalFor - takim.goalAgainst,
        puan: takim.point,
      }));
    }

    return [];
  } catch (error) {
    console.error('Puan cetveli alınamadı:', error);
    return [];
  }
}
