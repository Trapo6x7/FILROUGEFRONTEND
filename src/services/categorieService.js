

const API_URL = 'http://127.0.0.1:8000/api/categories';  // Remplace par l'URL de ton API Symfony

export const getCategories = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des livres');
        }
        const data = await response.json();
 
        
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;  // Propager l'erreur
    }
};
