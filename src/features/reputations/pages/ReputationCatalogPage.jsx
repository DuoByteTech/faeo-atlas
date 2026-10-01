import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppIcon } from '@/components/ui/AppIcon';
import { AppBadge } from '@/components/ui/AppBadge';
import { AppEmptyState } from '@/components/ui/AppEmptyState';
import { AppItemImage } from '@/components/ui/AppItemImage';
import { usePageTitle } from '@/hooks/usePageTitle';
import { reputations, reputationSources } from '../data/reputations';
import { reputationItems } from '../data/reputationItems';

const tiers = [
  ['Gri', '500', 'Recognition', 'grey'],
  ['Yeşil', '1.000', 'Friendship', 'green'],
  ['Mavi', '2.000', 'Respect', 'blue'],
  ['Mor', '3.000', 'Honour', 'purple'],
  ['Kırmızı', 'Özel görev', 'Worship', 'red'],
];
export function ReputationCatalogPage() {
  usePageTitle('Madalyalar ve itibar rehberi');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [scope, setScope] = useState('all');
  const results = reputations.filter((r) => {
    const words =
      `${r.title} ${r.name} ${r.npc} ${r.materials.map((m) => m.name).join(' ')}`.toLocaleLowerCase(
        'tr',
      );
    return (
      words.includes(query.toLocaleLowerCase('tr').trim()) &&
      (category === 'all' || category === r.category) &&
      (scope === 'all' || !r.partial)
    );
  });
  return (
    <AppContainer>
      <div className="page-intro medal-intro">
        <p className="eyebrow">İTİBARDAN KIRMIZI MADALYAYA</p>
        <h1>
          Her madalya, <em>yeni bir hedef.</em>
        </h1>
        <p className="muted">
          Puan aralıklarını, açılan eşyaları, görevleri ve nasıl itibar kasacağını ve kırmızı
          madalya için ne biriktireceğini keşfet. Her seviyeden ve oyun tarzından oyuncu için Türkçe
          rehber.
        </p>
      </div>
      <section aria-labelledby="progression-title" className="medal-overview">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="progression-title">Madalya yolu</h2>
          <a className="text-link" href={reputationSources.rating} target="_blank" rel="noreferrer">
            Resmî itibar tablosu <AppIcon name="ArrowUpRight" size={16} />
          </a>
        </div>
        <ol className="medal-tiers">
          {tiers.map(([name, value, english, tone]) => (
            <li key={tone}>
              <span className={`medal-seal medal-${tone}`}>
                <AppIcon name="Shield" size={25} />
              </span>
              <strong>{name}</strong>
              <span>{value}</span>
              <small>{english}</small>
            </li>
          ))}
        </ol>
        <p className="muted">
          Genel eşikler bunlardır.{' '}
          <strong>3000 itibar mor madalyadır; kırmızı için ayrıca Worship görevi gerekir.</strong>{' '}
          Bazı itibarların seviye sınırları ve özel kuralları farklıdır. Bazılarında kırmızıdan
          sonra Exaltation (turuncu) görevi de bulunur.
        </p>
      </section>
      <section className="medal-tips" aria-label="Başlamadan önce">
        <article>
          <AppIcon name="Compass" />
          <h3>Önce erişimi aç</h3>
          <p>
            Başlangıç seviyesi ile kırmızı görev seviyesi aynı olmayabilir. Ön görev ve NPC’yi
            kontrol et.
          </p>
        </article>
        <article>
          <AppIcon name="Layers" />
          <h3>Doğru aralıkta kas</h3>
          <p>
            Aynı canavar veya teslimat sonsuza kadar itibar vermez. Üst sınırda yöntemi değiştir.
          </p>
        </article>
        <article>
          <AppIcon name="Gem" />
          <h3>Teslimatı planla</h3>
          <p>
            Spark bazen itibar, bazen görev alternatifi sağlar. İkisinin miktarını birbirine
            karıştırma.
          </p>
        </article>
      </section>
      <section className="page-section pt-0" aria-labelledby="medal-catalog-title">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
          <div>
            <p className="eyebrow">İTİBAR KÜTÜPHANESİ</p>
            <h2 id="medal-catalog-title">Hedefini seç</h2>
          </div>
          <p className="muted">
            {reputations.length} rehber · {reputations.filter((r) => r.partial).length} kırmızı
            görev araştırması sürüyor
          </p>
        </div>
        <div className="medal-filters">
          <label className="medal-search">
            <span className="sr-only">Madalya, NPC veya malzeme ara</span>
            <AppIcon name="Search" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Madalya, NPC veya malzeme ara…"
            />
          </label>
          <label>
            <span>Oyun yolu</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">Tüm yollar</option>
              {[...new Set(reputations.map((r) => r.category))].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Görev kapsamı</span>
            <select value={scope} onChange={(e) => setScope(e.target.value)}>
              <option value="all">Tüm rehberler</option>
              <option value="detailed">Kırmızı adımları bulunanlar</option>
            </select>
          </label>
        </div>
        <p className="muted my-4" role="status">
          {results.length} rehber gösteriliyor
        </p>
        <div className="medal-grid">
          {results.map((r) => {
            const redMedalItem = r.medalItemIds?.red
              ? reputationItems[r.medalItemIds.red]
              : null;

            const redMedalSource =
              redMedalItem?.sourceImage ||
              redMedalItem?.image ||
              `/images/reputations/medals/${r.id}/medal.gif`;

            return (
              <Link key={r.id} to={`/madalyalar/${r.id}`} className="medal-card">
                <div className="flex justify-between gap-3">
                  <AppItemImage
                    src={redMedalSource}
                    name={`${r.title} kırmızı madalyası`}
                    icon="Shield"
                    tone="red"
                  />
                  <AppBadge>{r.category}</AppBadge>
                </div>
                <p className="medal-english">{r.name}</p>
                <h3>{r.title}</h3>
                <p className="muted medal-card-summary">{r.farming[0]}</p>
                <div className="medal-meta">
                  <span>
                    Başlangıç <strong>Sv. {r.level}</strong>
                  </span>
                  <span>
                    Kırmızı{' '}
                    <strong>
                      {r.id === 'labyrinth-explorers' ? '8 / 11*' : `Sv. ${r.redLevel}`}
                    </strong>
                  </span>
                </div>
                <div className="medal-card-bottom">
                  <small>
                    {r.partial ? 'Kırmızı görev: kısmi bilgi' : 'Puanlar, eşyalar ve görevler'}
                  </small>
                  <AppIcon name="ArrowRight" size={18} />
                </div>
              </Link>
            );
          })}
        </div>
        {!results.length && (
          <AppEmptyState
            title="Bu aramada rehber bulunamadı"
            description="Türkçe veya İngilizce adla tekrar ara ya da filtreleri temizle."
          >
            <button
              className="text-link mt-4"
              onClick={() => {
                setQuery('');
                setCategory('all');
                setScope('all');
              }}
            >
              Filtreleri temizle
            </button>
          </AppEmptyState>
        )}
      </section>
      <aside className="notice mb-12">
        <strong>Rehberin kapsamı</strong>
        <p className="mt-2">
          Bu bölüm seçili itibarları kapsar; oyundaki tüm itibarların eksiksiz kataloğu değildir.
          Şehir itibarı ve Trophy Hunters gibi sistemler aynı madalya yapısını izlemez. Kasılma
          yolları resmî kütüphaneye, kırmızı görevler bağlantılı topluluk rehberlerine dayanır.
          Malzeme harcamadan önce görev günlüğündeki güncel koşulları kontrol et.
        </p>
        <a
          href={reputationSources.turkish}
          className="text-link mt-3"
          target="_blank"
          rel="noreferrer"
        >
          Türkçe Worship forum rehberi <AppIcon name="ExternalLink" size={15} />
        </a>
      </aside>
    </AppContainer>
  );
}
