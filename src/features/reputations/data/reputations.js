export const reputations = [
  {
    id: 'hunters-of-fortune',
    title: 'Şans Avcıları',
    name: 'Hunters of Fortune',
    libraryId: 94,
    level: 2,
    redLevel: 5,
    category: 'Teslimat',
    npc: 'Poker / Cardsharp',
    unlock: 'Tavernadaki oyunlara erişim.',
    farming: [
      'Taverna oyunlarından Marvelous Glass edin; 100 cam teslimatı 20 itibar verir.',
      'Seviye sınırını ve güncel teslimat diyaloğunu kontrol ederek 3000 itibara ilerle.',
    ],
    materials: [
      {
        name: 'Grains of Magical Sand',
        amount: 1000,
      },
    ],
    steps: [
      '3000 itibarda Poker veya Cardsharp’tan kırmızı madalya görevini al.',
      'Manuscript of Crushing ile her 25 Marvelous Glass’ı 1–3 kuma dönüştür; 1000 kumu teslim et.',
    ],
    notes: '',
    alternative: 'Görevin tamamı için 7 Spark of the Heavenly Fires alternatifi bulunur.',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'relic-seekers',
    title: 'Kalıntı Arayıcıları',
    name: 'Relic Seekers',
    libraryId: 53,
    level: 2,
    redLevel: 5,
    category: 'Teslimat',
    npc: 'Samary / Menachem',
    unlock: 'Ayrı bir kabul görevi gerekmez.',
    farming: [
      'Bulduğun kalıntıları ve uygun çiçekleri NPC’ye teslim et; eşyanın itibar üst sınırına dikkat et.',
      '2–3. seviyede 1000, 4. seviyede 2000 sınırı vardır. Uygun koşullarda bir Spark 200 itibar sağlar.',
    ],
    materials: [
      {
        name: 'Goblet of Baddukh',
        amount: 1,
      },
      {
        name: 'Klesh Sarcophagus',
        amount: 3,
      },
      {
        name: 'Mask of Horror',
        amount: 10,
      },
      {
        name: 'Cuckoo Flowers',
        amount: 500,
      },
      {
        name: 'Fire Flowers',
        amount: 1000,
      },
    ],
    steps: [
      '3000 itibarda kırmızı madalya görevini al.',
      'Listedeki kalıntı ve çiçekleri toplayıp görev NPC’sine teslim et.',
    ],
    notes:
      'Kalıntıların çanta alanını ve ömrünü kontrol et; forum rehberinde 90 günlük ömür belirtilir.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'underground-knights',
    title: 'Yeraltı Şövalyeleri',
    name: 'Underground Knights',
    libraryId: 54,
    level: 3,
    redLevel: 5,
    category: 'PvP',
    npc: 'Vigor / Shodu',
    unlock: 'Yeraltı Şövalyeleri kabul görevlerini tamamla.',
    farming: [
      'Arena, Crystalline Caves ve Ancient Temple görevlerini düzenli tamamla.',
      'Görevlerin yenilenme süreleri farklıdır; Crystalline Coal haftalık, Caves zinciri günlük görevlerdendir.',
      'Uygun seviyede Spark başına 100 itibar; 3. seviyede 1000 sınırı uygulanır.',
    ],
    materials: [
      {
        name: 'Crystalline Coal',
        amount: 250,
      },
      {
        name: 'Tournament of Worship zaferi',
        amount: 10,
      },
      {
        name: 'Combat Certificate',
        amount: 50,
      },
    ],
    steps: [
      '3000 itibarda üç belgeyi isteyen görevi al.',
      'Kömür, turnuva ve savaş sertifikası koşullarını ayrı ayrı tamamla.',
      '50 Combat Certificate için toplam 500 scalp gerekir; sertifikaları satın alma yolu da vardır. Üç belgeyi teslim et.',
    ],
    notes:
      'Eski 2016 rehberindeki 350 scalp ile yeni rehberdeki 500 scalp farklıdır; burada yeni rehber esas alındı.',
    alternative:
      'Her turnuva zaferi yerine 2 Spark kullanılabilir; 10 zaferin tamamı için 20 Spark. Bu seçenek diğer iki belgeyi karşılamaz.',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'hunters-of-undead',
    title: 'Ölümsüz Avcıları',
    name: 'Hunters of the Undead',
    libraryId: 84,
    level: 3,
    redLevel: 7,
    category: 'PvE',
    npc: 'Shiko — Royal Tomb / Tomb of Kings',
    unlock: 'Fighting the Undead görevini bitir.',
    farming: [
      'Derelict House ve Magish bölgesindeki bossları kes; itibarın yükseldikçe üst sınırı daha yüksek bosslara geç.',
      'Spark başına 200 itibar alternatifi vardır; düşük seviyelerde üst sınır uygulanır.',
    ],
    materials: [
      {
        name: 'Bringer of Evil Skull',
        amount: 100,
      },
      {
        name: 'Torch',
        amount: 1,
      },
    ],
    steps: [
      '3000 itibarda Shiko’dan görevi al. Torch için 500 mercenary itibarıyla açılan dükkânı kontrol et.',
      'Catacombs içindeki Forgotten Library’de kadehi kullan; Enraged Dragon [15] savaşını kazan.',
      'Obscurant’ı alıp Shiko’ya teslim et.',
    ],
    notes:
      'Yenilgi halinde 100 kafatası yeniden gerekebilir. Grup savaşında Obscurant’ın kime düştüğünü kontrol et.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'juggernauts',
    title: 'Juggernautlar',
    name: 'Juggernauts',
    libraryId: 83,
    level: 3,
    redLevel: 11,
    category: 'PvE',
    npc: 'Gredeya / Brugilda',
    unlock: 'Uygun superbeing avlarına ve kaynak toplama kitaplarına hazırlan.',
    farming: [
      'Superbeing avlarıyla itibar kazan; güçlü bosslar daha yüksek itibar aralıklarına hizmet eder.',
      'Kaynak çıkarma kitaplarını Secret Knowledge şartına göre öğren. Kaynakları Quicksilver’a çevirme, boss avının yerine geçen otomatik itibar değildir.',
      'Spark başına 100 itibar; 8. seviyede 2000, 10. seviyede 2800 sınırı vardır.',
    ],
    materials: [
      {
        name: 'Liros Shining',
        amount: 200,
      },
      {
        name: 'Celestial Quicksilver',
        amount: 'Çağıracağın ruhlara göre',
      },
    ],
    steps: [
      'Awakening the Sacred Spring görevini 3000 itibarda al.',
      'Demonologist Berrush / I-Vidi’de kaynaklarını Celestial Quicksilver’a çevir.',
      'Gredeya / Brugilda üzerinden Ruined Temple of Truth’a gir, ruhları çağır ve Liros topla; 200 Liros’u teslim et.',
    ],
    notes:
      'Grup kurulması gerekir ama içeri tek girilir. Giriş 24 saatte bir, süre 3 saat; bir girişte en çok 35 Liros.',
    alternative:
      'Bir Spark 7 Liros yerine sayılabilir; tüm miktar için 29 Spark seçeneğini NPC’de kontrol et.',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'night-stealers',
    title: 'Gece Hırsızları',
    name: 'Night Stealers',
    libraryId: 63,
    level: 4,
    redLevel: 5,
    category: 'Paralı asker',
    npc: 'Phinko / Shuan',
    unlock: 'İlgili mercenary klanının kabul görevini tamamla.',
    farming: [
      'Klanın verdiği sözleşmeleri tamamlayarak itibar yükselt; görev yenilenmesini NPC’den takip et.',
      '4. seviyede 1000 itibar sınırı bulunur. Kabul görevi sonrasında uygun koşullarda Spark başına 200 itibar alınabilir.',
    ],
    materials: [
      {
        name: 'Imp Cube',
        amount: 50,
      },
      {
        name: 'Demon Cube',
        amount: 50,
      },
      {
        name: 'Devil Cube',
        amount: 50,
      },
    ],
    steps: [
      'Kendi klanında 3000 itibara ulaş ve kırmızı madalya görevini al.',
      'Üç tür küpten 50’şer adet teslim et.',
    ],
    notes:
      'Başka mercenary klanına itibar kasmak mevcut klan itibarını düşürür. Teslim anında 3000 şartını koru. Küp isimleri Combo-Cube ile karıştırılmamalı.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'red-axes',
    title: 'Kızıl Baltalar',
    name: 'Red Axes',
    libraryId: 63,
    level: 4,
    redLevel: 5,
    category: 'Paralı asker',
    npc: 'Kyew — Ridge of Darkness',
    unlock: 'İlgili mercenary klanının kabul görevini tamamla.',
    farming: [
      'Klanın verdiği sözleşmeleri tamamlayarak itibar yükselt; görev yenilenmesini NPC’den takip et.',
      '4. seviyede 1000 itibar sınırı bulunur. Kabul görevi sonrasında uygun koşullarda Spark başına 200 itibar alınabilir.',
    ],
    materials: [
      {
        name: 'Imp Cube',
        amount: 50,
      },
      {
        name: 'Demon Cube',
        amount: 50,
      },
      {
        name: 'Devil Cube',
        amount: 50,
      },
    ],
    steps: [
      'Kendi klanında 3000 itibara ulaş ve kırmızı madalya görevini al.',
      'Üç tür küpten 50’şer adet teslim et.',
    ],
    notes:
      'Başka mercenary klanına itibar kasmak mevcut klan itibarını düşürür. Teslim anında 3000 şartını koru. Küp isimleri Combo-Cube ile karıştırılmamalı.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'stone-lotus',
    title: 'Taş Lotus',
    name: 'Stone Lotus',
    libraryId: 63,
    level: 4,
    redLevel: 5,
    category: 'Paralı asker',
    npc: 'Lloyd — Barrow of Sadness',
    unlock: 'İlgili mercenary klanının kabul görevini tamamla.',
    farming: [
      'Klanın verdiği sözleşmeleri tamamlayarak itibar yükselt; görev yenilenmesini NPC’den takip et.',
      '4. seviyede 1000 itibar sınırı bulunur. Kabul görevi sonrasında uygun koşullarda Spark başına 200 itibar alınabilir.',
    ],
    materials: [
      {
        name: 'Imp Cube',
        amount: 50,
      },
      {
        name: 'Demon Cube',
        amount: 50,
      },
      {
        name: 'Devil Cube',
        amount: 50,
      },
    ],
    steps: [
      'Kendi klanında 3000 itibara ulaş ve kırmızı madalya görevini al.',
      'Üç tür küpten 50’şer adet teslim et.',
    ],
    notes:
      'Başka mercenary klanına itibar kasmak mevcut klan itibarını düşürür. Teslim anında 3000 şartını koru. Küp isimleri Combo-Cube ile karıştırılmamalı.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'brotherhood-of-virtue',
    title: 'Erdem Kardeşliği',
    name: 'Brotherhood of Virtue',
    libraryId: 60,
    level: 5,
    redLevel: 5,
    category: 'Teslimat',
    npc: 'Norak — Cloister of Virtue',
    unlock:
      'Healer mesleği 2 veya Locksmith 30; Bringers of Evil itibarının olmaması ve kabul görevi.',
    farming: [
      'Karanlık kaynaklardan Emanation of Good elde et; kutsama parşömenlerini diğer oyuncularda kullanarak itibar kazan.',
      '1000 ve 2000 eşiklerinde uygun parşömen türüne geç. Kabul sonrası Spark başına 60 itibar alternatifi vardır.',
    ],
    materials: [
      {
        name: 'Emanation of Good',
        amount: 15000,
      },
    ],
    steps: [
      '3000 itibarda Norak’tan Worship görevini al.',
      '15000 Emanation of Good biriktir ve teslim et.',
    ],
    notes:
      'Bringers of Evil ile karşıt bir itibardır; taraf değiştirmeden önce kayıpları kontrol et.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'bringers-of-evil',
    title: 'Kötülük Getirenler',
    name: 'Bringers of Evil',
    libraryId: 50,
    level: 5,
    redLevel: 5,
    category: 'Teslimat',
    npc: 'Fanatic / Izuver — Den',
    unlock: 'Kabul görevini tamamla.',
    farming: [
      'Hex hazırlamak itibar kazandırır; 1000 ve 2000 eşiklerinde uygun tariflere geç.',
      'Kabul sonrasında Spark başına 60 itibar seçeneği bulunur.',
    ],
    materials: [
      {
        name: 'Evil Eye',
        amount: 500,
      },
    ],
    steps: ['3000 itibarda kırmızı madalya görevini al.', '500 Evil Eye teslim et.'],
    notes:
      'Bu yol Brotherhood of Virtue itibarını düşürür. İki itibarı aynı anda yükseltebileceğini varsayma.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'destroyers-of-chaos',
    title: 'Kaos Yok Edicileri',
    name: 'Destroyers of Chaos',
    libraryId: 52,
    level: 5,
    redLevel: 5,
    category: 'PvE',
    npc: 'Rukham / Bakhasha — Fay-Go karakolları',
    unlock: 'Fay-Go erişimi ve itibar kabul görevleri.',
    farming: [
      'Gungl avları, Chaos Invasion etkinliği ve savaş ganimeti teslimatlarını kullan.',
      'Gungl avı 2000’e kadar hizmet eder; daha yüksek aşamalar için etkinlik ve uygun teslimatlara geç.',
    ],
    materials: [
      {
        name: 'Noitcerruser Amulet',
        amount: 20,
      },
      {
        name: 'Relaeh',
        amount: 10,
      },
      {
        name: 'Rewop',
        amount: 400,
      },
      {
        name: 'Nelots Efil',
        amount: 300,
      },
      {
        name: 'Doolb',
        amount: 100,
      },
      {
        name: 'Efil',
        amount: 300,
      },
      {
        name: 'Tnaig',
        amount: 150,
      },
      {
        name: 'Htaed Nogard',
        amount: 25,
      },
      {
        name: 'Uyarr MO Sword / Shield',
        amount: 'Her birinden 1',
      },
      {
        name: 'Uyarr MO Helmet / Pauldrons',
        amount: 'Her birinden 1',
      },
    ],
    steps: [
      '3000 itibarda görevi al. İlk teslimat: 20 Noitcerruser + 10 Relaeh; Gungl XO dalgasını yen.',
      '400 Rewop + 300 Nelots Efil + 100 Doolb teslim et; Defiler DO savaşını tamamla.',
      '300 Efil ile Defiler XO; ardından 150 Tnaig ile General Uyarr MO dalgalarını yen.',
      '25 Htaed Nogard teslim et ve Large Egnu’yu yen.',
      'Sword + Shield teslimatından sonraki Egnu Lord grubunu yen.',
      'Helmet + Pauldrons teslimatından sonra son karma dalgayı tamamlayıp NPC’ye dön.',
    ],
    notes:
      'Yedi teslimat/savaş aşaması vardır; NPC yardımcıları bulunur. Forum rehberine göre yenilgide yeniden çağırma parşömeni alınabilir, aynı malzemeler tekrar ödenmez.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'flaundins',
    title: 'Flaundinler',
    name: 'Flaundins',
    libraryId: 97,
    level: 6,
    redLevel: 6,
    category: 'PvE',
    npc: 'Akvarius — Flaungard Palace',
    unlock:
      'Exorcism for Orlufia / Resurrection of the Chaos Demigod zincirinde Akvarius’un görevini tamamla.',
    farming: [
      'Sualtı düşmanları, Gollade Pearl teslimatı ve günlük Help for Underwater Science ile ilerle.',
      'Canavarların üst sınırı farklıdır; inci teslimatları 3000’e kadar kullanılabilir. Spark başına 200 itibar alternatifi vardır.',
    ],
    materials: [
      {
        name: 'Deep Sea Shell',
        amount: 550,
      },
      {
        name: 'Efril Replicator',
        amount: 'Boş, 1 adet',
      },
      {
        name: 'Tranquility Amulet',
        amount: 'Savaş için',
      },
    ],
    steps: [
      '3000 itibarda Akvarius → Okteon. Sunken Ship kaptan bölmesindeki Stack of Books’u al.',
      'İlk odadaki iskeletleri temizle; ilk çıkmazdaki sandıktan Tasfero parçalarını edin. Volnar’ın istediği boş Efril Replicator’ı bul, Okteon’a dön.',
      'Underwater Jail’de 550 Deep Sea Shell ile Tasfero’yu kullan; Apostate Mage [9] ve yardımcılarıyla savaş.',
      'Flaundin Fury etkisine karşı Tranquility Amulet kullan; görevi Akvarius’ta bitir.',
    ],
    notes:
      'Boş Efril Replicator için Relic Seekers dükkânı veya Chigrik / Gloum diyaloğunu kontrol et.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'great-dragons',
    title: 'Büyük Ejderhalar',
    name: 'Great Dragons',
    libraryId: 118,
    level: 7,
    redLevel: 7,
    category: 'Tanrılar',
    npc: 'Altar of Dragon — Hell’s Pass / Foothills',
    unlock: '7. seviye; seçtiğin tanrının kabul koşullarını kontrol et.',
    farming: [
      'Sunakta kaynak veya Idalle sunuları yap; sunu miktarı kabul şansını etkiler.',
      'Uygun koşullarda Spark başına 150 itibar alternatifi bulunur.',
    ],
    materials: [
      {
        name: 'Dragon Blood',
        amount: 3286,
      },
      {
        name: 'Magic Purple Ink',
        amount: 1845,
      },
      {
        name: 'Liquid Nacre',
        amount: 7890,
      },
    ],
    steps: [
      '3000 itibarda sunaktaki Worship görevini aç.',
      'Listelenen kaynakların tamamını hazırlayıp sunaktaki görev diyaloğundan teslim et.',
    ],
    notes: 'Kart destesinin geçici kutsaması kırmızı madalyanın kendisi değildir.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'aladeya',
    title: 'Tanrıça Aladeya',
    name: 'Goddess Aladeya',
    libraryId: 108,
    level: 7,
    redLevel: 7,
    category: 'Tanrılar',
    npc: 'Altar of Life — Berona Ranges / Canyon of Immortality',
    unlock: '7. seviye; seçtiğin tanrının kabul koşullarını kontrol et.',
    farming: [
      'Sunakta kaynak veya Idalle sunuları yap; sunu miktarı kabul şansını etkiler.',
      'Uygun koşullarda Spark başına 150 itibar alternatifi bulunur.',
    ],
    materials: [
      {
        name: 'Sighing Grass',
        amount: 2875,
      },
      {
        name: 'Dragon Blood Dust',
        amount: 12660,
      },
      {
        name: 'Malleable Stone',
        amount: 5340,
      },
    ],
    steps: [
      '3000 itibarda sunaktaki Worship görevini aç.',
      'Listelenen kaynakların tamamını hazırlayıp sunaktaki görev diyaloğundan teslim et.',
    ],
    notes:
      'Aladeya ve Cursed and Dead birbirine karşıttır; birine sunu yapmak diğerinin itibarını azaltır.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'cursed-and-dead',
    title: 'Lanetliler ve Ölüler Tanrısı',
    name: 'God of the Cursed and the Dead',
    libraryId: 109,
    level: 7,
    redLevel: 7,
    category: 'Tanrılar',
    npc: 'Altar of Darkness — Vassals’ Tombs / Forgotten Graves',
    unlock: '7. seviye; seçtiğin tanrının kabul koşullarını kontrol et.',
    farming: [
      'Sunakta kaynak veya Idalle sunuları yap; sunu miktarı kabul şansını etkiler.',
      'Uygun koşullarda Spark başına 150 itibar alternatifi bulunur.',
    ],
    materials: [
      {
        name: 'Crystal Sturgeon',
        amount: 4759,
      },
      {
        name: 'Collected Sighing Grass',
        amount: 450,
      },
      {
        name: 'Silverplated Petal',
        amount: 11655,
      },
    ],
    steps: [
      '3000 itibarda sunaktaki Worship görevini aç.',
      'Listelenen kaynakların tamamını hazırlayıp sunaktaki görev diyaloğundan teslim et.',
    ],
    notes:
      'Aladeya ve Cursed and Dead birbirine karşıttır; birine sunu yapmak diğerinin itibarını azaltır.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'eldives',
    title: 'Eldiveler',
    name: 'Eldives',
    libraryId: 95,
    level: 11,
    redLevel: 11,
    category: 'PvE',
    npc: 'Chooli-a-Veyna / Fairy-a-Maiya',
    unlock: 'Initiation görevini tamamla.',
    farming: [
      'Centrido topla; Prozio / Antizio cihazında yakarak itibar kazan.',
      'Cihazın kapasitesini ve kalitesini geliştir; düşük kaliteyle aynı itibar üst sınırında kalırsın.',
    ],
    materials: [
      {
        name: 'Centrido',
        amount: 400,
      },
      {
        name: 'Luxite',
        amount: 50,
      },
    ],
    steps: [
      '3000 itibarda kendi tarafındaki NPC’den Worship görevini al.',
      'Listedeki kalp ve kristalleri toplayıp teslim et.',
    ],
    notes:
      'Karşı tarafın bölgesel ritüellerini destekleyen eylemler kendi itibarına zarar verebilir.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'kroffdors',
    title: 'Kroffdorlar',
    name: 'Kroffdors',
    libraryId: 96,
    level: 11,
    redLevel: 11,
    category: 'PvE',
    npc: 'Dimedora / Reodora',
    unlock: 'Ordeal by Blood görevini tamamla.',
    farming: [
      'Incarnum topla; Davagar / Nevagar cihazında yakarak itibar kazan.',
      'Cihazın kapasitesini ve kalitesini geliştir; düşük kaliteyle aynı itibar üst sınırında kalırsın.',
    ],
    materials: [
      {
        name: 'Incarnum',
        amount: 400,
      },
      {
        name: 'Flamian',
        amount: 50,
      },
    ],
    steps: [
      '3000 itibarda kendi tarafındaki NPC’den Worship görevini al.',
      'Listedeki kalp ve kristalleri toplayıp teslim et.',
    ],
    notes:
      'Karşı tarafın bölgesel ritüellerini destekleyen eylemler kendi itibarına zarar verebilir.',
    alternative: '',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'pet-patrons',
    title: 'Evcil Hayvan Koruyucuları',
    name: 'Pet Patrons',
    libraryId: 179,
    level: 11,
    redLevel: 11,
    category: 'Evcil hayvan',
    npc: 'Bonna Benita / Sweet Mila',
    unlock: 'Pet patrons görevini tamamla.',
    farming: [
      'Günlük bir saatlik medallion etkisiyle, seviyenden en fazla bir düşük canavarları avla; Vital Substance teslim et.',
      'Üç günde bir verilen bakım görevlerini tamamla. Spark başına 200 itibar alternatifi vardır.',
    ],
    materials: [
      {
        name: 'Elt Gambier Seeds',
        amount: 100,
      },
      {
        name: 'Spawning Habus Caviar',
        amount: 100,
      },
      {
        name: 'Pure Eldorill Crystals',
        amount: 100,
      },
      {
        name: 'Vital Substance',
        amount: 500,
      },
      {
        name: 'Undead Elixir of Death',
        amount: 5,
      },
      {
        name: 'Demonologist / Occultist teslimatı',
        amount: 'Alternatifler: 10 Devil Combo-Cube / 190 Crystalline Coal / 50 Ludial Chain Link',
      },
    ],
    steps: [
      '3000 itibarda görevi başlat; büyücüye ilk üç kaynaktan 100’er, Lady Guinevere / Cordelia’ya Vital Substance teslim et.',
      'Demonologist veya Occultist/Necromancer malzeme dalını görev günlüğüne göre seç.',
      'Scolopendra Coast / Daigon Islands’ta Belinda’nın mağarasını bul. Lady Guinevere / Cordelia’ya 5 Undead Elixir of Death götür.',
      'Verilen Dead Water’ı kuşan; mağaraya dönüp Belinda [13] savaşını tamamla.',
    ],
    notes:
      '2025’te düzenlenen İngilizce rehber, Demonologist ve Occultist yollarını alternatif gösteriyor; eski Türkçe rehber hepsini ardışık listeliyor. Bu teslimatı günlüğünden doğrula.',
    alternative: 'Tüm görev yerine NPC’ye 7 Spark of the Heavenly Fires teslim edilebilir.',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'custodians-of-magic',
    title: 'Büyü Muhafızları',
    name: 'Custodians of Magic',
    libraryId: 165,
    level: 11,
    redLevel: 16,
    category: 'PvE',
    npc: 'Barachmung',
    unlock: 'Entertaining Reading ve Barachmung the Chronicler görevleri.',
    farming: [
      'Repository kayıtlarını toplayıp chronicler’a teslim et.',
      'Entertaining Reading sonrasında bir Spark 25 itibar sağlar.',
    ],
    materials: [
      {
        name: 'Other Dialects Manuscript Kroffdors',
        amount: 40,
      },
      {
        name: 'Other Dialects Manuscript Eldives',
        amount: 30,
      },
      {
        name: 'Elfin Cache Manuscript',
        amount: 20,
      },
      {
        name: 'Piedmont People’s Manuscript',
        amount: 10,
      },
    ],
    steps: [
      '3000 itibarda el yazmalarını Barachmung’a teslim ederek Ivmuar Key al.',
      'Treasury’nin altı element bölümünü tamamla; her instance kopyasında bir bölüm temizlenir.',
      'Her bölümde 10 muhafızdan parçaları topla, anahtarı al ve Magic Custodian’ı yen.',
      'Altı farklı Magic Secret kitabını Barachmung’a götür.',
    ],
    notes: '',
    alternative: 'Görevin tamamı için 20 Spark of the Heavenly Fires alternatifi bulunur.',
    partial: false,
    checkedAt: '2026-10-01',
  },
  {
    id: 'labyrinth-explorers',
    title: 'Labirent Kaşifleri',
    name: 'Labyrinth Explorers',
    libraryId: 330,
    level: 8,
    redLevel: 11,
    category: 'PvE',
    npc: 'Flynn / Confessor Emiria — Ergam',
    unlock: 'Berrush / I-Vidi’den Brave New World görevini tamamla.',
    farming: [
      'Labyrinth bosslarından Relic of Heliordor al; Flynn’e teslim edilen her kalıntı 10 itibar verir.',
      'Boss öldükten sonraki 10 dakikada Lucky Coin kullanarak ganimeti bir kez daha al. 10 parça bir coin oluşturur.',
      'Torch karanlık etkisine yardımcı olur. Instance 101 katlıdır; 100. kat hariç her beşinci katta boss, 101’de Celeste vardır.',
    ],
    materials: [
      {
        name: 'Crystalline Coal',
        amount: 2000,
      },
      {
        name: 'Idalle',
        amount: 200,
      },
      {
        name: 'Devil Combo-Cube',
        amount: 50,
      },
      {
        name: 'Bubbly Metal',
        amount: 800,
      },
      {
        name: 'Spark of the Heavenly Fires',
        amount: 20,
      },
      {
        name: 'Gloomy Shadow',
        amount: 200,
      },
      {
        name: 'Incarnum veya Centrido',
        amount: 1000,
      },
      {
        name: 'Monster Heart',
        amount: 200,
      },
      {
        name: 'Treasure Keeper Staff',
        amount: 1,
      },
    ],
    steps: [
      'Emiria’dan Worship zincirini al; Shiko ve ardından büyücüyle konuş. Superbeing avından Ancient Handle edin.',
      'Soygura / Ostap’a kömür, Idalle, küp ve Bubbly Metal teslimatını yap.',
      'Büyücünün Spark, gölge ve Incarnum / Centrido aşamasını tamamla.',
      'Supervisor’dan Treasure Keeper Staff ve normal canavarlardan Monster Heart topla. Sonraki hikâye dalları için bağlantılı forum rehberini takip et.',
    ],
    notes:
      'Bu liste doğrulanan hazırlık aşamalarıdır; sonlara göre ek koşullar değişir. İtibar tablosu kırmızı erişimini 8, görev rehberi 11 gösteriyor. Görev NPC’sindeki erişim şartı önceliklidir.',
    alternative: '',
    partial: true,
    checkedAt: '2026-10-01',
  },
  {
    id: 'rangers',
    title: 'Korucular',
    name: 'Ranger Reputation',
    libraryId: 306,
    level: 8,
    redLevel: 15,
    category: 'Evcil hayvan',
    npc: 'Bonna Benita / Sweet Mila',
    unlock: '3 farklı pet, Town Hall 3 ve Becoming a Ranger; ardından Ranger Camp kur.',
    farming: [
      'Petleri Ranger Camp görevlerine gönder; yiyecek ve yaralanma durumlarını takip et.',
      'Kamp seviyeleri 1–6 sırasıyla 500 / 1000 / 1500 / 2000 / 2500 / 3000 itibar üst sınırı sağlar.',
      '9. seviyede Way of the Hunter sonrasında av ganimetlerini Hawken / Vaslav’a teslim etme yolu açılır.',
    ],
    materials: [],
    steps: [],
    notes:
      'Kırmızı madalya erişimi itibar tablosunda 15. seviyedir. Tam görev teslimatları bu sürümde doğrulanmadı; alışveriş listesi olarak kullanılmamalı.',
    alternative: '',
    partial: true,
    checkedAt: '2026-10-01',
  },
  {
    id: 'mystic',
    title: 'Mistikler',
    name: 'Mystic Reputation',
    libraryId: 312,
    level: 9,
    redLevel: 11,
    category: 'PvE',
    npc: 'Maritsa / Bludiara → Kari',
    unlock:
      '25 Secret Knowledge; First Step on the Path of the Mystic ve When the Magic Orb is Powerless görevleri.',
    farming: [
      'Mystic First Aid tekrar görevlerini yap; iki bölüm de 5’er itibar verir.',
      'Architect’te 1 Black Spark + 3 Spark teslimatı 75 itibar sağlar.',
      '9. seviyede 1000, 10’da 2000, 11’de 3000 itibar sınırını dikkate al.',
    ],
    materials: [],
    steps: [],
    notes:
      'Kırmızı görev zincirinin tam malzemeleri henüz doğrulanmadı. Başlangıç ve itibar kasma yolu kaynaklıdır.',
    alternative: '',
    partial: true,
    checkedAt: '2026-10-01',
  },
  {
    id: 'treasure-hunters',
    title: 'Hazine Avcıları',
    name: 'Treasure Hunters',
    libraryId: 204,
    level: 9,
    redLevel: 18,
    category: 'Keşif',
    npc: 'Globius / Avelius',
    unlock: 'Encountering the Treasure Hunters: Path to Treasure; uygun Opticus edin.',
    farming: [
      'İki günde bir harita alabilir veya dört parçayı bir haritaya dönüştürebilirsin.',
      'Haritayı etkinleştirip bir saat içinde uygun Opticus ile av ekranında ara. Sandık kalitesi itibar üst sınırını belirler.',
      '9. seviye Sailor Bottle yolu 1000’e, 11. seviye Wanderer Envelope 2000’e, 13. seviye demonologist haritaları 3000’e kadar ilerletir.',
    ],
    materials: [],
    steps: [],
    notes:
      'Kırmızı erişimi itibar tablosunda 18. seviyedir. Kırmızı görevin tam malzeme ve savaş dizisi bu sürümde doğrulanmadı.',
    alternative: '',
    partial: true,
    checkedAt: '2026-10-01',
  },
];
export const reputationSources = {
  rating: 'https://warofdragons.com/info/library/index.php?id=169&obj=cat',
  worship: 'https://warofdragons.com/forum/index.php?page=Thread&threadID=37194',
  turkish: 'https://warofdragons.com/forum/index.php?page=Thread&threadID=37685',
};
export const libraryUrl = (id) =>
  `https://warofdragons.com/info/library/index.php?obj=cat&id=${id}`;
