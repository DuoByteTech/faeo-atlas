import { AppContainer } from '@/components/ui/AppContainer';
import { AppIcon } from '@/components/ui/AppIcon';
import { AppBadge } from '@/components/ui/AppBadge';
import { researchSources, changelog } from '../data/research';
import { usePageTitle } from '@/hooks/usePageTitle';
export function ResearchPage() {
  usePageTitle('Kaynaklar ve araştırma notları');
  return (
    <AppContainer>
      <header className="page-intro">
        <p className="eyebrow">BİLGİNİN İZİNİ SÜR</p>
        <h1>Kaynaklar ve notlar</h1>
        <p className="muted">
          Hangi bilginin nereden geldiğini bilmek, en az bilginin kendisi kadar önemli.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-3 mb-10">
        {[
          [
            'green',
            'EN kaynağı doğrulandı',
            'İngiliz sunucusunun eşya açıklamasıyla doğrulanan kayıt.',
          ],
          [
            'gold',
            'Bilgi eksik',
            'Eski rehber, eksik etki veya henüz doğrulanamayan kullanım bilgisi.',
          ],
          [
            'purple',
            'Yalnız RU kaynağı',
            'Rus sunucusunda doğrulanan; İngiliz sunucusunda edinilebilirliği doğrulanmayan kayıt.',
          ],
        ].map(([tone, title, text]) => (
          <div className="info-panel" key={title}>
            <AppBadge tone={tone}>{title}</AppBadge>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="source-grid">
        {researchSources.map((source) => (
          <a
            className="source-card"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            key={source.url}
          >
            <AppIcon name="BookOpen" size={25} />
            <div>
              <p className="eyebrow">{source.type}</p>
              <h2>{source.title}</h2>
              <p className="muted mt-3">{source.note}</p>
            </div>
            <AppIcon name="ArrowUpRight" />
          </a>
        ))}
      </div>
      <section className="page-section">
        <h2>Son içerik güncellemesi</h2>
        {changelog.map((entry) => (
          <article className="changelog" key={entry.date}>
            <span>{entry.date}</span>
            <div>
              <h3>{entry.title}</h3>
              <p className="muted mt-2">{entry.text}</p>
            </div>
          </article>
        ))}
        <div className="notice mt-6">
          Deste detaylarında doğrudan kaynak bağlantıları bulunur. Kullanım sayıları normal sürüm
          içindir. Türkçe adlar açıklayıcı çeviridir; oyundaki özgün adlar korunmuştur. Kategori
          illüstrasyonları semboliktir, oyun içi kart görselleri değildir.
        </div>
      </section>
    </AppContainer>
  );
}
