// services/bookService.js
import api from '../utils/api'; // Assure-toi que le chemin vers ton utilitaire est correct

export const getBooks = async () => {
    try {
        const response = await api.get('/api/books');  // Ici, 'api/books' est l'endpoint relatif
        return response.data;  // Axios gère déjà la conversion en JSON
    } catch (error) {
        console.error('Erreur:', error);
        throw error;  // Propager l'erreur
    }
};