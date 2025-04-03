"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { Toaster } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/src/context/auth-context";

function AuthRedirect({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const isAuthPage = pathname === '/login' || pathname === '/register';
  
  const isProtectedPage = pathname === '/profilpage';

  useEffect(() => {
    // Si l'utilisateur est connecté et essaie d'accéder aux pages d'auth
    if (isAuthenticated && isAuthPage) {
      router.push('/');
      return;
    }

    // Si l'utilisateur n'est pas connecté et essaie d'accéder aux pages protégées
    if (!isAuthenticated && isProtectedPage) {
      router.push('/login');
      return;
    }
  }, [pathname, router, isAuthenticated, isAuthPage, isProtectedPage]);

  return children;
}

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthRedirect>
            {children}
            <Toaster />
          </AuthRedirect>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}