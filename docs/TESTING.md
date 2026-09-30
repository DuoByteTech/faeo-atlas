# Teslim kontrolü

30 Eylül 2026 tarihinde bu sürüm için yapılan kontroller:

- `npm run build`: başarılı.
- `npm run lint`: başarılı.
- `npm test`: 3 test başarılı; kayıt kimlikleri, kaynaklar, öneri referansları ve filtreler.
- Chromium tarayıcı kontrolü: 64 kaydın listelenmesi, Türkçe arama, kaynak filtresi, yenileme sonrası favorilerin korunması, üç deste karşılaştırma sınırı, karşılaştırmayı temizleme, hedef rehberi sekmeleri, detay sayfası ve mobil menü başarılı.
- 320, 390, 768 ve 1440 piksel genişliklerde 7 rota kontrol edildi; sayfa seviyesinde yatay taşma bulunmadı. Karşılaştırma tablosunun kendi içinde kayması tasarım gereğidir.
- Bu akışlarda yakalanan JavaScript sayfa hatası yok.
- Masaüstü ve mobil ana sayfa ekran görüntüleri `desktop-preview.png` ve `mobile-preview.png` olarak bu dizindedir.

Tarayıcı akışı geliştirme sunucusunda çalıştırıldı. Üretim derlemesi ayrıca doğrulandı. Gerçek iOS Safari ve Android cihaz testi yapılmadı. Oyun verileri canlı API ile senkronize değildir; kaynakların gelecekte değişmesi bu yazılım testlerinin kapsamı dışındadır.

## Sonraki düzenlemeler için kısa kontrol

1. Türkçe karakter içeren bir arama yap.
2. Kategori ve kaynak filtresini birlikte dene; boş sonuç görünümünü kontrol et.
3. Favori ekle, sayfayı yenile, Kaydedilenler filtresini aç.
4. Üç deste karşılaştır; dördüncünün eklenemediğini kontrol et.
5. Mobil menüyü ve 320 px görünümü kontrol et.
6. Deste detayındaki kaynak bağlantısını ve araştırma tarihini kontrol et.
7. `npm run lint`, `npm test` ve `npm run build` çalıştır.
