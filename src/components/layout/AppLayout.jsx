import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { CompareTray } from '@/features/decks/components/CompareTray';
export function AppLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        İçeriğe geç
      </a>
      <AppHeader />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <AppFooter />
      <CompareTray />
    </>
  );
}
