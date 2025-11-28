import PrayerTimes from '@/components/religious/PrayerTimes';
import DailyContent from '@/components/religious/DailyContent';

export const metadata = {
    title: 'Dini Bilgiler - Urfadan Haber',
    description: 'Şanlıurfa namaz vakitleri, günün hadisi, ayeti ve duası, dini bilgiler ve makaleler.',
};

export default function ReligiousPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Dini Bilgiler
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Manevi dünyanızı zenginleştirecek içerikler, namaz vakitleri ve günün nasihatleri.
                </p>
            </div>

            {/* Prayer Times Section */}
            <div className="mb-12">
                <PrayerTimes />
            </div>

            {/* Daily Content Section */}
            <div className="mb-12">
                <DailyContent />
            </div>

            {/* Articles Section Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Dini Makaleler ve Haberler</h2>
                <p className="text-gray-500">Çok yakında bu alanda dini içerikli makaleler ve haberler yer alacaktır.</p>
            </div>
        </div>
    );
}
