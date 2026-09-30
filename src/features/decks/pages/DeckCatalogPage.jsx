import { useSearchParams } from 'react-router-dom';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppIcon } from '@/components/ui/AppIcon';
import { AppButton } from '@/components/ui/AppButton';
import { AppEmptyState } from '@/components/ui/AppEmptyState';
import { DeckCard } from '../components/DeckCard';
import { decks } from '../data/decks';
import { categories } from '../data/categories';
import { filterDecks } from '../utils/filterDecks';
import { useDeckLibrary } from '../hooks/useDeckLibrary';
import { usePageTitle } from '@/hooks/usePageTitle';
export function DeckCatalogPage() {
  usePageTitle('Kart desteleri');
  const [params, setParams] = useSearchParams();
  const { favorites } = useDeckLibrary();
  const query = params.get('q') || '';
  const category = params.get('category') || 'all';
  const status = params.get('status') || 'all';
  const favoritesOnly = params.get('favorites') === '1';
  const sort = params.get('sort') || 'name';
  const setFilter = (key, value) =>
    setParams(
      (old) => {
        const next = new URLSearchParams(old);
        if (!value || value === 'all') next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  const results = filterDecks(decks, { query, category, status, favoritesOnly, favorites, sort });
  return (
    <AppContainer>
      <header className="page-intro">
        <p className="eyebrow">CONLEGRET KOLEKSİYONU</p>
        <h1>Kart desteleri</h1>
        <p className="muted">
          Bir desteden fazlası. Etkileri, kullanım koşulları ve kaynaklarıyla tüm araştırma arşivi.
        </p>
      </header>
      <div className="catalog-toolbar">
        <div className="search-field">
          <AppIcon name="Search" />
          <label className="sr-only" htmlFor="deck-search">
            Deste ara
          </label>
          <input
            id="deck-search"
            type="search"
            value={query}
            onChange={(e) => setFilter('q', e.target.value)}
            placeholder="Deste adı veya etki ara…"
          />
        </div>
        <label className="filter-select">
          <span>Kaynak</span>
          <select
            aria-label="Kaynak durumu"
            value={status}
            onChange={(e) => setFilter('status', e.target.value)}
          >
            <option value="all">Tüm kayıtlar</option>
            <option value="verified">EN doğrulanmış</option>
            <option value="partial">Bilgi eksik</option>
            <option value="ru">Yalnız RU</option>
          </select>
        </label>
        <button
          className={`saved-filter ${favoritesOnly ? 'active' : ''}`}
          aria-pressed={favoritesOnly}
          onClick={() => setFilter('favorites', favoritesOnly ? '' : '1')}
        >
          <AppIcon name="Heart" size={17} />
          Kaydedilenler <span>{favorites.length}</span>
        </button>
      </div>
      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <p className="eyebrow">KATEGORİLER</p>
          <div className="category-filters">
            {[{ id: 'all', label: 'Tüm desteler', icon: 'Layers' }, ...categories].map((c) => (
              <button
                key={c.id}
                className={category === c.id ? 'active' : ''}
                aria-pressed={category === c.id}
                onClick={() => setFilter('category', c.id)}
              >
                <AppIcon name={c.icon} size={18} />
                <span>{c.label}</span>
                <small>
                  {c.id === 'all' ? decks.length : decks.filter((d) => d.category === c.id).length}
                </small>
              </button>
            ))}
          </div>
          <div className="sidebar-note">
            <AppIcon name="CircleHelp" size={23} />
            <h3>Hangi deste sana uygun?</h3>
            <p>Oyun hedefinden başlayarak seçim yap.</p>
            <AppButton to="/rehber" variant="ghost">
              Rehbere git <AppIcon name="ArrowRight" size={16} />
            </AppButton>
          </div>
        </aside>
        <section aria-label="Deste sonuçları">
          <div className="results-bar">
            <p aria-live="polite">
              <strong>{results.length}</strong> deste bulundu
            </p>
            <label className="sort-label">
              Sırala
              <select
                aria-label="Sıralama"
                value={sort}
                onChange={(e) => setFilter('sort', e.target.value)}
              >
                <option value="name">Ada göre A–Z</option>
                <option value="category">Kategoriye göre</option>
              </select>
            </label>
          </div>
          {results.length ? (
            <div className="catalog-grid">
              {results.map((deck) => (
                <DeckCard key={deck.id} deck={deck} />
              ))}
            </div>
          ) : (
            <AppEmptyState
              title="Eşleşen deste bulunamadı"
              description="Farklı bir kelime dene veya filtreleri temizle."
            >
              <AppButton onClick={() => setParams({})}>Filtreleri temizle</AppButton>
            </AppEmptyState>
          )}
          <p className="catalog-footnote">
            Kullanım sayıları normal sürüme aittir. Geliştirmeler ve kaynak durumu, deste
            detaylarında gösterilir.
          </p>
        </section>
      </div>
    </AppContainer>
  );
}
