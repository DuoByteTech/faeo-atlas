// Editoryal öneriler: resmi oyun sıralaması veya yatırım getirisi garantisi değildir.
export const strategies = [
  {
    id: 'hunt',
    title: 'Yaratık avı',
    icon: 'Swords',
    intro:
      'Düzenli avda kullanacağın güçlendirmelere öncelik ver. Seviyene uygun etkileri ve birlikte kullanım koşullarını kontrol et.',
    picks: [
      ['guardians-of-truth', 'Düzenli av için yüksek seviyeli Rainbow / Vertsida desteği.'],
      ['magical-flora', 'Birden fazla savaş özelliğini aynı anda destekler.'],
      ['might', 'Kullandığın iksirlerle uyumluysa kısa süreli hasar desteği.'],
      ['feast-for-ravens', 'Kendi seviye grubundaki yaratıklarda kaynak avını destekler.'],
      ['forbidden-city', 'Öldürme limiti ve Zarlog kaynakları önemliyse değerlendir.'],
    ],
  },
  {
    id: 'pvp',
    title: 'PvP ve valour',
    icon: 'Shield',
    intro:
      'Savaş alanı hedefini, kullandığın kutsamaları ve mevcut destelerini birlikte değerlendir.',
    picks: [
      ['military-ranks-1', 'Valour odaklı oyun için Power and Valour desteği.'],
      ['battlefields', 'Lost Soul sorunuyla karşılaşıyorsan özel koruma.'],
      ['magical-flora', 'Genel savaş özellikleri sağlar.'],
      ['elemental-anger', 'Rakibin hasarını azaltmaya yönelik etki.'],
      ['military-ranks-2', 'Aynı temel kutsamayı veren ayrı bir deste.'],
    ],
  },
  {
    id: 'gather',
    title: 'Kaynak ve etkinlik',
    icon: 'Gem',
    intro:
      'Gerçekte yaptığın etkinliklere yatırım yap. Toplama ile yaratık avı bonusları farklı çalışır.',
    picks: [
      ['farmers-gift', 'Aktif kaynak topluyorsan doğrudan toplama desteği.'],
      ['seasons', 'Düzenli katıldığın mevsim etkinlikleri için.'],
      ['feast-for-ravens', 'Kaynağı yaratık avıyla kazanıyorsan.'],
      ['craftsmans-oracle', 'Rastgele günlük bonuslar; belirli bir sonucu garanti etmez.'],
    ],
  },
  {
    id: 'boss',
    title: 'Boss ve itibar',
    icon: 'Flame',
    intro:
      'Giriş sağlamak, savaşı kazanmayı garanti etmez. Ganimet değerinden iksir ve güçlendirme masrafını çıkar.',
    picks: [
      ['gnome-runes', 'Abandoned Smithy içeriğini düzenli kullanacaksan.'],
      ['super-being', 'Superbeing ganimetleri ve ilgili itibar hedefleri için.'],
      ['eshu-followers', 'Shiass yaratıklarıyla savaşma hedefin varsa.'],
      ['kings-burden', 'Boss’u makul maliyetle ve uygun sürede kesebiliyorsan.'],
      ['monsters-of-mystras', 'Şarj maliyetini ve rastgele savaş sonucunu hesaba kat.'],
    ],
  },
];
