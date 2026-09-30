import { Link } from 'react-router-dom';
import { AppIcon } from '@/components/ui/AppIcon';
import { AppBadge } from '@/components/ui/AppBadge';
import { DeckArtwork } from './DeckArtwork';
import { categoryById, statusLabels } from '../data/categories';
import { useDeckLibrary } from '../hooks/useDeckLibrary';
export function DeckCard({ deck }) {
  const { favorites, compare, toggleFavorite, toggleCompare } = useDeckLibrary();
  const selected = compare.includes(deck.id);
  const favorite = favorites.includes(deck.id);
  const category = categoryById[deck.category];
  return (
    <article className="deck-card">
      <div className="relative">
        <Link to={`/desteler/${deck.id}`} aria-label={`${deck.title} detaylarını aç`}>
          <DeckArtwork deck={deck} />
        </Link>
        <button
          className={`favorite-button ${favorite ? 'is-selected' : ''}`}
          aria-label={`${deck.title}: ${favorite ? 'favorilerden çıkar' : 'favorilere ekle'}`}
          aria-pressed={favorite}
          onClick={() => toggleFavorite(deck.id)}
        >
          <AppIcon name="Heart" size={18} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <AppBadge tone={category.tone}>{category.label}</AppBadge>
          <span className="flex items-center gap-1.5 text-xs muted">
            <AppIcon name="Clock3" size={13} />
            {deck.frequency}
          </span>
        </div>
        <h3>
          <Link to={`/desteler/${deck.id}`}>{deck.title}</Link>
        </h3>
        <p className="deck-english">{deck.name}</p>
        <p className="deck-description">{deck.effect}</p>
        {deck.status !== 'verified' && <p className="status-note">{statusLabels[deck.status]}</p>}
        <div className="deck-card-footer">
          <Link className="text-link" to={`/desteler/${deck.id}`}>
            İncele <AppIcon name="ArrowUpRight" size={16} />
          </Link>
          <button
            className="compare-toggle"
            disabled={!selected && compare.length >= 3}
            aria-pressed={selected}
            onClick={() => toggleCompare(deck.id)}
            title={
              !selected && compare.length >= 3 ? 'En fazla 3 deste karşılaştırılabilir' : undefined
            }
          >
            <AppIcon name={selected ? 'Check' : 'GitCompareArrows'} size={15} />
            {selected ? 'Eklendi' : 'Karşılaştır'}
          </button>
        </div>
      </div>
    </article>
  );
}
