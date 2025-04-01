import axios from "axios";

// Il est préférable de ne pas hardcoder l'URL de l'API ici. Utilisez une variable d'environnement ou un fichier de configuration.
const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json", // Changé de application/ld+json
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthService = {
  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - données de l'utilisateur
   * @returns {Promise} - promesse résolue avec les données de l'utilisateur
   */
  register: async (userData) => {
    try {
      const transformedData = {
        email: userData.email,
        password: userData.password,
        firstname: userData.firstName,
        lastname: userData.lastName,
        username: userData.username, // Add this line
      };

      const response = await api.post("/register", transformedData);
      return response.data;
    } catch (error) {
      console.error("Détails de l'erreur:", error.response?.data);
      throw error.response?.data || { message: "Erreur d'inscription" };
    }
  },

  /**
   * Connexion d'un utilisateur
   * @param {string} email - adresse email
   * @param {string} password - mot de passe
   * @returns {Promise} - promesse résolue avec le token JWT
   */
  login: async (email, password) => {
    try {
      const response = await api.post("/login_check", {
        username: email,
        password,
      });
  
      if (response.data.token) {
        // Stocke le token
        localStorage.setItem("token", response.data.token);
        
        // Définit le cookie avec un domaine et un path explicites
        document.cookie = `token=${response.data.token}; path=/; max-age=86400; secure`;
        
        // Configure l'intercepteur Axios
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
  
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error.response?.data || { message: "Erreur de connexion" };
    }
  },

  /**
   * Déconnexion de l'utilisateur
   */
  logout: () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  },

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns {boolean} - vrai si l'utilisateur est connecté
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  /**
   * Récupère les informations de l'utilisateur actuel
   * @returns {Promise} - promesse résolue avec les données de l'utilisateur
   */
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await api.get("/me"); // Assurez-vous que c'est le bon endpoint
      return response.data;
    } catch (error) {
      console.error("getCurrentUser error:", error);
      throw error.response?.data || {
        message: "Erreur d'obtention des données utilisateur",
      };
    }
  },
}

export default AuthService;
