import { Link, useParams } from 'react-router-dom';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppBadge } from '@/components/ui/AppBadge';
import { AppIcon } from '@/components/ui/AppIcon';
import { AppButton } from '@/components/ui/AppButton';
import { AppEmptyState } from '@/components/ui/AppEmptyState';
import { DeckArtwork } from '../components/DeckArtwork';
import { DeckCard } from '../components/DeckCard';
import { decks } from '../data/decks';
import { categoryById, statusLabels } from '../data/categories';
import { useDeckLibrary } from '../hooks/useDeckLibrary';
import { usePageTitle } from '@/hooks/usePageTitle';
export function DeckDetailPage() {
  const { id } = useParams();
  const deck = decks.find((item) => item.id === id);
  const { favorites, compare, toggleFavorite, toggleCompare } = useDeckLibrary();
  usePageTitle(deck?.title || 'Deste bulunamadı');
  if (!deck)
    return (
      <AppEmptyState
        title="Bu deste bulunamadı"
        description="Bağlantı değişmiş olabilir. Katalogdan devam edebilirsin."
      >
        <AppButton to="/desteler">Kataloğa dön</AppButton>
      </AppEmptyState>
    );
  const category = categoryById[deck.category];
  const selected = compare.includes(id);
  return (
    <AppContainer>
      <nav className="breadcrumbs" aria-label="İçerik yolu">
        <Link to="/desteler">Kart desteleri</Link>
        <AppIcon name="ChevronRight" size={14} />
        <span>{deck.title}</span>
      </nav>
      <section className="detail-hero">
        <div className="detail-art">
          <DeckArtwork deck={deck} large />
          <span>
            {deck.image
              ? 'Deste görseli'
              : 'Sembolik kategori illüstrasyonu · Oyun içi görsel değildir'}
          </span>
        </div>
        <div>
          <AppBadge tone={category.tone}>{category.label}</AppBadge>
          <h1>{deck.title}</h1>
          <p className="detail-english">{deck.name}</p>
          <p className="detail-summary">{deck.effect}</p>
          <div className="detail-meta">
            <span>
              <AppIcon name="Clock3" />
              {deck.frequency}
            </span>
            <span>
              <AppIcon name={deck.status === 'verified' ? 'CheckCircle2' : 'CircleHelp'} />
              {statusLabels[deck.status]}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <AppButton onClick={() => toggleFavorite(id)} variant="secondary">
              <AppIcon name="Heart" size={17} />
              {favorites.includes(id) ? 'Kaydedildi' : 'Kaydet'}
            </AppButton>
            <AppButton
              onClick={() => toggleCompare(id)}
              disabled={!selected && compare.length >= 3}
            >
              <AppIcon name="GitCompareArrows" size={17} />
              {selected ? 'Karşılaştırmadan çıkar' : 'Karşılaştırmaya ekle'}
            </AppButton>
          </div>
          {!selected && compare.length >= 3 && (
            <p className="muted mt-3 text-sm">
              En fazla 3 deste seçilebilir. Yeni deste eklemek için birini çıkar.
            </p>
          )}
        </div>
      </section>
      <div className="detail-content">
        <section className="info-panel">
          <p className="eyebrow">NASIL ÇALIŞIR?</p>
          <h2>Etki ve kullanım notları</h2>
          <p>{deck.note}</p>
          <h3>Geliştirilmiş sürüm</h3>
          <p>
            {deck.upgrade ||
              'Bu kayıt için doğrulanmış ek geliştirme bilgisi bulunmuyor. Bu, geliştirilmiş sürüm olmadığı anlamına gelmez.'}
          </p>
          {deck.status !== 'verified' && (
            <div className="notice">
              {deck.status === 'ru'
                ? 'Bu bilgi Rus sunucusu kaynağından alınmıştır. İngiliz sunucusunda edinilebilirliği doğrulanmadı.'
                : 'Bu kaydın bazı bilgileri henüz doğrulanmadı. Satın almadan önce güncel oyun açıklamasını kontrol et.'}
            </div>
          )}
        </section>
        <aside className="info-panel source-panel">
          <AppIcon name="BookOpen" size={25} />
          <h2>Bilginin kaynağı</h2>
          <p>
            Araştırma tarihi:{' '}
            <strong>
              {new Intl.DateTimeFormat('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
              }).format(new Date(`${deck.updatedAt}T00:00:00Z`))}
            </strong>
          </p>
          <p>Türkçe başlıklar açıklayıcı çeviridir. Oyunda arama yaparken özgün adı kullan.</p>
          <a className="text-link" href={deck.source} target="_blank" rel="noopener noreferrer">
            {deck.status === 'verified' ? 'Resmî eşya sayfası' : 'Araştırma kaynağı'}
            <AppIcon name="ExternalLink" size={16} />
          </a>
        </aside>
      </div>
      <section className="page-section">
        <h2 className="mb-6">Aynı kategoriden keşfet</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {decks
            .filter((d) => d.category === deck.category && d.id !== id)
            .slice(0, 3)
            .map((d) => (
              <DeckCard deck={d} key={d.id} />
            ))}
        </div>
      </section>
    </AppContainer>
  );
}
