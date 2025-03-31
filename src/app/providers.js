<<<<<<< HEAD
export function Providers({ children }) {
    return children;
  }
  
=======
"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" closeButton />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
>>>>>>> 0055d113ea476b087d87370fb057d73311c45c0e
