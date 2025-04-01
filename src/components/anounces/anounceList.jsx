"use client";

import { getAnounces, getBookDetails, getAuthorDetails } from '@/src/services/anounceService';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const AnouncesList = () => {
    const [anounces, setAnounces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnounces = async () => {
            try {
                const data = await getAnounces(); // Appel à l'API pour récupérer les annonces
                const anouncesWithDetails = await Promise.all(
                    data.member.map(async (anounce) => {
                        let bookDetails = null;
        
                        if (anounce.book && typeof anounce.book === "object" && anounce.book["@id"]) {
                            console.log("Book URI:", anounce.book["@id"]); // Log pour vérifier l'URI du livre
                            bookDetails = await getBookDetails(anounce.book["@id"]); // Récupérer les détails du livre
                        } else if (typeof anounce.book === "string") {
                            console.log("Book URI:", anounce.book); // Log pour vérifier l'URI du livre
                            bookDetails = await getBookDetails(anounce.book); // Récupérer les détails du livre
                        }
        
                        return {
                            ...anounce,
                            bookDetails
                        };
                    })
                );
        
                console.log("Anounces with details:", anouncesWithDetails);
                setAnounces(anouncesWithDetails);
            } catch (err) {
                console.error("Erreur lors de la récupération des annonces :", err);
                setError(err.message); // Gérer les erreurs
            } finally {
                setLoading(false); // Indiquer que le chargement est terminé
            }
        };
        fetchAnounces();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <section className="flex flex-wrap gap-6 justify-center">
            {anounces.map((anounce) => (
                <article
                    key={anounce.id}
                    className="bg-[#ffe47b] rounded-md flex flex-col justify-between p-5 gap-3 shadow-lg w-[22%]" // 22% pour 4 annonces par ligne avec un gap
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
                    <div className="flex justify-center">
                        <Link
                            href={`/anounces/${anounce.id}`}
                            className="text-[#f9f6f1] bg-[#333333] p-2 rounded-md text-center w-full"
                        >
                            Voir l'annonce
                        </Link>
                    </div>
                </article>
            ))}
        </section>
    );
};

export default AnouncesList;