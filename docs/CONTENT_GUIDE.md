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
