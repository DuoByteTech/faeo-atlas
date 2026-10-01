# Mimari ve geliştirme kuralları

## Feature-based yapı

- `app/`: uygulama bileşimi ve rota tanımları. İş verisi burada tutulmaz.
- `components/ui/`: alan bağımsız ortak bileşenler. İsimleri `App` ile başlar.
- `components/layout/`: ortak sayfa kabuğu, gezinme, alt alan.
- `features/`: içerik ve davranışın sahibi olan alanlar. Her alan kendi `data`, `components`, `pages`, `hooks`, `utils` dizinlerini ihtiyacına göre kullanır.
- `hooks/`: birden fazla alanda tekrar kullanılabilecek tarayıcı ve başlık yardımcıları.
- `styles/`: Tailwind girişi, tema değişkenleri, özel görsel bileşenler ve responsive kurallar.

## Veri akışı

`decks.js` → katalog/kart/detay/karşılaştırma. `strategies.js` yalnız deste kimliklerini referans eder. Açıklamalar öneri gerekçeleridir; aynı oyun verisini ikinci kez kopyalamaz. Araştırma kaynak listesi `research.js` içindedir.

Favoriler ve karşılaştırma DeckProvider içinde paylaşılır. Depolanan kimlikler açılışta kontrol edilir; geçersiz/bozuk kayıtlar varsayılana döner. Karşılaştırma sınırı hem state katmanında hem butonlarda 3'tür.

Filtreler URL arama parametrelerinde tutulur. Böylece filtrelenmiş görünüm paylaşılabilir ve sayfa yenilendiğinde korunur. Ayrıntı, katalog ve kaynak sayfaları lazy yüklenir.

## Yeni araştırma alanı

Görev veya boss rehberleri eklerken örneğin `features/quests/` oluştur:

1. `data/quests.js`: doğrulanmış içerik ve kaynaklar.
2. `components/`: bu alana özel kart/ilerleme bileşenleri.
3. `pages/`: liste ve detay sayfası.
4. `app/App.jsx`: yeni rotalar.
5. `components/layout/AppHeader.jsx`: gezinme bağlantısı.
6. `research/data/research.js`: güncelleme notu.

Sırf klasör oluşturmak için boş `services`, `api` veya `store` ekleme. Gerçek bir veri servisi ihtiyacı ortaya çıkarsa ekle.

## Tasarım ve erişilebilirlik

Koyu orman yeşili, sıcak altın vurgular, ince çerçeveler. İkonlar Lucide; dekoratif ikonlar erişilebilirlik ağacından gizli. Düğmelerde durum etiketleri, giriş alanlarında label, klavye odak görünümü, içerik atlama bağlantısı, reduced-motion desteği bulunur. Karşılaştırma tablosu dar ekranda kendi içinde yatay kayar.

Bütün sayfalar Türkçe. Oyun adları ve eşya isimlerinin özgün yazımı ikincil bilgi olarak korunur. Belirli oyuncu, sınıf veya seviye üzerine varsayım yapılmaz; seviye yalnız eşya kullanım şartıysa belirtilir.

## Madalyalar alanı

`features/reputations/data/reputations.js` tek içerik kaynağıdır. `ReputationCatalogPage` arama ve kategori/kapsam filtresini; `ReputationDetailPage` kaynakları, görev adımlarını ve malzeme kontrol listesini gösterir. Sayfalar lazy yüklenir. Katalog filtreleri bu sürümde oturumluk React state içindedir (deste filtreleri gibi URL'de saklanmaz).

Hazırlık listesi `useLocalStorage` ortak hook'u ile her itibar kimliği için ayrı saklanır. `ReputationGuide` rota kimliğiyle yeniden kurulur; bir madalyanın işaretleri diğerine taşınmaz. Kaydetme, oyun envanteriyle bağlantılı değildir. Malzeme sırası değiştirilirse `faeo-medal-materials-v1` anahtar sürümünü yükselt.

## Aşama tabloları ve görseller

- `ReputationDataTables`: görev/teslimat, ödül ve takas sekmeleri; her tablonun kendi kaynak bağlantısı.
- `ReputationMilestones`: itibarın beş madalya aşaması, değiştirilebilir yerel görseller.
- `AppItemImage`: ortak görsel bileşeni; yüklenemeyen dosyada erişilebilir sembolik ikon.
- `ReputationImagesPage`: `/#/madalyalar/gorseller`; dosya adı arama, kademeli listeleme ve CSV indirme.
- `reputationItems.js`: paylaşılan eşya/görsel sözlüğü; `reputationTables.js`: hücrelerde yalnız bu sözlüğün kimlikleri.

Tablolar mobilde kendi kapsayıcısında kayar. Yüzlerce görsel aynı anda yüklenmez: img lazy loading, görsel rehberinde 30'ar kayıt kullanılır.
