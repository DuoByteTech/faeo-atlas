import { useSearchParams, Link } from 'react-router-dom';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppIcon } from '@/components/ui/AppIcon';
import { AppBadge } from '@/components/ui/AppBadge';
import { decks } from '@/features/decks/data/decks';
import { strategies } from '../data/strategies';
import { usePageTitle } from '@/hooks/usePageTitle';
export function GuidePage() {
  usePageTitle('Oyun hedefine göre seçim rehberi');
  const [params, setParams] = useSearchParams();
  const selected = strategies.find((s) => s.id === params.get('hedef')) || strategies[0];
  return (
    <AppContainer>
      <header className="page-intro">
        <p className="eyebrow">DOĞRU HEDEF, DOĞRU DESTE</p>
        <h1>Senin yolun hangisi?</h1>
        <p className="muted">
          Seviyeden veya sınıftan bağımsız bir başlangıç rehberi. Önce en çok yaptığın etkinliği
          seç.
        </p>
      </header>
      <div className="strategy-tabs" aria-label="Oyun hedefi">
        {strategies.map((s) => (
          <button
            key={s.id}
            className={selected.id === s.id ? 'active' : ''}
            aria-pressed={selected.id === s.id}
            onClick={() => setParams({ hedef: s.id })}
          >
            <AppIcon name={s.icon} />
            {s.title}
          </button>
        ))}
      </div>
      <div className="guide-layout">
        <section>
          <div className="mb-7">
            <AppBadge tone="gold">Önerilen değerlendirme sırası</AppBadge>
            <h2 className="mt-4">{selected.title}</h2>
            <p className="muted mt-3">{selected.intro}</p>
          </div>
          <ol className="ranking-list">
            {selected.picks.map(([id, reason], index) => {
              const deck = decks.find((d) => d.id === id);
              return (
                <li key={id}>
                  <span className="rank-number">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <Link to={`/desteler/${id}`}>
                      <h3>{deck.title}</h3>
                    </Link>
                    <span className="deck-english">{deck.name}</span>
                    <p>{reason}</p>
                  </div>
                  <Link
                    to={`/desteler/${id}`}
                    className="icon-button"
                    aria-label={`${deck.title} detayları`}
                  >
                    <AppIcon name="ArrowUpRight" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
        <aside className="guide-advice">
          <AppIcon name="Compass" size={34} />
          <h2>Almadan önce</h2>
          <ul>
            <li>
              <strong>Kullanacak mısın?</strong>
              <p>
                Haftalık hakkı düzenli kullanmadığın bir deste, ilk yatırımın olmak zorunda değil.
              </p>
            </li>
            <li>
              <strong>Seviyene uygun mu?</strong>
              <p>İksir aralıklarını, çağrılan yaratıkları ve açılma şartlarını kontrol et.</p>
            </li>
            <li>
              <strong>Etkiler uyumlu mu?</strong>
              <p>Her kutsama diğerleriyle birleşmez. Güncel açıklamaya bak.</p>
            </li>
            <li>
              <strong>Masrafı ne?</strong>
              <p>Fiyat, savaş tüketimi ve elde edeceğin faydayı birlikte değerlendir.</p>
            </li>
          </ul>
          <p className="notice">
            Bu sıralamalar editoryal öneridir. Canlı pazar fiyatı veya kesin kazanç hesabı değildir.
          </p>
        </aside>
      </div>
    </AppContainer>
  );
}
