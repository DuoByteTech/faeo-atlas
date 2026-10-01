import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContainer } from '@/components/ui/AppContainer';
import { AppIcon } from '@/components/ui/AppIcon';
const navigation = [
  { to: '/', label: 'Ana sayfa' },
  { to: '/desteler', label: 'Kart desteleri' },
  { to: '/madalyalar', label: 'Madalyalar' },
  { to: '/rehber', label: 'Seçim rehberi' },
  { to: '/kaynaklar', label: 'Kaynaklar' },
];
export function AppHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="app-header">
      <AppContainer className="header-inner">
        <Link
          to="/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="Faeo Atlas ana sayfa"
        >
          <span className="brand-mark">
            <AppIcon name="Compass" size={25} />
          </span>
          <span>
            FAEO<span className="brand-light"> ATLAS</span>
            <small>WAR OF DRAGONS REHBERİ</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Ana gezinme">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link className="header-save" to="/desteler?favorites=1">
          <AppIcon name="Heart" size={17} />
          <span>Kaydedilenler</span>
        </Link>
        <button
          className="mobile-toggle"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          <AppIcon name={open ? 'X' : 'Menu'} />
        </button>
      </AppContainer>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobil gezinme">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/desteler?favorites=1" onClick={() => setOpen(false)}>
            Kaydedilenler
          </Link>
        </nav>
      )}
    </header>
  );
}
