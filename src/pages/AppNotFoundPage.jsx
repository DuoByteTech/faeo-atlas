import { AppEmptyState } from '@/components/ui/AppEmptyState';
import { AppButton } from '@/components/ui/AppButton';
import { usePageTitle } from '@/hooks/usePageTitle';
export function AppNotFoundPage() {
  usePageTitle('Sayfa bulunamadı');
  return (
    <AppEmptyState
      title="Bu yol haritada yok"
      description="Aradığın sayfa bulunamadı. Atlasın ana sayfasından devam edebilirsin."
    >
      <AppButton to="/">Ana sayfaya dön</AppButton>
    </AppEmptyState>
  );
}
