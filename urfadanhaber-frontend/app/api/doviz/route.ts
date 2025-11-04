import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml', {
      next: { revalidate: 3600 } // 1 saat cache
    });

    if (!response.ok) {
      throw new Error('TCMB API yanıt vermedi');
    }

    const xmlText = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const result = parser.parse(xmlText);

    const tarih = result.Tarih_Date['@_Tarih'];
    const kurlar = result.Tarih_Date.Currency;

    // USD ve EUR'u filtrele
    const dovizler = kurlar
      .filter((kur: any) => ['USD', 'EUR'].includes(kur['@_Kod']))
      .map((kur: any) => ({
        isim: kur.Isim,
        kod: kur['@_Kod'],
        alis: parseFloat(kur.ForexBuying || '0'),
        satis: parseFloat(kur.ForexSelling || '0'),
        tarih: tarih,
      }));

    return NextResponse.json(dovizler);
  } catch (error) {
    console.error('Döviz kurları alınamadı:', error);
    // Hata durumunda varsayılan değerler
    return NextResponse.json([
      { isim: 'DOLAR', kod: 'USD', alis: 0, satis: 0, tarih: new Date().toISOString() },
      { isim: 'EURO', kod: 'EUR', alis: 0, satis: 0, tarih: new Date().toISOString() },
    ]);
  }
}
