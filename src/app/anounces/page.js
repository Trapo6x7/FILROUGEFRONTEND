import { Suspense } from 'react';
import AnouncesList from "@/src/components/anounces/anounceList";

import dynamic from 'next/dynamic';

const AnouncesList = dynamic(() => import('@/src/components/anounces/anounceList'), {
  ssr: false,
});

export default function CategoriesPage() {
  return (
    <main className="bg-[#f9f6f1] p-10">
      <div className="flex flex-wrap gap-8 justify-center">
        <Suspense  fallback={<div className="text-center">🌀 Chargement des annonces...</div>}>
          <AnouncesList />
        </Suspense>
      </div>
    </main>
  );
}