import { Link } from 'react-router-dom';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppButton } from '@/components/ui/AppButton';
import { AppIcon } from '@/components/ui/AppIcon';
import { decks } from '@/features/decks/data/decks';
import { DeckArtwork } from '@/features/decks/components/DeckArtwork';
export function HomeHero() {
  return (
    <section className="home-hero">
      <AppContainer className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" />
            FAEO’YA AÇILAN REHBERİN
          </p>
          <h1>
            Her destenin
            <br />
            bir <em>hikâyesi.</em>
            <br />
            Her seçimin bir gücü.
          </h1>
          <p className="hero-description">
            Kartların ardındaki gücü keşfet. Etkileri karşılaştır, oyun tarzına uygun desteyi bul ve
            Faeo’daki bir sonraki adımını planla.
          </p>
          <div className="flex flex-wrap gap-3">
            <AppButton to="/desteler">
              Desteleri keşfet <AppIcon name="ArrowRight" size={18} />
            </AppButton>
            <AppButton to="/rehber" variant="secondary">
              Nereden başlamalı?
            </AppButton>
          </div>
          <div className="hero-trust">
            <span>
              <AppIcon name="CheckCircle2" size={15} />
              Kaynaklı bilgiler
            </span>
            <span>
              <AppIcon name="BookOpen" size={15} />
              Türkçe rehber
            </span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Sembolik Conlegret kart illüstrasyonları">
          <div className="hero-halo" />
          <div className="hero-ring" />
          <div className="hero-card hero-card--back">
            <DeckArtwork deck={decks.find((d) => d.id === 'magical-flora')} large />
            <span>DOĞANIN GÜCÜ</span>
          </div>
          <Link to="/desteler/kings-burden" className="hero-card hero-card--front">
            <span className="hero-card-number">XX · CONLEGRET</span>
            <DeckArtwork deck={decks.find((d) => d.id === 'kings-burden')} large />
            <div className="hero-card-name">
              <small>KRALIN YÜKÜ</small>
              <strong>King’s Burden</strong>
              <span>Bir mücadeleden fazlası.</span>
            </div>
          </Link>
          <div className="hero-note">
            <span className="note-icon">
              <AppIcon name="Layers" size={22} />
            </span>
            <span>
              <strong>{decks.length} deste kaydı</strong>
              <small>Tek bir keşif noktası</small>
            </span>
          </div>
          <span className="hero-caption">SEÇİM SENİN. HİKÂYE FAEO’NUN.</span>
        </div>
      </AppContainer>
    </section>
  );
}
