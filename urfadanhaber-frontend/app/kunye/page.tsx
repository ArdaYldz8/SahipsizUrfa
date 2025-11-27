import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Künye | UrfadanHaber',
    description: 'UrfadanHaber yayın künyesi, imtiyaz sahibi, editörler ve iletişim bilgileri.',
};

export default function Kunye() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-primary pb-2 inline-block">Künye</h1>

            <div className="bg-white shadow-md rounded-lg p-8 space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">İmtiyaz Sahibi</h2>
                        <p className="text-gray-700">Mustafa Çadırcı</p>
                        <p className="text-gray-500 text-sm">mustafa@urfadanhaber.com</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Genel Yayın Yönetmeni</h2>
                        <p className="text-gray-700">Mehmet Demir</p>
                        <p className="text-gray-500 text-sm">mehmet@urfadanhaber.com</p>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Editörler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="font-medium text-gray-900">Ayşe Yılmaz</p>
                            <p className="text-gray-500 text-sm">Gündem Editörü</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Ali Kaya</p>
                            <p className="text-gray-500 text-sm">Spor Editörü</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Zeynep Çelik</p>
                            <p className="text-gray-500 text-sm">Ekonomi Editörü</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Hukuk Danışmanı</h2>
                    <p className="text-gray-700">Av. Ahmet Şahin</p>
                </div>

                <div className="border-t border-gray-100 pt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">İletişim Bilgileri</h2>
                    <div className="space-y-2 text-gray-700">
                        <p><strong>Adres:</strong> Atatürk Bulvarı, No: 123, Haliliye / Şanlıurfa</p>
                        <p><strong>Telefon:</strong> +90 (414) 123 45 67</p>
                        <p><strong>E-posta:</strong> iletisim@urfadanhaber.com</p>
                        <p><strong>KEP Adresi:</strong> urfadanhaber@hs01.kep.tr</p>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Yazılım ve Altyapı</h2>
                    <p className="text-gray-700">UrfadanHaber Teknoloji Ekibi</p>
                    <p className="text-gray-500 text-sm mt-1">Sitedeki tüm harici linkler ayrı bir sayfada açılır. UrfadanHaber harici linklerin sorumluluğunu almaz.</p>
                </div>

            </div>
        </div>
    );
}
