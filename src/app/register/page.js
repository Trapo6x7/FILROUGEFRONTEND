"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/src/context/auth-context";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";

// Schéma de validation
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

  export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
  
    const form = useForm({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      },
    });
  
    const onSubmit = async (data) => {
      setIsLoading(true);
      try {
        const userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        };
  
        const result = await register(userData);
        if (result.success) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#ffe47b] p-10">
        <div className="flex flex-col items-center justify-center w-full max-w-lg bg-[#f9f6f1] p-8 rounded-md shadow-md gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#333333]">Créer un compte</h1>
            <p className="text-sm text-[#333333]">
              Rejoignez BookMarket et commencez à explorer notre bibliothèque
            </p>
          </div>
  
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#333333]">Prénom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jean"
                          autoComplete="given-name"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#333333]">Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dupont"
                          autoComplete="family-name"
                          disabled={isLoading}
                          {...field}
                          className="w-full border border-[#333333] rounded-md p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
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
                        autoComplete="new-password"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#333333]">Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        autoComplete="new-password"
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
                name="acceptTerms"
                render={({ field }) => (
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="acceptTerms"
                      className="text-sm font-medium text-[#333333]"
                    >
                      J&apos;accepte les{" "}
                      <Link
                        href="/terms"
                        className="text-[#9ba2ff] hover:underline"
                      >
                        conditions d&apos;utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link
                        href="/privacy"
                        className="text-[#9ba2ff] hover:underline"
                      >
                        politique de confidentialité
                      </Link>
                    </label>
                  </div>
                )}
              />
              <FormMessage>
                {form.formState.errors.acceptTerms?.message}
              </FormMessage>
  
              <Button
                type="submit"
                className="w-full bg-[#333333] text-[#f9f6f1] hover:bg-[#444444] p-2 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Inscription en cours..." : "S'inscrire"}
              </Button>
            </form>
          </Form>
  
          <div className="text-center">
            <p className="text-sm text-[#333333]">
              Déjà un compte?{" "}
              <Link
                href="/login"
                className="font-medium text-[#9ba2ff] hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>
    );
  }
