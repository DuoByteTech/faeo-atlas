import { Link, useParams } from 'react-router-dom';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppIcon } from '@/components/ui/AppIcon';
import { AppBadge } from '@/components/ui/AppBadge';
import { AppNotFoundPage } from '@/pages/AppNotFoundPage';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AppItemImage } from '@/components/ui/AppItemImage';
import { ReputationDataTables } from '../components/ReputationDataTables';
import { ReputationMilestones } from '../components/ReputationMilestones';
import { reputations, reputationSources, libraryUrl } from '../data/reputations';

export function ReputationDetailPage() {
  const { id } = useParams();
  const reputation = reputations.find((r) => r.id === id);
  usePageTitle(reputation ? `${reputation.title} — Madalya rehberi` : 'Rehber bulunamadı');
  return reputation ? <ReputationGuide key={id} reputation={reputation} /> : <AppNotFoundPage />;
}
function ReputationGuide({ reputation: r }) {
  const [checked, setChecked] = useLocalStorage(
    `faeo-medal-materials-v2-${r.id}`,
    [],
    (value) => Array.isArray(value) && value.every((i) => typeof i === 'number'),
  );
  const progress = r.materials.filter((_, i) => checked.includes(i)).length;
  return (
    <AppContainer>
      <Link to="/madalyalar" className="text-link mt-8">
        <AppIcon name="ArrowLeft" size={17} /> Tüm madalyalar
      </Link>
      <header className="page-intro medal-detail-intro">
        <span className="medal-seal medal-red">
          <AppIcon name="Shield" size={30} />
        </span>
        <div>
          <p className="eyebrow">{r.name}</p>
          <h1>{r.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <AppBadge>{r.category}</AppBadge>
            <AppBadge>Başlangıç: {r.level}. seviye</AppBadge>
            <AppBadge>
              Kırmızı:{' '}
              {r.id === 'labyrinth-explorers' ? '8 / 11 — kaynak farkı' : `${r.redLevel}. seviye`}
            </AppBadge>
            <AppBadge>{r.partial ? 'Kırmızı görev kısmi' : 'Kırmızı adımları mevcut'}</AppBadge>
          </div>
        </div>
      </header>
      <ReputationMilestones reputation={r} />
      <nav className="rep-section-nav" aria-label="Rehber bölümleri">
        <button
          onClick={() =>
            document.getElementById('puan-tablolari')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Puan ve ödül tabloları ↓
        </button>
        <button
          onClick={() =>
            document.getElementById('kirmizi-gorev')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Kırmızı görev ↓
        </button>
        <Link to="/madalyalar/gorseller">Görsel dosya rehberi</Link>
      </nav>
      <div className="medal-detail-layout">
        <div>
          <section className="medal-section">
            <p className="eyebrow">01 · BAŞLANGIÇ</p>
            <h2>Nereden başlanır?</h2>
            <dl className="medal-facts">
              <div>
                <dt>NPC / konum</dt>
                <dd>{r.npc}</dd>
              </div>
              <div>
                <dt>Ön koşullar</dt>
                <dd>{r.unlock}</dd>
              </div>
            </dl>
          </section>
          <section className="medal-section">
            <p className="eyebrow">02 · İTİBAR KASMA</p>
            <h2>Mora kadar ilerleme</h2>
            <ul className="medal-bullets">
              {r.farming.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <a
              className="text-link"
              href={libraryUrl(r.libraryId)}
              target="_blank"
              rel="noreferrer"
            >
              Resmî kasılma ve ödül tablosu <AppIcon name="ExternalLink" size={16} />
            </a>
          </section>
          <section className="medal-section" id="kirmizi-gorev">
            <p className="eyebrow">03 · KIRMIZI MADALYA</p>
            <h2>Worship görev adımları</h2>
            <p className="muted mt-3">
              3000 itibar, ilgili seviye ve kabul görevleri tamamlandıktan sonra görev NPC’siyle
              konuş.
            </p>
            {r.partial && (
              <p className="notice mt-5">
                Bu görevin tam zinciri henüz doğrulanmadı. Aşağıdaki bilgi yalnızca araştırılmış
                aşamaları kapsar; tüm maliyet olarak yorumlama.
              </p>
            )}
            {r.steps.length > 0 ? (
              <ol className="medal-steps">
                {r.steps.map((step, i) => (
                  <li key={step}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="muted mt-5">
                Kırmızı görevin ayrıntılı adımları için bağlantılı forum rehberini ve oyun içi görev
                günlüğünü kullan. Doğrulanmamış bir teslimat listesi eklenmedi.
              </p>
            )}
            {r.alternative && (
              <div className="medal-alternative">
                <AppIcon name="Sparkles" />
                <div>
                  <h3>Alternatif yol</h3>
                  <p>{r.alternative}</p>
                </div>
              </div>
            )}
            {r.notes && (
              <aside className="notice mt-5">
                <strong>Dikkat edilmesi gerekenler</strong>
                <p className="mt-2">{r.notes}</p>
              </aside>
            )}
          </section>
        </div>
        <aside className="medal-sidebar">
          <section className="medal-material-panel">
            <p className="eyebrow">HAZIRLIK LİSTESİ</p>
            <h2>{r.partial ? 'Bilinen malzemeler' : 'Gerekli malzemeler'}</h2>
            {r.materials.length ? (
              <>
                <p className="muted mt-3">
                  {progress} / {r.materials.length} kalem hazır. İşaretlerin bu tarayıcıda saklanır.
                </p>
                <progress
                  aria-label="Malzeme hazırlık ilerlemesi"
                  value={progress}
                  max={r.materials.length}
                />
                <div className="medal-materials">
                  {r.materials.map((m, i) => (
                    <label key={m.name}>
                      <input
                        type="checkbox"
                        checked={checked.includes(i)}
                        onChange={() =>
                          setChecked((old) =>
                            old.includes(i) ? old.filter((v) => v !== i) : [...old, i],
                          )
                        }
                      />
                      <AppItemImage src={m.image} name={m.name} />
                      <span>
                        <strong>{m.name}</strong>
                        <small>
                          {typeof m.amount === 'number'
                            ? `${m.amount.toLocaleString('tr-TR')} adet`
                            : m.amount}
                        </small>
                      </span>
                    </label>
                  ))}
                </div>
                <button className="text-link mt-4" onClick={() => setChecked([])}>
                  İşaretleri temizle
                </button>
                <p className="muted text-sm mt-4">
                  İngilizce eşya adları oyun içinde arayabilmen için korundu. Alternatif yolların
                  malzemelerini birlikte satın alma.
                </p>
              </>
            ) : (
              <p className="muted mt-4">Tam liste doğrulanmadı. Görev günlüğünden kontrol et.</p>
            )}
          </section>
          <section className="medal-source-panel">
            <h3>Kaynaklar ve güncellik</h3>
            <p className="muted my-3">
              Araştırma: 1 Ekim 2026. Forum görevleri eski tarihlerde yazılmış olabilir; bu tarih
              oyun içinde test edildiği anlamına gelmez.
            </p>
            {[
              [libraryUrl(r.libraryId), 'Resmî itibar kütüphanesi'],
              [reputationSources.worship, 'İngilizce Worship görevleri'],
              [reputationSources.turkish, 'Türkçe Worship rehberi'],
              [reputationSources.rating, 'Seviye ve madalya tablosu'],
              [r.referenceSite, 'Vika Plus — Rus sunucusu referansı'],
            ].map(([url, title]) => (
              <a key={url} href={url} target="_blank" rel="noreferrer">
                {title}
                <AppIcon name="ArrowUpRight" size={15} />
              </a>
            ))}
          </section>
        </aside>
      </div>
      <ReputationDataTables reputation={r} />
    </AppContainer>
  );
}
