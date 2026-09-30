import { Link } from 'react-router-dom';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppButton } from '@/components/ui/AppButton';
import { AppEmptyState } from '@/components/ui/AppEmptyState';
import { AppIcon } from '@/components/ui/AppIcon';
import { decks } from '../data/decks';
import { categoryById, statusLabels } from '../data/categories';
import { useDeckLibrary } from '../hooks/useDeckLibrary';
import { usePageTitle } from '@/hooks/usePageTitle';
export function DeckComparePage() {
  usePageTitle('Deste karşılaştırma');
  const { compare, toggleCompare, clearCompare } = useDeckLibrary();
  const selected = compare.map((id) => decks.find((d) => d.id === id)).filter(Boolean);
  return (
    <AppContainer>
      <header className="page-intro">
        <p className="eyebrow">YAN YANA, DAHA NET</p>
        <h1>Desteleri karşılaştır</h1>
        <p className="muted">En fazla üç destenin etkilerini ve koşullarını birlikte incele.</p>
      </header>
      {!selected.length ? (
        <AppEmptyState
          title="Henüz deste seçmedin"
          description="Katalogdaki Karşılaştır düğmesiyle desteleri buraya ekleyebilirsin."
        >
          <AppButton to="/desteler">Desteleri keşfet</AppButton>
        </AppEmptyState>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-3">
            <AppButton to="/desteler" variant="secondary">
              Deste ekle
            </AppButton>
            <AppButton onClick={clearCompare} variant="ghost">
              Seçimi temizle
            </AppButton>
          </div>
          <div
            className="comparison-scroll"
            role="region"
            aria-label="Deste karşılaştırma tablosu"
            tabIndex={0}
          >
            <table className="comparison-table">
              <caption className="sr-only">Seçilen destelerin özellikleri</caption>
              <thead>
                <tr>
                  <th scope="col">Özellik</th>
                  {selected.map((deck) => (
                    <th scope="col" key={deck.id}>
                      <Link to={`/desteler/${deck.id}`}>{deck.title}</Link>
                      <small>{deck.name}</small>
                      <button
                        className="text-link mt-3"
                        onClick={() => toggleCompare(deck.id)}
                        aria-label={`${deck.title} karşılaştırmadan çıkar`}
                      >
                        <AppIcon name="X" size={14} />
                        Çıkar
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Kategori', (d) => categoryById[d.category].label],
                  ['Kullanım', (d) => d.frequency],
                  ['Etki', (d) => d.effect],
                  ['Dikkat edilecekler', (d) => d.note],
                  ['Geliştirme', (d) => d.upgrade || 'Doğrulanmış ek bilgi yok.'],
                  ['Kaynak durumu', (d) => statusLabels[d.status]],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {selected.map((deck) => (
                      <td key={deck.id}>{value(deck)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted my-6 text-sm">
            Dar ekranlarda tabloyu yatay kaydırabilirsin. Etkiler her zaman birlikte
            kullanılamayabilir.
          </p>
        </>
      )}
    </AppContainer>
  );
}
