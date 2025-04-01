

const API_URL = 'http://127.0.0.1:8000/api/anounces';  // Remplace par l'URL de ton API Symfony

export const getAnounces = async () => {
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

export const getBookDetails = async (bookUri) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000${bookUri}`); // Complétez l'URI
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des détails du livre');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error; // Propager l'erreur
    }
};

export const getAuthorDetails = async (authorUri) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000${authorUri}`);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des détails de l'auteur : ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error; // Propager l'erreur
    }
};