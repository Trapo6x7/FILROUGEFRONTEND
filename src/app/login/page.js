"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/auth-context";
import { useForm } from "react-hook-form"; // Remove Form from this import
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form,  // Import Form from shadcn/ui instead
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/src/components/ui/form";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      console.log("Login result:", result); // Add this for debugging
      if (result?.success) {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);


  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-[#333333] bg-[#ffe47b] p-10">
      <div className="flex flex-col items-center justify-center w-full max-w-md bg-[#f9f6f1] p-8 rounded-md shadow-md gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#333333]">Connexion</h1>
          <p className="text-sm text-[#333333]">
            Entrez vos identifiants pour vous connecter à votre compte
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333333]">Adresse email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="exemple@email.com"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                      {...field}
                      className="w-full border border-[#333333] rounded-md p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333333]">Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      {...field}
                      className="w-full border border-[#333333] rounded-md p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium text-[#333333]"
                    >
                      Se souvenir de moi
                    </label>
                  </div>
                )}
              />

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#9ba2ff] hover:underline"
              >
                Mot de passe oublié?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#333333] text-[#f9f6f1] hover:bg-[#444444] p-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm text-[#333333]">
            Pas encore de compte?{" "}
            <Link
              href="/register"
              className="font-medium text-[#9ba2ff] hover:underline"
            >
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}