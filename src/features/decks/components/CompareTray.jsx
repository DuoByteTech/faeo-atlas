import { useLocation } from 'react-router-dom';
import { AppButton } from '@/components/ui/AppButton';
import { AppIcon } from '@/components/ui/AppIcon';
import { useDeckLibrary } from '../hooks/useDeckLibrary';
export function CompareTray() {
  const { compare, clearCompare } = useDeckLibrary();
  const { pathname } = useLocation();
  if (!compare.length || pathname === '/karsilastir') return null;
  return (
    <aside className="compare-tray" aria-label="Karşılaştırma seçimi">
      <span className="flex items-center gap-3">
        <AppIcon name="GitCompareArrows" />
        <span>
          <strong>{compare.length}/3 deste</strong>
          <small className="block muted">Karşılaştırmaya hazır</small>
        </span>
      </span>
      <AppButton to="/karsilastir">
        Karşılaştır <AppIcon name="ArrowRight" size={17} />
      </AppButton>
      <button className="icon-button" onClick={clearCompare} aria-label="Karşılaştırmayı temizle">
        <AppIcon name="X" size={18} />
      </button>
    </aside>
  );
}
