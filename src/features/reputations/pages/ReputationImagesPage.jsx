import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppItemImage } from '@/components/ui/AppItemImage';
import { usePageTitle } from '@/hooks/usePageTitle';
import { reputationItems } from '../data/reputationItems';
import { reputations } from '../data/reputations';
const records = [
  ...Object.values(reputationItems),
  ...reputations.flatMap((r) =>
    ['grey', 'green', 'blue', 'purple', 'red'].map((t) => ({
      id: `${r.id}-${t}`,
      name: `${r.title} — ${t}`,
      image: `/images/reputations/medals/${r.id}-${t}.webp`,
      sourceImage: '',
    })),
  ),
];
export function ReputationImagesPage() {
  usePageTitle('Madalya görsel dosya rehberi');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(30);
  const results = records.filter((r) =>
    `${r.name} ${r.image}`.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr')),
  );
  return (
    <AppContainer>
      <header className="page-intro">
        <p className="eyebrow">İÇERİK DÜZENLEME REHBERİ</p>
        <h1>Görselleri yerleştir.</h1>
        <p className="muted mt-4">
          Dosyaları aşağıdaki adlarla depoya ekle. Yeni dağıtımda ilgili eşya ve madalyanın yanında
          otomatik görünür. Eklenmeyen görseller için sembolik yer tutucu kullanılır.
        </p>
        <div className="flex flex-wrap gap-4 mt-5">
          <a
            className="text-link"
            href={`${import.meta.env.BASE_URL}images/reputations/manifest.csv`}
            download
          >
            Dosya listesini indir (CSV)
          </a>
          <Link className="text-link" to="/madalyalar">
            Madalya rehberine dön
          </Link>
        </div>
      </header>
      <label className="medal-search">
        <span className="sr-only">Görsel adı veya dosya yolu ara</span>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(30);
          }}
          placeholder="Eşya adı veya dosya yolu ara…"
        />
      </label>
      <p className="muted my-4" role="status">
        {results.length} görsel kaydı · {Math.min(limit, results.length)} gösteriliyor
      </p>
      <div className="rep-asset-grid">
        {results.slice(0, limit).map((r) => (
          <article key={r.id}>
            <AppItemImage src={r.image} name={r.name} />
            <div>
              <h2>{r.name}</h2>
              <code>public{r.image}</code>
              {r.sourceImage && (
                <a className="text-link" href={r.sourceImage} target="_blank" rel="noreferrer">
                  Referans görseli aç ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      {!results.length && (
        <p className="notice my-6">
          Bu adla görsel bulunamadı. İngilizce eşya adını veya eşya kimliğini deneyebilirsin.
        </p>
      )}
      {limit < results.length && (
        <button className="text-link my-8" onClick={() => setLimit((n) => n + 30)}>
          30 kayıt daha göster
        </button>
      )}
      <p className="muted my-10">
        Önerilen boyut: eşya 120 × 120, madalya 160 × 160 piksel. WebP kullan; dosya adını ve küçük
        harfleri koru. Dosya uzantısını değiştirmek dönüştürme işlemi değildir.
      </p>
    </AppContainer>
  );
}
