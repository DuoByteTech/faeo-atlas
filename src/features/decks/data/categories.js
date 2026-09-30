export const categories = [
  {
    id: 'buff',
    label: 'Güçlendirme',
    icon: 'Sparkles',
    tone: 'gold',
    description: 'Hasar, savunma ve savaş özellikleri.',
  },
  {
    id: 'boss',
    label: 'Boss ve itibar',
    icon: 'Swords',
    tone: 'red',
    description: 'Özel savaşlar, ganimet ve itibar.',
  },
  {
    id: 'economy',
    label: 'Kaynak ve etkinlik',
    icon: 'Gem',
    tone: 'green',
    description: 'Toplama, av ve etkinlik ödülleri.',
  },
  {
    id: 'pvp',
    label: 'PvP',
    icon: 'Shield',
    tone: 'blue',
    description: 'Valour ve savaş alanı avantajları.',
  },
  {
    id: 'divine',
    label: 'Tanrı kutsamaları',
    icon: 'Sun',
    tone: 'purple',
    description: 'Kutsamalar ve tanrı desteği.',
  },
  {
    id: 'summon',
    label: 'Çağırma',
    icon: 'Flame',
    tone: 'orange',
    description: 'Savaş hayaletleri ve yardımcılar.',
  },
  {
    id: 'utility',
    label: 'Yardımcı',
    icon: 'Layers',
    tone: 'teal',
    description: 'İksirler, petler ve diğer araçlar.',
  },
];
export const categoryById = Object.fromEntries(categories.map((item) => [item.id, item]));
export const statusLabels = {
  verified: 'EN kaynağı doğrulandı',
  partial: 'Bilgi eksik',
  ru: 'Yalnız RU kaynağı',
};
