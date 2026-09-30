import { Link } from 'react-router-dom';
import { HomeHero } from '../components/HomeHero';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppSectionHeading } from '@/components/ui/AppSectionHeading';
import { AppIcon } from '@/components/ui/AppIcon';
import { AppButton } from '@/components/ui/AppButton';
import { DeckCard } from '@/features/decks/components/DeckCard';
import { categories } from '@/features/decks/data/categories';
import { decks } from '@/features/decks/data/decks';
import { usePageTitle } from '@/hooks/usePageTitle';
export function HomePage() {
  usePageTitle('Türkçe War of Dragons Rehberi');
  return (
    <>
      <HomeHero />
      <div className="stats-strip">
        <AppContainer className="grid grid-cols-3 gap-4">
          <div>
            <strong>{decks.length}</strong>
            <span>Deste kaydı</span>
          </div>
          <div>
            <strong>{categories.length}</strong>
            <span>Keşif kategorisi</span>
          </div>
          <div>
            <strong>4</strong>
            <span>Oyun hedefine göre rehber</span>
          </div>
        </AppContainer>
      </div>
      <AppContainer>
        <section className="page-section">
          <AppSectionHeading
            eyebrow="KENDİ YOLUNU ÇİZ"
            title="Ne için bir deste arıyorsun?"
            description="Her deste farklı bir amaca hizmet eder. İhtiyacından başlayarak keşfet."
          />
          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to={`/desteler?category=${category.id}`}
                key={category.id}
                className={`category-tile tone-${category.tone}`}
              >
                <span className="category-icon">
                  <AppIcon name={category.icon} size={25} />
                </span>
                <strong>{category.label}</strong>
                <span>{decks.filter((d) => d.category === category.id).length} deste</span>
                <AppIcon name="ArrowUpRight" size={16} />
              </Link>
            ))}
          </div>
        </section>
        <section className="page-section pt-0">
          <AppSectionHeading
            eyebrow="ATLAS’TAN SEÇKİLER"
            title="Keşfetmeye değer desteler"
            description="Güçlendirmeden boss savaşlarına, farklı hedefler için üç başlangıç noktası."
          >
            <Link className="text-link" to="/desteler">
              Tüm desteler <AppIcon name="ArrowRight" size={17} />
            </Link>
          </AppSectionHeading>
          <div className="grid gap-5 md:grid-cols-3">
            {['guardians-of-truth', 'kings-burden', 'farmers-gift'].map((id) => (
              <DeckCard key={id} deck={decks.find((d) => d.id === id)} />
            ))}
          </div>
        </section>
        <section className="guide-banner">
          <div className="guide-emblem">
            <AppIcon name="Compass" size={70} />
          </div>
          <div>
            <p className="eyebrow">İYİ BİR SEÇİM, DOĞRU BİR BAŞLANGIÇ</p>
            <h2>Önce hangi desteyi almalısın?</h2>
            <p className="muted mt-3">
              Tek bir sıralama herkese uymaz. Oyun hedefine göre önerileri keşfet.
            </p>
          </div>
          <AppButton to="/rehber" variant="secondary">
            Rehberi incele <AppIcon name="ArrowRight" size={17} />
          </AppButton>
        </section>
        <section className="page-section">
          <div className="research-callout">
            <AppIcon name="BookOpen" size={26} />
            <div>
              <h3>Birlikte büyüyen bir bilgi kaynağı</h3>
              <p className="muted mt-2">
                Güncel eşya açıklamaları, topluluk rehberleri ve araştırma notları. Kaynağı belirsiz
                bilgileri ayrıca işaretliyoruz.
              </p>
            </div>
            <Link className="text-link" to="/kaynaklar">
              Kaynakları gör <AppIcon name="ArrowUpRight" size={17} />
            </Link>
          </div>
        </section>
      </AppContainer>
    </>
  );
}
