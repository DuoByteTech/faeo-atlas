import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DeckProvider } from '@/features/decks/context/DeckProvider';
import { HomePage } from '@/features/home/pages/HomePage';
import { AppNotFoundPage } from '@/pages/AppNotFoundPage';
const DeckCatalogPage = lazy(() =>
  import('@/features/decks/pages/DeckCatalogPage').then((m) => ({ default: m.DeckCatalogPage })),
);
const DeckDetailPage = lazy(() =>
  import('@/features/decks/pages/DeckDetailPage').then((m) => ({ default: m.DeckDetailPage })),
);
const DeckComparePage = lazy(() =>
  import('@/features/decks/pages/DeckComparePage').then((m) => ({ default: m.DeckComparePage })),
);
const GuidePage = lazy(() =>
  import('@/features/guides/pages/GuidePage').then((m) => ({ default: m.GuidePage })),
);
const ResearchPage = lazy(() =>
  import('@/features/research/pages/ResearchPage').then((m) => ({ default: m.ResearchPage })),
);
const ReputationCatalogPage = lazy(() =>
  import('@/features/reputations/pages/ReputationCatalogPage').then((m) => ({
    default: m.ReputationCatalogPage,
  })),
);
const ReputationDetailPage = lazy(() =>
  import('@/features/reputations/pages/ReputationDetailPage').then((m) => ({
    default: m.ReputationDetailPage,
  })),
);
const ReputationImagesPage = lazy(() =>
  import('@/features/reputations/pages/ReputationImagesPage').then((m) => ({
    default: m.ReputationImagesPage,
  })),
);
export function App() {
  return (
    <DeckProvider>
      <Suspense
        fallback={
          <div className="loading-state" role="status">
            Atlas yükleniyor…
          </div>
        }
      >
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="desteler" element={<DeckCatalogPage />} />
            <Route path="desteler/:id" element={<DeckDetailPage />} />
            <Route path="karsilastir" element={<DeckComparePage />} />
            <Route path="madalyalar" element={<ReputationCatalogPage />} />
            <Route path="madalyalar/gorseller" element={<ReputationImagesPage />} />
            <Route path="madalyalar/:id" element={<ReputationDetailPage />} />
            <Route path="rehber" element={<GuidePage />} />
            <Route path="kaynaklar" element={<ResearchPage />} />
            <Route path="*" element={<AppNotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </DeckProvider>
  );
}
