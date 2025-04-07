"use client";

import { useState, useEffect } from 'react';
import { use } from 'react';
import { getAnounceDetails, getBookDetails } from '@/src/services/anounceService';
import Link from 'next/link';

export default function AnounceDetails({ params }) {
  const [anounce, setAnounce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const unwrappedParams = use(params);

  useEffect(() => {
    const fetchAnounceDetails = async () => {
        setLoading(true);
        try {
            const anounceData = await getAnounceDetails(unwrappedParams.anouncesId);
            let bookDetails = null;
            
            if (anounceData.book) {
                // Pass the book URI or object
                bookDetails = await getBookDetails(anounceData.book);
            }
            
            setAnounce({
                ...anounceData,
                bookDetails
            });
        } catch (err) {
            console.error("Erreur lors de la récupération des détails:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    fetchAnounceDetails();
}, [unwrappedParams.anouncesId]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#ffe47b]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9ba2ff]"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-[#ffe47b]">
      <p className="text-red-600">Erreur: {error}</p>
    </div>
  );

  if (!anounce) return null;

  return (
    <main className="min-h-screen bg-[#ffe47b] p-10">
      <div className="max-w-4xl mx-auto bg-[#f9f6f1] rounded-lg shadow-xl p-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Colonne de gauche - Image */}
          <div className="flex justify-center items-start">
            <Image
              src="/asset/image/placeholderbook.png"
              alt={anounce.bookDetails.title}
              className="rounded-lg shadow-md max-h-[400px]"
            />
          </div>

          {/* Colonne de droite - Informations */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[#333333]">
              {anounce.bookDetails.title}
            </h1>
            <p className="text-xl text-[#666666]">
              {anounce.bookDetails.author.name}
            </p>
            <p className="text-2xl font-bold text-[#9ba2ff]">
              {anounce.price} €
            </p>
            <div className="bg-white rounded-lg p-4 mt-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{anounce.description}</p>
            </div>
            <div className="bg-white rounded-lg p-4 mt-4">
              <h2 className="text-lg font-semibold mb-2">Vendeur</h2>
              <p className="text-gray-600">{anounce.seller.pseudo}</p>
            </div>
            <Link href="/anounces">
              <p className="text-[#f9f6f1] bg-[#333333] p-2 rounded-md text-center w-full">Retour aux annonces</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}