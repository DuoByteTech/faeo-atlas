# Görsel rehberi

İlk sürümün çalışması için görsel eklemek gerekmiyor. Sembolik kartlar CSS geometrisi ve Lucide ikonlarıyla çizilir; gerçek oyun kartı olarak sunulmaz. Haricî görsel veya font servisine bağlı değildir.

## Gerçek deste görsellerini eklemek istersen

- Dizin: `public/images/decks/`
- Biçim: WebP önerilir; PNG/JPG de kullanılabilir.
- Boyut: 900 × 600 px (3:2); kritik nesneyi merkezde tut. Detayda farklı kırpma olabileceği için kenarlara yazı koyma.
- Dosya boyutu: tercihen 150 KB altında.
- Dosya adı: deste `id` alanıyla aynı, küçük harf ve tire.

Örnekler:

| Görsel             | Dosya adı                 |
| ------------------ | ------------------------- |
| King's Burden      | `kings-burden.webp`       |
| Guardians of Truth | `guardians-of-truth.webp` |
| Magical Flora      | `magical-flora.webp`      |
| Farmer's Gift      | `farmers-gift.webp`       |
| Gnome Runes        | `gnome-runes.webp`        |

Ardından ilgili kayıtta:

```js
image: 'images/decks/kings-burden.webp';
```

Başa `/` koyma; uygulama dağıtım alt klasörünü `import.meta.env.BASE_URL` ile ekler. `image: null` olduğu sürece sembolik çizim gösterilir. Görsel yüklenemezse alttaki çizim görünmeye devam eder.

Gerçek görsel eklenen detay sayfasındaki açıklama otomatik olarak “Deste görseli” olur. Kaynak ve kullanım hakkını ayrıca doğrula. Şu an pakette üçüncü taraf oyun görselleri yoktur.

## İsteğe bağlı sonraki görseller

- Ana sayfa atmosfer görseli: `public/images/home/faeo-landscape.webp`, 1920 × 1080, yazısız, karanlık ve sakin.
- Paylaşım kapak görseli: `public/images/social/faeo-atlas-cover.webp`, 1200 × 630.

Bu iki görsel ilk sürümde kullanılmıyor; eklenirse ilgili bileşene/meta etiketine ayrıca bağlanmalı. Kart görselleri ise mevcut `image` alanından doğrudan çalışır.
