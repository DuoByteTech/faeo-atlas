# Madalya ve eşya görsellerini ekleme

Tüm eşleştirmeler `manifest.csv` ve `manifest.json` içinde. Sitede `/#/madalyalar/gorseller` sayfasından isim veya dosya yoluyla aranabilir.

1. `name` sütunundan eşyanın adını bul. `source` eşya sayfası; `referenceImage` kaynakta görülen görselin bağlantısıdır.
2. İzinli görseli **gerçek WebP formatına dönüştür**. Eşya için 120×120, madalya için 160×160 piksel yeterlidir; şeffaf arka plan önerilir.
3. `file` sütunundaki yolu birebir kullanarak GitHub'a ekle. Örnek: `public/images/reputations/items/item-1256.webp`.
4. Site yeniden dağıtıldığında görsel aynı eşyanın tüm geçtiği yerlerde otomatik görünür. React dosyası değiştirmen gerekmez.

- `items/`: oyun eşya kimliğiyle adlandırılan görseller.
- `materials/`: henüz kesin eşya kimliği eşleştirilemeyen teslimat kalemleri. Bazı kalemler alternatif grup veya eylemdir; bunlara istersen sembolik görsel koyabilirsin.
- `medals/`: her itibarın grey / green / blue / purple / red madalyası.

Görseller şu an yüklenmiş değildir. Eksik veya hatalı dosyada bileşen kırık görsel yerine sembolik ikon gösterir. Kaynak görseller otomatik indirilmez veya başka siteden sayfaya gömülmez. `referenceImage` boşsa güvenilir bir eşleştirme yapılmamıştır; dosya yolu yine hazırdır.

Miktarlar görsel dosyasına yazılmaz; veri katmanından ayrıca gösterilir. Kaynak sitenin ekran görüntüsünü tabloya dönüştürmek yerine tek tek eşya görsellerini kullan.
