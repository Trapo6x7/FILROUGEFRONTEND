// services/categoryService.js
import api from '../utils/api';  // Assure-toi que le chemin vers ton utilitaire est correct

export const getCategories = async () => {
    try {
        const response = await api.get('/api/categories');  // Utilise l'endpoint relatif
        return response.data;  // Axios gère automatiquement la conversion en JSON
    } catch (error) {
        console.error('Erreur:', error);
        throw error;  // Propager l'erreur
    }
};
