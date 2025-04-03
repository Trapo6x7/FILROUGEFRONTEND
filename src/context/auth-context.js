"use client";

import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "@/src/services/auth-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = await AuthService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        AuthService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    initAuth();
  }, []);
  
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await AuthService.login(email, password);
      setUser(response.user || { email });
      toast.success("Connexion réussie");
      return { success: true };
    } catch (error) {
      toast.error("Échec de la connexion");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      await AuthService.register(userData);
      toast.success("Inscription réussie", {
        description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter."
      });
      return { success: true };
    } catch (error) {
      console.error("Erreur d'inscription", error);
      toast.error("Échec de l'inscription", {
        description: error.message || "Une erreur est survenue lors de l'inscription"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    router.push("/login");
    toast.success("Déconnexion réussie");
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};