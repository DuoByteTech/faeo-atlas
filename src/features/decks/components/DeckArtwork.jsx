import { AppIcon } from '@/components/ui/AppIcon';
import { categoryById } from '../data/categories';
export function DeckArtwork({ deck, large = false }) {
  const category = categoryById[deck.category];
  return (
    <div
      className={`deck-art tone-${category.tone} ${large ? 'deck-art--large' : ''}`}
      aria-hidden="true"
    >
      {deck.image ? (
        <img
          src={`${import.meta.env.BASE_URL}${deck.image}`}
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      ) : null}
      <div className="art-orbit art-orbit--one" />
      <div className="art-orbit art-orbit--two" />
      <div className="art-sigil">
        <AppIcon name={category.icon} size={large ? 88 : 52} />
      </div>
      <span className="art-star art-star--one">✦</span>
      <span className="art-star art-star--two">✧</span>
      <span className="art-caption">CONLEGRET · {category.label.toLocaleUpperCase('tr-TR')}</span>
    </div>
  );
}
