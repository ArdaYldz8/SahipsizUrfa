import Link from 'next/link';

export default function SoruSorWidget() {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3 flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="text-xl">🎓</span>
                    UZMANINA SOR
                </h3>
            </div>

            <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                    Sağlık, Hukuk, Teknoloji ve daha fazlası... Aklınıza takılanları uzmanlarımıza sorun.
                </p>

                <Link
                    href="/uzmanina-sor/sor"
                    className="block w-full bg-blue-50 text-blue-700 font-bold text-center py-3 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                >
                    ✏️ SORU SOR
                </Link>

                <Link
                    href="/uzmanina-sor"
                    className="block text-center text-xs text-gray-500 mt-3 hover:text-blue-600"
                >
                    Cevaplanan Soruları Gör &rarr;
                </Link>
            </div>
        </div>
    );
}
