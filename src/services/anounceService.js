// services/anounceService.js
import api from '../utils/api';  // Assure-toi que le chemin vers ton utilitaire est correct

const BASE_URL = '/api';  // L'URL de base est déjà définie dans ton utilitaire API

export const getAnounces = async (filter = '') => {
    try {
      let url = `${BASE_URL}/anounces`;

      // Ajouter les paramètres de filtre si nécessaire
      if (filter) {
        url += `?filter=${filter}`;
      }
  
      const response = await api.get(url);  // Utilisation de l'instance api pour la requête GET
      return response.data;  // Axios gère automatiquement la conversion en JSON
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
};

export const getBookDetails = async (bookUri) => {
    try {
        // Vérifier si bookUri est un objet avec la propriété @id
        const uri = typeof bookUri === 'object' ? bookUri['@id'] : bookUri;
        const response = await api.get(uri);  // Utilisation de l'instance api pour la requête GET
        
        return response.data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};

export const getAuthorDetails = async (authorUri) => {
    try {
        const response = await api.get(authorUri);  // Utilisation de l'instance api pour la requête GET
        return response.data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error; // Propager l'erreur
    }
};

export const getAnounceDetails = async (id) => {
    try {
        const response = await api.get(`${BASE_URL}/anounces/${id}`);  // Utilisation de l'instance api pour la requête GET
        return response.data;
    } catch (error) {
        console.error('Erreur:', error);
        throw new Error("Impossible de récupérer les détails de l'annonce");
    }
};
