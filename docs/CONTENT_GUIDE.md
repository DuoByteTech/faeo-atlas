# Araştırma içeriği nasıl güncellenir?

Ana dosya: `src/features/decks/data/decks.js`.

```js
{
  id: 'yeni-deste',                 // benzersiz, küçük harf, URL dostu
  name: 'Original Deck Name',       // oyundaki özgün ad
  title: 'Türkçe Deste Adı',        // açıklayıcı Türkçe karşılık
  category: 'buff',                 // categories.js içindeki kimlik
  frequency: 'Haftada 1',           // normal sürüm
  effect: 'Doğrulanmış temel etki.',
  note: 'Koşullar, istisnalar ve ayrıntılar.',
  upgrade: 'Geliştirilmiş sürüm farkları.', // bilgi yoksa boş metin
  status: 'verified',               // verified | partial | ru
  source: 'https://warofdragons.com/artifact_info.php?artikul_id=...',
  updatedAt: '2026-09-30',           // gerçekten incelendiği tarih
  image: null                      // veya images/decks/yeni-deste.webp
}
```

## Kontrol sırası

1. Önce güncel resmî eşya açıklamasını incele.
2. Etkinin ayrıca bir eşya sayfası varsa sayısal bonusu oradan doğrula.
3. Normal sürüm ile geliştirmeyi ayır; evrensel kullanım sayısı varsayma.
4. EN sunucusu, RU sunucusu ve eski topluluk rehberini ayır.
5. Eksik bilgiyi tahminle doldurma; `partial` ve açık not kullan.
6. Birden fazla kaynağa ihtiyaç duyulursa veri modeline `sources` dizisi eklenebilir; mevcut `source` ana eşya/referans bağlantısıdır.
7. Tarihi, gerçekten inceleme yapıldığında değiştir.
8. Yeni öneri gerekiyorsa `guides/data/strategies.js` içinde mevcut `id` ile ilişkilendir.
9. `research/data/research.js` günlüğüne gerçek değişikliği ekle.
10. `npm test`, `npm run lint`, `npm run build` çalıştır.

## Durumlar

- `verified`: EN eşya açıklaması doğrulandı. Kaydın notları yine özel koşullar içerebilir.
- `partial`: eski kaynak veya eksik detay. Listede açık uyarı görünür.
- `ru`: RU açıklaması doğrulandı; EN edinilebilirliği doğrulanmadı.

Sitede toplam sayı otomatik hesaplanır. Ana sayfa seçkisi `HomePage.jsx` içindeki kimlik dizisiyle; hedef bazlı öneriler `strategies.js` ile değişir.

## Yayına yansıması

Bu bir statik React uygulamasıdır. Dosyayı değiştirdikten sonra geliştirme sunucusu değişikliği otomatik gösterir. Yayındaki sürüm için yeniden `npm run build` yapıp `dist/` içeriğini yüklemek gerekir. Site kendiliğinden araştırma yapmaz veya kaynak sitelerden veri çekmez.

## Madalya ve itibar ekleme

Veri: `src/features/reputations/data/reputations.js`.

- `id`: kalıcı rota kimliği; `title`: Türkçe ad; `name`: oyundaki ad.
- `libraryId`: ilgili resmî kütüphane sayfası.
- `level` ve `redLevel`: başlangıç ve Worship görev seviyesi; çelişki varsa `notes` içinde açıkla.
- `unlock`, `npc`, `farming`: kabul şartları ve itibar kasma yöntemi.
- `materials`: `{ name, amount }` listesi; alternatif kalemleri birlikte zorunlu gösterme.
- `steps`: sıralı kırmızı görev özeti; `alternative`: Spark vb. alternatiflerin hangi aşamayı kapsadığı.
- `partial`: tam kırmızı görev doğrulanmadığında `true`; `notes`: eksik aşama, çelişki ve sınırlar.
- `checkedAt`: kaynakların araştırıldığı tarih; oyun içi test tarihi değildir.

Bu sürümde 23 itibar kaydı vardır; oyundaki tüm itibarları kapsamaz. Ranger, Mystic, Treasure Hunters ve Labyrinth kırmızı görevleri eksik/kısmi işaretlidir. Labyrinth malzeme listesi yalnız doğrulanan hazırlık aşamalarını kapsar. Pet Patrons teslimatındaki İngilizce/Türkçe kaynak farkı açıklanmıştır. Başlangıç yöntemi resmî kütüphaneden, Worship teslimatları topluluk forumundan derlenmiştir; kaynaklara tüm detay sayfalarından ulaşılır.

Madalya görselleri sembolik CSS/Lucide çizimleridir; resmî oyun eşyası görseli değildir. Kullanıcıdan görsel beklenmez. Daha sonra izinli oyun görselleri eklenebilir.

## Puan, görev, teslimat ve ödül tabloları

`reputationTables.js` kaynaklı tablo verisidir: itibar/kütüphane kimliği → tablolar → başlıklar ve satırlar. Her hücre `text` ve `items: [{ itemId, quantity? }]` taşır. `kind` değerleri `farm`, `rewards`, `exchange`. Takas miktarı itibar kazanımıyla aynı değildir; kullanıcıya ayrı sekmede sunulur.

`reputationItems.js` tek eşya sözlüğüdür: özgün ad, yerel görsel yolu, referans görsel URL'si ve oyun eşya sayfası. HTML render edilmez. Veri güncellenirken kaynakta hücre içine yerleştirilmiş miktarları (ör. Mystic 200 / 20 / 50) koru. Birleştirilmiş tablo hücreleri açık sütunlara dönüştürülmüştür.

Night Stealers kütüphane 63, Stone Lotus metin 218, Red Axes metin 219 ödüllerini kullanır; üç klanın ödüllerini aynı tabloyla gösterme. Kırmızı görev kaynakları güncellendi; Mystic, Ranger ve Treasure Hunters artık adımlıdır. Labyrinth'in Liberation ana yolu mevcut; alternatif sonların bütün diyalogları henüz kapsamda değildir. Rus sunucusundaki farklı miktarlar İngiliz sunucusu verileriyle birleştirilmez.

Görseller için `public/images/reputations/README.md` ve `manifest.csv` kullan. Dosyalar kullanıcı tarafından eklenecek; mevcut ikonlar yalnız yer tutucudur. Malzeme sırası değiştiği için kontrol listesi anahtarı v2'ye yükseltildi.
