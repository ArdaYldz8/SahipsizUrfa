import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gizlilik Politikası | UrfadanHaber',
    description: 'UrfadanHaber gizlilik politikası ve kişisel verilerin korunması hakkında bilgilendirme.',
};

export default function GizlilikPolitikasi() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-primary pb-2 inline-block">Gizlilik Politikası</h1>

            <div className="bg-white shadow-md rounded-lg p-8 prose max-w-none text-gray-700">
                <p><strong>Son Güncelleme:</strong> 27 Kasım 2025</p>

                <h3>1. Giriş</h3>
                <p>UrfadanHaber olarak ziyaretçilerimizin gizliliğine önem veriyoruz. Bu Gizlilik Politikası, sitemizi kullandığınızda hangi verilerin toplandığını ve nasıl kullanıldığını açıklar.</p>

                <h3>2. Toplanan Veriler</h3>
                <p>Sitemizi ziyaret ettiğinizde IP adresiniz, tarayıcı türünüz, ziyaret ettiğiniz sayfalar gibi standart log kayıtları tutulabilir. Ayrıca iletişim formu aracılığıyla gönderdiğiniz ad, e-posta gibi bilgiler saklanabilir.</p>

                <h3>3. Çerezler (Cookies)</h3>
                <p>Kullanıcı deneyimini geliştirmek için çerezler kullanıyoruz. Çerezler hakkında daha fazla bilgi için Çerez Politikası sayfamızı ziyaret edebilirsiniz.</p>

                <h3>4. Verilerin Kullanımı</h3>
                <p>Toplanan veriler, site trafiğini analiz etmek, kullanıcı deneyimini iyileştirmek ve yasal yükümlülükleri yerine getirmek amacıyla kullanılır. Kişisel verileriniz üçüncü şahıslarla paylaşılmaz.</p>

                <h3>5. Dış Bağlantılar</h3>
                <p>Sitemizdeki haberlerde dış sitelere bağlantılar bulunabilir. Bu sitelerin gizlilik politikalarından UrfadanHaber sorumlu değildir.</p>

                <h3>6. İletişim</h3>
                <p>Gizlilik politikamızla ilgili sorularınız için <a href="/iletisim" className="text-primary hover:underline">iletişim</a> sayfasından bize ulaşabilirsiniz.</p>
            </div>
        </div>
    );
}
