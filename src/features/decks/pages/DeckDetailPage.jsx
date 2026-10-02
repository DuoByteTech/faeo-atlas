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

const hiddenCardLines = new Set([
  'Bu eşya devredilemez.',
  'Bu eşya çantada yer kaplamaz.',
  'Bu eşya tüccara teslim edilemez.',
]);

function RichLine({ line }) {
  const parts = line.parts || [{ text: line.text }];
  const className = line.emphasis
    ? 'deck-content-emphasis'
    : line.italic
      ? 'deck-content-quote'
      : undefined;

  return (
    <p className={className}>
      {parts.map((part, index) =>
        part.url ? (
          <a
            className="deck-inline-link"
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            key={`${part.text}-${index}`}
          >
            {part.text}
          </a>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </p>
  );
}
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
          <div className="deck-section-label">
            <AppIcon name="Layers" size={16} />
            <p className="eyebrow">KARTIN İÇERİĞİ</p>
          </div>
          <h2 className="deck-content-heading">
            {deck.cardContent?.length ? 'Kart açıklaması' : 'Etki ve kullanım bilgileri'}
          </h2>
          {deck.cardContent?.length ? (
            <div className="deck-content-copy">
              {deck.cardContent
                .filter((line) => !hiddenCardLines.has(line.text))
                .map((line, index) => (
                  <RichLine line={line} key={`card-line-${index}`} />
                ))}
            </div>
          ) : (
            <p>{deck.note}</p>
          )}
          {deck.contents?.length > 0 && (
            <ol className="mt-5 space-y-4">
              {deck.contents.map((item, index) => (
                <li className="rounded-xl border border-white/10 bg-white/5 p-4" key={item.name}>
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                      {index + 1}
                    </span>
                    <div>
                      {item.url ? (
                        <a
                          className="text-link font-semibold"
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.name}
                          <AppIcon name="ExternalLink" size={14} />
                        </a>
                      ) : (
                        <strong>{item.name}</strong>
                      )}
                      {item.description && <p className="mt-1 text-sm">{item.description}</p>}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
          {deck.linkedContent?.map((section) => (
            <div className="deck-linked-content" key={section.title}>
              <div className="deck-linked-content-header">
                <h3>{section.title}</h3>
                {section.source && (
                  <a
                    className="deck-linked-source"
                    href={section.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${section.title} resmî eşya sayfası`}
                  >
                    <AppIcon name="ExternalLink" size={14} />
                  </a>
                )}
              </div>
              {section.stats?.length > 0 && (
                <div className="deck-linked-stats">
                  {section.stats.map((stat) => (
                    <span key={stat.label}>
                      <strong>{stat.label}:</strong> {stat.value}
                    </span>
                  ))}
                </div>
              )}
              <div className="deck-content-copy">
                {section.content?.map((line, index) => (
                  <RichLine line={line} key={`${section.title}-line-${index}`} />
                ))}
              </div>
            </div>
          ))}
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
