"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AuthProvider } from "@/src/providers/auth-providers";
import { Toaster } from "sonner";
import { usePathname, useRouter } from "next/navigation";

function AuthRedirect({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isAuthPage) {
      router.push('/');
    }
  }, [pathname, router, isAuthPage]);

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