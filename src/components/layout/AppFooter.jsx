import { Link } from 'react-router-dom';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppIcon } from '@/components/ui/AppIcon';
export function AppFooter() {
  return (
    <footer className="app-footer">
      <AppContainer>
        <div className="footer-top">
          <div>
            <Link to="/" className="brand">
              <AppIcon name="Compass" size={27} />
              <span>FAEO ATLAS</span>
            </Link>
            <p className="muted mt-4 max-w-sm text-sm">
              Faeo dünyasını birlikte keşfediyoruz.
              <br />
              Türkçe, kaynaklı ve gelişmeye açık oyun rehberi.
            </p>
          </div>
          <div className="flex flex-wrap gap-7 text-sm">
            <Link to="/desteler">Kart desteleri</Link>
            <Link to="/madalyalar">Madalyalar</Link>
            <Link to="/rehber">Seçim rehberi</Link>
            <Link to="/kaynaklar">Kaynaklar ve notlar</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Bağımsız topluluk rehberi. Resmî oyun sitesi değildir.</span>
          <span>Özgün adlar oyuna aittir · Açıklamalar Türkçedir</span>
        </div>
      </AppContainer>
    </footer>
  );
}
