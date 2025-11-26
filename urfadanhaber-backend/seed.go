//go:build ignore

package main

import (
	"fmt"
	"log"
	"time"
	"urfadanhaber-backend/models"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("urfadanhaber.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database")
	}

	// Auto Migrate to ensure schema is correct
	db.AutoMigrate(&models.NewsArticle{})

	// Mock Data
	news := []models.NewsArticle{
		// GÜNDEM
		{
			Headline:      "Şanlıurfa'da Yeni Metro Projesi Onaylandı",
			Description:   "Büyükşehir Belediyesi, şehir içi trafiği rahatlatacak yeni metro hattı projesinin bakanlık tarafından onaylandığını duyurdu.",
			Content:       "Şanlıurfa Büyükşehir Belediyesi'nin uzun süredir üzerinde çalıştığı hafif raylı sistem projesi Ulaştırma Bakanlığı'ndan onay aldı. Proje kapsamında Abide Kavşağı ile Balıklıgöl arasında 10 kilometrelik bir hat inşa edilecek. Başkan Beyazgül, 'Şehrimize hayırlı olsun' dedi.",
			Author:        "Ahmet Yılmaz",
			DatePublished: time.Now().Add(-1 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=800&q=80",
			Category:      "gundem",
			Slug:          "sanliurfa-yeni-metro-projesi-onaylandi",
		},
		{
			Headline:      "Göbeklitepe'ye Turist Akını Devam Ediyor",
			Description:   "Tarihin sıfır noktası Göbeklitepe, bu yıl rekor sayıda ziyaretçi ağırladı. Yabancı turistlerin ilgisi büyük.",
			Content:       "UNESCO Dünya Mirası Listesi'nde yer alan Göbeklitepe, 2024 yılının ilk çeyreğinde 500 bin ziyaretçiye ulaştı. Özellikle Japonya ve Almanya'dan gelen turist kafileleri bölge esnafının yüzünü güldürdü.",
			Author:        "Mehmet Demir",
			DatePublished: time.Now().Add(-3 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1599576838609-84d1c4e00c39?auto=format&fit=crop&w=800&q=80",
			Category:      "gundem",
			Slug:          "gobeklitepeye-turist-akini-devam-ediyor",
		},
		{
			Headline:      "Balıklıgöl'de Çevre Düzenlemesi Başladı",
			Description:   "Şanlıurfa'nın simgesi Balıklıgöl çevresinde peyzaj ve restorasyon çalışmaları start aldı.",
			Content:       "Tarihi Balıklıgöl platosunda yer alan yeşil alanların yenilenmesi ve yürüyüş yollarının düzenlenmesi için ekipler çalışmalara başladı. Çalışmaların turizm sezonuna kadar tamamlanması hedefleniyor.",
			Author:        "Ayşe Kaya",
			DatePublished: time.Now().Add(-5 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80",
			Category:      "gundem",
			Slug:          "balikligolde-cevre-duzenlemesi-basladi",
		},

		// SPOR
		{
			Headline:      "Şanlıurfaspor Deplasmandan 3 Puanla Döndü",
			Description:   "TFF 1. Lig'de mücadele eden Şanlıurfaspor, zorlu Sakaryaspor deplasmanından galibiyetle ayrıldı.",
			Content:       "Ligin 14. haftasında Sakaryaspor'a konuk olan Şanlıurfaspor, Marco Paixao'nun attığı gollerle sahadan 2-0 galip ayrıldı. Bu sonuçla sarı-yeşilliler play-off potasına bir adım daha yaklaştı.",
			Author:        "Spor Servisi",
			DatePublished: time.Now().Add(-2 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1504454138366-407b2f62151c?auto=format&fit=crop&w=800&q=80",
			Category:      "spor",
			Slug:          "sanliurfaspor-deplasmandan-3-puanla-dondu",
		},
		{
			Headline:      "Karaköprü Belediyespor'da Transfer Hareketliliği",
			Description:   "Karaköprü Belediyespor, ara transfer döneminde kadrosunu güçlendirmek için çalışmalara başladı.",
			Content:       "3. Lig temsilcimiz Karaköprü Belediyespor, forvet hattına takviye yapmak için görüşmelerini sürdürüyor. Teknik direktörün raporu doğrultusunda 3 oyuncu ile prensip anlaşmasına varıldığı öğrenildi.",
			Author:        "Ali Vural",
			DatePublished: time.Now().Add(-24 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
			Category:      "spor",
			Slug:          "karakopru-belediyesporda-transfer-hareketliligi",
		},

		// EKONOMİ
		{
			Headline:      "Pamuk Fiyatları Çiftçiyi Üzdü",
			Description:   "Şanlıurfa'da hasat dönemi devam ederken açıklanan pamuk alım fiyatları üreticinin beklentisinin altında kaldı.",
			Content:       "Türkiye'nin pamuk ambarı Şanlıurfa'da çiftçiler, artan girdi maliyetlerine rağmen pamuk fiyatlarının düşük kalmasına tepki gösterdi. Ziraat Odası Başkanı, taban fiyatın revize edilmesini talep etti.",
			Author:        "Ekonomi Masası",
			DatePublished: time.Now().Add(-4 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=800&q=80",
			Category:      "ekonomi",
			Slug:          "pamuk-fiyatlari-ciftciyi-uzdu",
		},
		{
			Headline:      "Fıstık İhracatında Rekor Artış",
			Description:   "Şanlıurfa fıstığı dünya pazarlarına açılıyor. İhracat rakamları geçen yıla göre %30 arttı.",
			Content:       "Bölgenin en önemli geçim kaynaklarından biri olan Antep fıstığı (Urfa fıstığı), Avrupa ve Ortadoğu ülkelerinden yoğun talep görüyor. İhracatçılar Birliği verilerine göre bu yıl rekor seviyeye ulaşıldı.",
			Author:        "Ekonomi Masası",
			DatePublished: time.Now().Add(-48 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&w=800&q=80",
			Category:      "ekonomi",
			Slug:          "fistik-ihracatinda-rekor-artis",
		},

		// EĞİTİM
		{
			Headline:      "Harran Üniversitesi'nden Yapay Zeka Hamlesi",
			Description:   "Harran Üniversitesi, Mühendislik Fakültesi bünyesinde Yapay Zeka ve Veri Mühendisliği bölümü açıyor.",
			Content:       "Teknolojinin gelişimiyle birlikte artan ihtiyaçlara cevap vermek amacıyla Harran Üniversitesi yeni bir bölüm daha açıyor. Rektörlükten yapılan açıklamada, gelecek yıl öğrenci alımına başlanacağı belirtildi.",
			Author:        "Eğitim Servisi",
			DatePublished: time.Now().Add(-6 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
			Category:      "egitim",
			Slug:          "harran-universitesinden-yapay-zeka-hamlesi",
		},

		// SAĞLIK
		{
			Headline:      "Şehir Hastanesi İnşaatında Sona Doğru",
			Description:   "Yapımı devam eden Şanlıurfa Şehir Hastanesi'nin %85'i tamamlandı. Açılış için geri sayım başladı.",
			Content:       "1700 yatak kapasiteli dev sağlık kompleksi Şanlıurfa Şehir Hastanesi'nde çalışmalar hız kesmeden devam ediyor. Hastanenin 2025 yılı başında tam kapasiteyle hizmete girmesi planlanıyor.",
			Author:        "Sağlık Haberleri",
			DatePublished: time.Now().Add(-12 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
			Category:      "saglik",
			Slug:          "sehir-hastanesi-insaatinda-sona-dogru",
		},

		// KÜLTÜR SANAT
		{
			Headline:      "Sıra Gecesi Geleneği UNESCO Listesine Aday",
			Description:   "Şanlıurfa'nın köklü geleneği Sıra Geceleri'nin UNESCO Somut Olmayan Kültürel Miras Listesi'ne girmesi için çalışmalar hızlandı.",
			Content:       "Kültür ve Turizm Bakanlığı ile Şanlıurfa Valiliği koordinasyonunda yürütülen çalışmalar kapsamında, Sıra Gecesi kültürünün uluslararası alanda tanıtılması hedefleniyor.",
			Author:        "Kültür Sanat",
			DatePublished: time.Now().Add(-20 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
			Category:      "kultur-sanat",
			Slug:          "sira-gecesi-gelenegi-unesco-listesine-aday",
		},
		// ASAYİŞ
		{
			Headline:      "Emniyetten Dev Uyuşturucu Operasyonu",
			Description:   "Şanlıurfa Emniyet Müdürlüğü ekiplerince düzenlenen operasyonda çok miktarda uyuşturucu madde ele geçirildi.",
			Content:       "Narkotik Suçlarla Mücadele Şube Müdürlüğü ekiplerinin 3 aylık teknik takibi sonucu durdurulan bir tırda yapılan aramada, piyasa değeri milyonlarca lira olan uyuşturucu madde bulundu. Olayla ilgili 5 kişi gözaltına alındı.",
			Author:        "3. Sayfa",
			DatePublished: time.Now().Add(-8 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1555617778-02518510b9fa?auto=format&fit=crop&w=800&q=80",
			Category:      "asayis",
			Slug:          "emniyetten-dev-uyusturucu-operasyonu",
		},
		{
			Headline:      "Zincirleme Trafik Kazası: 5 Yaralı",
			Description:   "Şanlıurfa-Gaziantep karayolunda meydana gelen zincirleme trafik kazasında 5 kişi yaralandı.",
			Content:       "Yoğun sis nedeniyle görüş mesafesinin düştüğü yolda 3 araç birbirine girdi. Olay yerine çok sayıda ambulans ve itfaiye ekibi sevk edildi. Yaralılar çevredeki hastanelere kaldırıldı.",
			Author:        "3. Sayfa",
			DatePublished: time.Now().Add(-10 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1566679056285-511b23250b71?auto=format&fit=crop&w=800&q=80",
			Category:      "asayis",
			Slug:          "zincirleme-trafik-kazasi-5-yarali",
		},

		// EKSTRA GÜNDEM (Manşetler için)
		{
			Headline:      "Cumhurbaşkanı Şanlıurfa'ya Geliyor",
			Description:   "Cumhurbaşkanı, toplu açılış töreni için önümüzdeki hafta Şanlıurfa'yı ziyaret edecek.",
			Content:       "Cumhurbaşkanlığı İletişim Başkanlığı'ndan yapılan açıklamaya göre, Cumhurbaşkanı önümüzdeki Cuma günü Şanlıurfa'da olacak. Abide Meydanı'nda halka hitap edecek olan Cumhurbaşkanı, yapımı tamamlanan 50 tesisin açılışını gerçekleştirecek.",
			Author:        "Ankara Bürosu",
			DatePublished: time.Now().Add(-30 * time.Minute),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=800&q=80",
			Category:      "gundem",
			Slug:          "cumhurbaskani-sanliurfaya-geliyor",
		},
		{
			Headline:      "Turizm Sezonu Beklentileri Aştı",
			Description:   "Şanlıurfa'da otel doluluk oranları %95'e ulaştı. Esnafın yüzü gülüyor.",
			Content:       "Kültür ve inanç turizminin başkenti Şanlıurfa, bahar aylarında turist akınına uğradı. Otellerde yer bulmak neredeyse imkansız hale gelirken, restoranlar ve hediyelik eşya dükkanları da yoğunluktan nasibini aldı.",
			Author:        "Mehmet Demir",
			DatePublished: time.Now().Add(-2 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80",
			Category:      "gundem",
			Slug:          "turizm-sezonu-beklentileri-asti",
		},
		{
			Headline:      "Yeni Organize Sanayi Bölgesi Kuruluyor",
			Description:   "Şanlıurfa'ya 3. Organize Sanayi Bölgesi kurulması için imzalar atıldı. 5 bin kişiye istihdam sağlanacak.",
			Content:       "Sanayi ve Teknoloji Bakanlığı'nın onayıyla Şanlıurfa'da yeni bir sanayi hamlesi başlıyor. Gıda ve tekstil ağırlıklı olacak yeni OSB'nin 2 yıl içinde faaliyete geçmesi planlanıyor.",
			Author:        "Ekonomi Servisi",
			DatePublished: time.Now().Add(-15 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
			Category:      "ekonomi",
			Slug:          "yeni-organize-sanayi-bolgesi-kuruluyor",
		},
		{
			Headline:      "Gençlik Merkezleri Yaz Okulları Başlıyor",
			Description:   "Şanlıurfa Büyükşehir Belediyesi Gençlik Merkezleri, yaz döneminde çocuklara kapılarını açıyor.",
			Content:       "Yaz tatilini verimli geçirmek isteyen öğrenciler için spor, sanat ve bilim atölyeleri düzenlenecek. Kayıtlar bugün itibarıyla başladı.",
			Author:        "Eğitim Servisi",
			DatePublished: time.Now().Add(-1 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
			Category:      "egitim",
			Slug:          "genclik-merkezleri-yaz-okullari-basliyor",
		},
		{
			Headline:      "Şanlıurfa Mutfağı Dünyaya Tanıtılıyor",
			Description:   "Gastronomi şehri Şanlıurfa'nın lezzetleri, uluslararası yemek festivalinde görücüye çıktı.",
			Content:       "Paris'te düzenlenen Uluslararası Gastronomi Festivali'nde Şanlıurfa standı büyük ilgi gördü. Çiğ köfte, lahmacun ve şıllık tatlısı ziyaretçilerden tam not aldı.",
			Author:        "Kültür Sanat",
			DatePublished: time.Now().Add(-5 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1626804475297-411dbe63c494?auto=format&fit=crop&w=800&q=80",
			Category:      "yasam",
			Slug:          "sanliurfa-mutfagi-dunyaya-tanitiliyor",
		},
		{
			Headline:      "Karaköprü'de Park Sayısı Artıyor",
			Description:   "Karaköprü Belediyesi, ilçeye 5 yeni park daha kazandırıyor. Yeşil alan miktarı artıyor.",
			Content:       "Daha yeşil bir Karaköprü hedefiyle yola çıkan belediye ekipleri, Atakent ve Doğukent mahallelerinde yeni parkların yapımına başladı. Parklarda yürüyüş yolları, çocuk oyun alanları ve spor aletleri yer alacak.",
			Author:        "Yerel Haberler",
			DatePublished: time.Now().Add(-7 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=800&q=80",
			Category:      "gundem",
			Slug:          "karakoprude-park-sayisi-artiyor",
		},
		{
			Headline:      "Eyyübiye'de Kentsel Dönüşüm Hızlandı",
			Description:   "Eyyübiye Belediyesi, riskli yapıların yıkımına devam ediyor. Yerine modern konutlar inşa edilecek.",
			Content:       "Deprem riskine karşı başlatılan kentsel dönüşüm çalışmaları kapsamında Eyyübiye'de 50 bina daha yıkıldı. Hak sahipleriyle anlaşmalar tamamlandı, yeni projelerin temeli yakında atılacak.",
			Author:        "Yerel Haberler",
			DatePublished: time.Now().Add(-9 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
			Category:      "gundem",
			Slug:          "eyyubiyede-kentsel-donusum-hizlandi",
		},
		{
			Headline:      "Haliliye'de Sosyal Yardım Seferberliği",
			Description:   "Haliliye Belediyesi, ihtiyaç sahibi ailelere gıda ve giyim yardımında bulunuyor.",
			Content:       "Sosyal belediyecilik anlayışıyla hareket eden Haliliye Belediyesi, tespit edilen 1000 aileye yardım kolisi dağıttı. Başkan Canpolat, 'Kimse yatağa aç girmesin diye çalışıyoruz' dedi.",
			Author:        "Yerel Haberler",
			DatePublished: time.Now().Add(-11 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
			Category:      "yasam",
			Slug:          "haliliyede-sosyal-yardim-seferberligi",
		},
		{
			Headline:      "Birecik Barajı'nda Su Seviyesi Yükseldi",
			Description:   "Son yağışlarla birlikte Birecik Barajı'nda doluluk oranı %80'e ulaştı. Çiftçiler umutlu.",
			Content:       "Bölge tarımı için hayati öneme sahip olan Birecik Barajı'nda su seviyesinin yükselmesi, kuraklık endişesi yaşayan çiftçileri sevindirdi. DSİ yetkilileri, bu yıl sulamada sorun yaşanmayacağını belirtti.",
			Author:        "Çevre Haberleri",
			DatePublished: time.Now().Add(-13 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
			Category:      "cevre",
			Slug:          "birecik-barajinda-su-seviyesi-yukseldi",
		},
		{
			Headline:      "Halfeti'de Tekne Turlarına İlgi Büyük",
			Description:   "Saklı cennet Halfeti, hafta sonu ziyaretçi akınına uğradı. Tekne turları için uzun kuyruklar oluştu.",
			Content:       "Batık şehir Halfeti'yi görmek isteyen yerli ve yabancı turistler, Fırat Nehri üzerinde tekne turu yaparak tarihi güzellikleri keşfetti. Esnaf, yoğunluktan memnun.",
			Author:        "Seyahat",
			DatePublished: time.Now().Add(-14 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
			Category:      "yasam",
			Slug:          "halfetide-tekne-turlarina-ilgi-buyuk",
		},
		{
			Headline:      "Siverek'te Kültür Merkezi Açıldı",
			Description:   "Siverek Belediyesi tarafından yaptırılan modern kültür merkezi törenle hizmete girdi.",
			Content:       "İçerisinde kütüphane, sinema salonu ve atölyelerin bulunduğu Siverek Kültür Merkezi, düzenlenen törenle açıldı. Merkez, gençlerin sosyal ve kültürel gelişimine katkı sağlayacak.",
			Author:        "Kültür Sanat",
			DatePublished: time.Now().Add(-16 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
			Category:      "kultur-sanat",
			Slug:          "siverekte-kultur-merkezi-acildi",
		},
		{
			Headline:      "Viranşehir'de Güneş Enerjisi Yatırımı",
			Description:   "Viranşehir ilçesinde kurulacak dev güneş enerjisi santrali için çalışmalar başladı.",
			Content:       "Yenilenebilir enerji kaynaklarına yönelik yatırımlar kapsamında Viranşehir'de 50 MW gücünde GES kurulacak. Proje tamamlandığında 20 bin hanenin elektrik ihtiyacını karşılayacak.",
			Author:        "Ekonomi",
			DatePublished: time.Now().Add(-18 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
			Category:      "ekonomi",
			Slug:          "viransehirde-gunes-enerjisi-yatirimi",
		},
		{
			Headline:      "Ceylanpınar'da Tarım Fuarı Düzenlendi",
			Description:   "Bölgenin en büyük tarım işletmesine ev sahipliği yapan Ceylanpınar'da Tarım ve Hayvancılık Fuarı kapılarını açtı.",
			Content:       "Tarım teknolojilerindeki son yeniliklerin sergilendiği fuara çiftçiler yoğun ilgi gösterdi. Traktörler, sulama sistemleri ve tohum çeşitleri tanıtıldı.",
			Author:        "Tarım",
			DatePublished: time.Now().Add(-20 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
			Category:      "ekonomi",
			Slug:          "ceylanpinarda-tarim-fuari-duzenlendi",
		},
		{
			Headline:      "Suruç'ta Nar Hasadı Başladı",
			Description:   "Suruç Ovası'nda nar hasadı bereketli başladı. Rekoltenin yüksek olması bekleniyor.",
			Content:       "Kendine has tadı ve rengiyle ünlü Suruç narı, dalından toplanmaya başlandı. Bu yıl verimin yüksek olması üreticinin yüzünü güldürdü. Narların büyük kısmı ihraç edilecek.",
			Author:        "Tarım",
			DatePublished: time.Now().Add(-22 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
			Category:      "ekonomi",
			Slug:          "suructa-nar-hasadi-basladi",
		},
		{
			Headline:      "Bozova'da Su Sporları Festivali",
			Description:   "Atatürk Barajı kıyısındaki Bozova ilçesinde düzenlenen Su Sporları Festivali renkli görüntülere sahne oldu.",
			Content:       "Kano, yelken ve yüzme yarışlarının yapıldığı festivale çevre illerden de sporcular katıldı. Dereceye girenlere ödülleri verildi.",
			Author:        "Spor",
			DatePublished: time.Now().Add(-23 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
			Category:      "spor",
			Slug:          "bozovada-su-sporlari-festivali",
		},
		{
			Headline:      "Hilvan'da Yol Çalışmaları Sürüyor",
			Description:   "Hilvan Belediyesi, ilçe genelinde asfaltlama ve kilitli parke taşı döşeme çalışmalarına hız verdi.",
			Content:       "Kış ayları öncesinde yolları yenilemek için seferber olan belediye ekipleri, bozuk yolları onarıyor. Vatandaşlar çalışmalardan memnun.",
			Author:        "Yerel Haberler",
			DatePublished: time.Now().Add(-25 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1584972191378-d70853825a54?auto=format&fit=crop&w=800&q=80",
			Category:      "gundem",
			Slug:          "hilvanda-yol-calismalari-suruyor",
		},
		{
			Headline:      "Akçakale Gümrük Kapısı'nda Yoğunluk",
			Description:   "Suriye ile ticaretin önemli noktalarından Akçakale Gümrük Kapısı'nda tır kuyruğu oluştu.",
			Content:       "İhracatın artmasıyla birlikte gümrük kapısında yoğunluk yaşanıyor. Yetkililer, geçişlerin hızlanması için ek önlemler aldı.",
			Author:        "Ekonomi",
			DatePublished: time.Now().Add(-26 * time.Hour),
			DateModified:  time.Now(),
			Image:         "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
			Category:      "ekonomi",
			Slug:          "akcakale-gumruk-kapisinda-yogunluk",
		},
	}

	for _, article := range news {
		// Check if exists
		var count int64
		db.Model(&models.NewsArticle{}).Where("slug = ?", article.Slug).Count(&count)
		if count == 0 {
			if err := db.Create(&article).Error; err != nil {
				fmt.Printf("Error creating article %s: %v\n", article.Headline, err)
			} else {
				fmt.Printf("Created article: %s\n", article.Headline)
			}
		} else {
			fmt.Printf("Article already exists: %s\n", article.Headline)
		}
	}

	fmt.Println("Seeding completed!")
}
