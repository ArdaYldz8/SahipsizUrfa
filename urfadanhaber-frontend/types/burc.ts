export interface Horoscope {
    id: string;
    zodiac_sign: string;
    daily_comment: string;
    love_rating: number;
    money_rating: number;
    health_rating: number;
    motto: string;
    lucky_number: string;
    lucky_color: string;
    comment_date: string;
    created_at: string;
    updated_at: string;
}

export const ZODIAC_SIGNS = [
    { id: 'koc', name: 'Koç', date: '21 Mart - 19 Nisan' },
    { id: 'boga', name: 'Boğa', date: '20 Nisan - 20 Mayıs' },
    { id: 'ikizler', name: 'İkizler', date: '21 Mayıs - 20 Haziran' },
    { id: 'yengec', name: 'Yengeç', date: '21 Haziran - 22 Temmuz' },
    { id: 'aslan', name: 'Aslan', date: '23 Temmuz - 22 Ağustos' },
    { id: 'basak', name: 'Başak', date: '23 Ağustos - 22 Eylül' },
    { id: 'terazi', name: 'Terazi', date: '23 Eylül - 22 Ekim' },
    { id: 'akrep', name: 'Akrep', date: '23 Ekim - 21 Kasım' },
    { id: 'yay', name: 'Yay', date: '22 Kasım - 21 Aralık' },
    { id: 'oglak', name: 'Oğlak', date: '22 Aralık - 19 Ocak' },
    { id: 'kova', name: 'Kova', date: '20 Ocak - 18 Şubat' },
    { id: 'balik', name: 'Balık', date: '19 Şubat - 20 Mart' },
];
