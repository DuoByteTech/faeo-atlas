# Faeo Atlas

War of Dragons için Türkçe, mobil uyumlu, genel amaçlı bilgi ve tanıtım sitesi. Belirli bir seviye veya karakter sınıfına göre tasarlanmadı. Giriş, üyelik, sunucu veya API anahtarı gerektirmez.

## Başlatma

Node.js 24 önerilir (minimum 22.12). Depoyu klonla; `package.json` bulunan `faeo-atlas` klasörünü VS Code ile aç. Terminalde:

```bash
npm ci
npm run dev
```

Terminalde görünen yerel bağlantıyı aç (genellikle http://localhost:5173). `index.html` dosyasına çift tıklayarak çalıştırma.

```bash
npm run build       # dist/ klasörüne üretim çıktısı
npm run preview     # üretim çıktısını yerelde önizle
npm run lint        # ESLint
npm test            # veri bütünlüğü ve filtre kontrolleri
npm run format      # dosyaları Prettier ile biçimlendir
```

## Teknolojiler

- React + Vite + saf JavaScript / JSX (TypeScript kullanılmadı)
- Tailwind CSS 4, resmî Vite eklentisiyle; özel tasarım stilleri `src/styles/` altında
- React Router: HashRouter ile taşınabilir statik dağıtım
- Lucide React ikonları
- ESLint, Prettier ve Node test runner
- Kesin paket sürümleri ve `package-lock.json` birlikte teslim edilir.

## Madalya güncellemesi — 1 Ekim 2026

23 itibar rehberi eklendi. Başlangıç şartları, itibar kasma yöntemleri, 19 kayıtta kırmızı görev adımları, kaynak bağlantıları ve tarayıcıda saklanan malzeme listeleri bulunur. Dört kayıtta kırmızı görev bilgisi kısmi/araştırılıyor olarak işaretlidir. Oyun içindeki tüm itibarların eksiksiz listesi değildir.

## Sayfalar

| Adres                       | İçerik                                                   |
| --------------------------- | -------------------------------------------------------- |
| `/#/`                       | Tanıtım, kategori keşfi, seçilmiş desteler               |
| `/#/desteler`               | Arama, kategori/kaynak filtreleri, sıralama, favoriler   |
| `/#/desteler/kings-burden`  | Türkçe açıklama, kullanım, geliştirme ve kaynak          |
| `/#/karsilastir`            | En fazla üç desteyi yan yana karşılaştırma               |
| `/#/rehber`                 | Av, PvP, toplama/etkinlik ve boss/itibar önerileri       |
| `/#/madalyalar`             | İtibar/madalya arama ve filtreleme                       |
| `/#/madalyalar/juggernauts` | Kasılma, malzemeler, kırmızı görev adımları ve kaynaklar |
| `/#/kaynaklar`              | Kaynak türleri ve araştırma günlüğü                      |

Favoriler ve karşılaştırma seçimi yalnızca kullanılan tarayıcıda localStorage ile tutulur. Başka cihaza aktarılmaz. Depolama kullanılamadığında mevcut oturumda çalışmaya devam eder.

## Dosyalama

```text
faeo-atlas/
  public/
    favicon.svg
    images/decks/README.md
  src/
    app/App.jsx
    main.jsx
    components/
      layout/              # AppHeader, AppFooter, AppLayout
      ui/                  # AppButton, AppContainer, AppBadge, AppIcon...
    features/
      home/
        components/HomeHero.jsx
        pages/HomePage.jsx
      decks/
        components/        # DeckCard, DeckArtwork, CompareTray
        context/           # DeckContext, DeckProvider
        data/              # decks.js, categories.js
        hooks/             # useDeckLibrary
        pages/             # katalog, detay, karşılaştırma
        utils/             # filtreleme
      reputations/
        data/reputations.js
        pages/             # madalya kataloğu ve detay
      guides/
        data/strategies.js
        pages/GuidePage.jsx
      research/
        data/research.js
        pages/ResearchPage.jsx
    hooks/                 # genel useLocalStorage, usePageTitle
    pages/AppNotFoundPage.jsx
    styles/index.css
  tests/catalog.test.js
  docs/
    ARCHITECTURE.md
    CONTENT_GUIDE.md
    IMAGES.md
    TESTING.md
  eslint.config.js
  vite.config.js
  jsconfig.json
  package.json
  package-lock.json
```

Ortak bileşenler `App` ile başlar. Özelliğe ait bileşenler ilgili feature içinde ve anlamlı adla tutulur. `@/` alias'ı `src/` dizinine karşılık gelir. Klasörler çalışır içerik barındırır; gereksiz servis/backend katmanı eklenmedi.

## İçerik ekleme

Önce `docs/CONTENT_GUIDE.md` dosyasını oku. Deste kayıtları `src/features/decks/data/decks.js` içindedir. Kart, detay, arama ve karşılaştırma aynı veriyi kullanır; bir kaydı değiştirmek tümünü günceller. Kategori sayıları ve toplam kayıt sayısı otomatik hesaplanır.

Bu sürüm 64 kayıt içerir: doğrulanmış EN eşya sayfaları, eksik/eski kayıtlar ve ayrı etiketlenen RU kayıtları. Geliştirmeler normal destenin `upgrade` alanında tutulur. İçerik 30 Eylül 2026 araştırmasına dayanır; site canlı veri çekmez. Yeni araştırma yapıldığında veriler ve kaynak tarihi elle güncellenmelidir.

## Görseller

Ek dosya vermeden çalışır. CSS ve Lucide ile sembolik kategori illüstrasyonları hazırlanmıştır; oyun içi kart görseli olarak sunulmaz. Gerçek görselleri daha sonra eklemek için ölçüler, adlandırma ve örnek kod `docs/IMAGES.md` içinde.

## Dağıtım

`npm run build` sonrası `dist/` içeriğini statik bir web sunucusuna yükle. Göreli `base` ve hash rotaları sayesinde alt klasörde de çalışır; özel sunucu rewrite kuralı gerekmez. Kaynak klasörü ile `dist/` birbirinden farklıdır. Bu teslimde canlı yayın yapılmadı.

HashRouter, ZIP projesini farklı sunucularda kolay çalıştırmak için seçildi. Ayrı sayfalar için ileri düzey arama motoru indekslemesi veya sosyal paylaşım meta etiketleri gerektiğinde prerender/SSR planlanmalı. Mevcut sürüm istemci tarafında sayfa başlıklarını değiştirir ve genel açıklama metası içerir.

## Araştırma ilkesi

Türkçe isimler editoryal çeviridir; arama için özgün İngilizce adlar korunur. Alım sıraları resmî oyun verisi değil editoryal öneridir. Fiyat ve kâr garantisi verilmez. Eski forum bilgisi, güncel eşya açıklaması ve farklı sunucu verisi birbirinden ayrılır.
