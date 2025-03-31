// components/BooksList.js
"use client"

import { useState, useEffect } from 'react';
import { getBooks } from '../../services/bookService';  // Importe le service

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks(); // Appel à l'API
                console.log("Données reçues de l'API :", data); // Vérifiez la structure
                setBooks(data.member); // Utilisez `data.member` pour obtenir le tableau des livres
            } catch (err) {
                setError(err.message); // Gérer les erreurs
            } finally {
                setLoading(false); // Indiquer que le chargement est terminé
            }
        };
    
        fetchBooks();
    }, []);

    // Affichage des états
    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div>
            <h2>Liste des livres</h2>
            <ul>
                {Array.isArray(books) ? (
                    books.map((book) => (
                        <li key={book.id}>
                            <h3>{book.title}</h3>
                            <p>ID : {book.id}</p>
                        </li>
                    ))
                ) : (
                    <p>Aucun livre disponible</p>
                )}
            </ul>
        </div>
    );
};

export default BooksList;
