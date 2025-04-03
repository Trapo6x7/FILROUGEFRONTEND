"use client";

import { getAnounces, getBookDetails } from '@/src/services/anounceService';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/src/context/CartContext';

const AnouncesList = () => {
    const searchParams = useSearchParams();
    const filter = searchParams.get('filter');
    const [anounces, setAnounces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

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

                // Appliquer les filtres
                switch (filter) {
                    case 'recent':
                        // Filtrer les annonces des 30 derniers jours
                        console.log('Filtrage des annonces récentes...');
                        filteredAnounces = filteredAnounces
                            .filter(anounce => {
                                if (!anounce.createdAt) {
                                    console.log('Annonce sans date:', anounce);
                                    return false;
                                }

                                try {
                                    const createdAt = new Date(anounce.createdAt);
                                    const thirtyDaysAgo = new Date();
                                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 7);

                                    console.log('Date création:', createdAt);
                                    return createdAt >= thirtyDaysAgo;
                                } catch (error) {
                                    console.error('Erreur de date pour:', anounce);
                                    return false;
                                }
                            })
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Plus récent en premier
                        break;

                    case 'selection':
                        // Notre sélection basée sur le prix (par exemple, les plus abordables)
                        console.log('Sélection aléatoire de 4 annonces...');
                        filteredAnounces = filteredAnounces
                            .sort(() => Math.random() - 0.5) // Mélange aléatoire du tableau
                            .slice(0, 4); // Prendre les 4 premières annonces
                        break;
                    // Dans le switch, modifier le case 'bestSellers'
                    case 'bestSellers':
                        console.log('Tri par prix croissant...');
                        filteredAnounces = filteredAnounces
                            .filter(anounce => anounce.price) // Vérifie si le prix existe
                            .sort((a, b) => a.price - b.price) // Tri par prix croissant
                            .slice(0, 8); // Garde les 8 moins chers
                        break;

                }
                console.log(filteredAnounces);
                setAnounces(filteredAnounces);
            } catch (err) {
                console.error("Erreur lors de la récupération des annonces :", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAnounces();
    }, [filter]); // Réexécuter quand le filtre change

    // Titre dynamique selon le filtre
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
        <>
            <h1 className="text-2xl font-bold text-center mb-8">{getTitle()}</h1>
            <section className="flex flex-wrap gap-6 justify-center">
                {anounces.map((anounce) => (
                    <article
                        key={anounce.id}
                        className="bg-[#ffe47b] rounded-md flex flex-col justify-between p-5 gap-3 w-[22%]" // 22% pour 4 annonces par ligne avec un gap
                    >
                        {/* Image */}
                        <div className="flex justify-center">
                            <img
                                src="../asset/image/placeholderbook.png"
                                alt={anounce.bookDetails.title}
                                className="h-48 w-auto rounded-md"
                            />
                        </div>

                        {/* Contenu fixe */}
                        <div className="flex flex-col h-40 justify-between">
                            <h3 className="text-sm font-extralight text-[#333333]">
                                {anounce.bookDetails.author.name}
                            </h3>
                            <h2 className="text-lg font-extrabold text-[#333333] truncate">
                                {anounce.bookDetails.title}
                            </h2>
                            <p className="text-md font-bold text-[#9ba2ff]">
                                {anounce.price} €
                            </p>
                            <p className="text-sm text-[#333333] line-clamp-2">
                                {anounce.description}
                            </p>
                        </div>

                        {/* Bouton */}
                        <div className="flex justify-center gap-2">
                            <Link
                                href={`/anounces/${anounce.id}`}
                                className="text-[#f9f6f1] bg-[#333333] p-2 rounded-md text-center w-full"
                            >
                                Voir l'annonce
                            </Link>
                            <button
                                onClick={() =>
                                    addToCart({
                                        id: anounce.id,
                                        name: anounce.bookDetails.title,
                                        price: anounce.price,
                                    })
                                }
                                className="text-[#f9f6f1] bg-[#9ba2ff] p-2 rounded-md text-center w-full"
                            >
                                Ajouter au panier
                            </button>
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
};

export default AnouncesList;