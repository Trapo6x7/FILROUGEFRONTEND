"use client";

import { getAnounces, getBookDetails } from '@/src/services/anounceService';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/src/context/CartContext'; // Import du contexte



const AnouncesList = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const [anounces, setAnounces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Récupération de la fonction addToCart depuis le contexte

  useEffect(() => {
    const fetchAnounces = async () => {
      try {
        const data = await getAnounces();
        let filteredAnounces = await Promise.all(
          data.member.map(async (anounce) => {
            let bookDetails = null;
            if (anounce.book && typeof anounce.book === "object" && anounce.book["@id"]) {
              bookDetails = await getBookDetails(anounce.book["@id"]);
            } else if (typeof anounce.book === "string") {
              bookDetails = await getBookDetails(anounce.book);
            }
            return {
              ...anounce,
              bookDetails
            };
          })
        );

        switch (filter) {
          case 'recent':
            filteredAnounces = filteredAnounces
              .filter(anounce => {
                if (!anounce.createdAt) return false;
                try {
                  const createdAt = new Date(anounce.createdAt);
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 7);
                  return createdAt >= thirtyDaysAgo;
                } catch {
                  return false;
                }
              })
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;

          case 'selection':
            filteredAnounces = filteredAnounces
              .sort(() => Math.random() - 0.5)
              .slice(0, 4);
            break;

          case 'bestSellers':
            filteredAnounces = filteredAnounces
              .filter(anounce => anounce.price)
              .sort((a, b) => a.price - b.price)
              .slice(0, 8);
            break;
        }

        setAnounces(filteredAnounces);
      } catch (err) {
        console.error("Erreur lors de la récupération des annonces :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnounces();
  }, [filter]);

  const getTitle = () => {
    switch (filter) {
      case 'recent':
        return "Nouveautés de la semaine";
      case 'selection':
        return "Notre sélection";
      case 'bestSellers':
        return "Bon plans";
      default:
        return "Toutes les annonces";
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9ba2ff]"></div>
    </div>
  );

  if (error) return <div className="text-red-500 text-center">Erreur: {error}</div>;

  return (
    <div className="px-4 py-8 overflow-x-hidden">
      <h1 className="text-2xl font-bold text-center mb-8">{getTitle()}</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {anounces.map((anounce) => (
          <article
            key={anounce.id}
            className="bg-[#ffe47b] rounded-xl flex flex-col justify-between p-4 gap-3 
                    max-w-sm w-full shadow-md hover:shadow-xl transition-shadow"
          >
            {/* Image */}
            <div className="flex justify-center">
              <Image
                src="asset/image/placeholderbook.png"
                alt={anounce.bookDetails?.title || 'Livre'}
                className="h-48 w-auto object-contain rounded-md"
              />
            </div>

            {/* Infos */}
            <div className="flex flex-col min-h-[150px] justify-between">
              <h3 className="text-sm font-light text-[#333333]">
                {anounce.bookDetails?.author?.name}
              </h3>
              <h2 className="text-lg font-bold text-[#333333] truncate">
                {anounce.bookDetails?.title}
              </h2>
              <p className="text-md font-bold text-[#9ba2ff]">
                {anounce.price} €
              </p>
              <p className="text-sm text-[#333333] line-clamp-2">
                {anounce.description}
              </p>
            </div>

            {/* Boutons */}
            <div className="flex flex-col justify-center mt-3 gap-2">
              <Link
                href={`/anounces/${anounce.id}`}
                className="text-[#f9f6f1] bg-[#333333] p-2 rounded-md text-center w-full hover:bg-[#222222] transition"
              >
                Voir l'annonce
              </Link>
              <button
                onClick={() => addToCart(anounce)}
                className="bg-[#333333] text-[#f9f6f1] p-2 rounded-md text-center w-full hover:bg-[#222222] transition"
              >
                Ajouter au panier
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AnouncesList;
