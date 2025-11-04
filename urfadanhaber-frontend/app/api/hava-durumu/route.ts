import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!API_KEY) {
    // API key yoksa mock data dön
    return NextResponse.json({
      sehir: 'Şanlıurfa',
      sicaklik: 25,
      aciklama: 'Güneşli',
      icon: '01d',
      nem: 40,
      ruzgar: 10,
    });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Sanliurfa,TR&appid=${API_KEY}&units=metric&lang=tr`,
      { next: { revalidate: 1800 } } // 30 dakika cache
    );

    if (!response.ok) {
      throw new Error('Hava durumu API yanıt vermedi');
    }

    const data = await response.json();

    return NextResponse.json({
      sehir: data.name,
      sicaklik: Math.round(data.main.temp),
      aciklama: data.weather[0].description,
      icon: data.weather[0].icon,
      nem: data.main.humidity,
      ruzgar: Math.round(data.wind.speed * 3.6), // m/s to km/h
    });
  } catch (error) {
    console.error('Hava durumu alınamadı:', error);
    return NextResponse.json({
      sehir: 'Şanlıurfa',
      sicaklik: 25,
      aciklama: 'Güneşli',
      icon: '01d',
      nem: 40,
      ruzgar: 10,
    });
  }
}
