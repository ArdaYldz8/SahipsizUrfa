const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://urfadanhaber-production.up.railway.app/api';

export async function getWeather() {
    try {
        // Şanlıurfa koordinatları: 37.1674, 38.7955
        const res = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=37.1674&longitude=38.7955&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto'
        );
        const data = await res.json();
        return {
            temp: Math.round(data.current.temperature_2m),
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m,
            code: data.current.weather_code,
            unit: data.current_units.temperature_2m,
        };
    } catch (error) {
        console.error('Hava durumu alınamadı:', error);
        return null;
    }
}

export async function getCurrency() {
    try {
        const [usdRes, eurRes] = await Promise.all([
            fetch('https://api.frankfurter.app/latest?from=USD&to=TRY'),
            fetch('https://api.frankfurter.app/latest?from=EUR&to=TRY')
        ]);

        if (!usdRes.ok || !eurRes.ok) return null;

        const usdData = await usdRes.json();
        const eurData = await eurRes.json();

        return {
            usd: usdData.rates.TRY,
            eur: eurData.rates.TRY
        };
    } catch (error) {
        console.error('Döviz bilgisi alınamadı:', error);
        return null;
    }
}

export async function getPharmacies() {
    try {
        const res = await fetch('http://localhost:8080/api/pharmacies');
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error('Eczane bilgisi alınamadı:', error);
        return [];
    }
}

export async function getStandings(league: string = 'tff-1-lig') {
    try {
        const res = await fetch(`http://localhost:8080/api/standings?league=${league}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error('Puan durumu alınamadı:', error);
        return [];
    }
}

export async function getPrayerTimes(city: string = 'sanliurfa') {
    try {
        const res = await fetch(`http://localhost:8080/api/prayer-times?city=${city}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error('Namaz vakitleri alınamadı:', error);
        return [];
    }
}
