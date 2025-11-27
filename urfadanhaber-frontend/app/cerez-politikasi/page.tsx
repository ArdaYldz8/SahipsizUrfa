import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Çerez Politikası | UrfadanHaber',
    description: 'UrfadanHaber çerez kullanım politikası.',
};

export default function CerezPolitikasi() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-primary pb-2 inline-block">Çerez Politikası</h1>

            <div className="bg-white shadow-md rounded-lg p-8 prose max-w-none text-gray-700">
                <p>UrfadanHaber olarak, sitemizden en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminizi geliştirebilmek için Çerez (Cookie) kullanıyoruz.</p>

                <h3>Çerez Nedir?</h3>
                <p>Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcılar aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.</p>

                <h3>Hangi Tür Çerezleri Kullanıyoruz?</h3>
                <ul>
                    <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gerekli olan çerezlerdir.</li>
                    <li><strong>Analiz Çerezleri:</strong> Ziyaretçilerin siteyi nasıl kullandığını analiz ederek performansı artırmamıza yardımcı olur (örn. Google Analytics).</li>
                    <li><strong>İşlevsel Çerezler:</strong> Tercihlerinizi hatırlamak için kullanılır (örn. dil seçimi).</li>
                </ul>

                <h3>Çerezleri Nasıl Yönetebilirsiniz?</h3>
                <p>Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Ancak çerezleri devre dışı bırakmanız durumunda sitenin bazı özellikleri çalışmayabilir.</p>
            </div>
        </div>
    );
}
