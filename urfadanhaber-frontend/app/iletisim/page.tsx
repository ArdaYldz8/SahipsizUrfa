import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'İletişim | UrfadanHaber',
    description: 'UrfadanHaber iletişim bilgileri, adres ve iletişim formu.',
};

export default function Iletisim() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-primary pb-2 inline-block">İletişim</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Contact Info */}
                <div className="bg-white shadow-md rounded-lg p-8 h-fit">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Bize Ulaşın</h2>
                    <div className="space-y-4 text-gray-700">
                        <div>
                            <p className="font-bold text-gray-900">Adres</p>
                            <p>Atatürk Bulvarı, No: 123<br />Haliliye / Şanlıurfa</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">Telefon</p>
                            <p>+90 (414) 123 45 67</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">E-posta</p>
                            <p>iletisim@urfadanhaber.com</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">Whatsapp İhbar Hattı</p>
                            <p className="text-green-600 font-bold">+90 (555) 123 45 67</p>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="mt-8 bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">
                        Harita Alanı (Google Maps Embed)
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">İletişim Formu</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adınız Soyadınız</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresiniz</label>
                            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Konu</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
                            <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                        </div>
                        <button type="button" className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition">
                            Gönder
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
