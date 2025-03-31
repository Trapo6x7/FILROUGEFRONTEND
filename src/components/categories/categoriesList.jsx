// components/BooksList.js
"use client"

import { useState, useEffect } from 'react';
import { getCategories } from '../../services/categorieService';  // Importe le service

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories= async () => {
            try {
                const data = await getCategories(); // Appel à l'API
                console.log("Données reçues de l'API :", data); // Vérifiez la structure
                setCategories(data.member); // Utilisez `data.member` pour obtenir le tableau des livres
            } catch (err) {
                setError(err.message); // Gérer les erreurs
            } finally {
                setLoading(false); // Indiquer que le chargement est terminé
            }
        };
    
        fetchCategories();
    }, []);

    // Affichage des états
    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div>
            <h2>Liste des livres</h2>
            <ul>
                {Array.isArray(categories) ? (
                    categories.map((categorie) => (
                        <li key={categorie.id}>
                            <h3>{categorie.name}</h3>
                            <p>ID : {categorie.id}</p>
                        </li>
                    ))
                ) : (
                    <p>Aucun livre disponible</p>
                )}
            </ul>
        </div>
    );
};

export default CategoriesList;
