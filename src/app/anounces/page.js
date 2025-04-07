export const dynamic = 'force-dynamic'; // très important pour désactiver le rendu statique

import { Suspense } from 'react';
import AnouncesList from '@/src/components/anounces/anounceList';

export default function AnouncesPage() {
  return (
    <main className="bg-[#f9f6f1] p-10">
      <div className="flex flex-wrap gap-8 justify-center">
        <Suspense fallback={<div>Chargement des annonces...</div>}>
          <AnouncesList />
        </Suspense>
      </div>
    </main>
  );
}