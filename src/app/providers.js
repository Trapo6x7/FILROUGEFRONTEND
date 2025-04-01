"use client";

import { AuthProvider } from "@/src/context/auth-context";
import { ToastProvider } from "@/src/providers/toast-provider";

export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <ToastProvider />
    </AuthProvider>
  );
}