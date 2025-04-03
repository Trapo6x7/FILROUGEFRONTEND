"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/context/auth-context";
import Link from "next/link";


export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Explorer", href: "/anounces" },
    { name: "Catégories", href: "/categories" },
  ];

  // Générer les initiales de l'utilisateur pour l'avatar
  const getUserInitials = () => {
    if (!user) return "UT";

    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }

    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }

    return "UT";
  };

  return (
    <header>
      <nav className="bg-[#ffe47b] flex justify-between items-center p-4 w-full">

        <div className="flex w-3/12 justify-start">
          <a href="/" alt="">
            <img src="../asset/logobookmarket.png" alt="logobookmarket" className="w-12" />
          </a>
        </div>

        <form action="" method="get" className="flex w-6/12 justify-center">
          <div>
            <input id="example" type="search" name="search" placeholder="Rechercher..." className=" bg-[#333333] text-[#f9f6f1] rounded-md w-96 px-6" />
          </div>
        </form>

        <div className="flex w-3/12 gap-1 right-0 justify-end">
          {isAuthenticated ? (
            <>
              <Link href="/profilpage">
                <img src="../asset/iconuser.png" alt="user" className="w-12" />
              </Link>
              <Link href="#">
                <img src="../asset/iconshop.png" alt="shop" className="w-12" />
              </Link>
            </>
          ) : (
            <Link href="/login">
              <img src="../asset/iconuser.png" alt="user" className="w-12" />
            </Link>
          )}
          <Link href="#">
            <img src="../asset/iconcontact.png" alt="contact" className="w-12" />
          </Link>

        </div>
      </nav>
      <nav className="px-16 py-2 flex justify-around bg-[#333333]">
        <Link href="/anounces" className="text-[#f9f6f1] hover:text-primary-purple">
          Tous les produits
        </Link>
        <Link
          href="/anounces?filter=recent"
          className="text-[#f9f6f1] hover:text-primary-purple"
        >
          Nouveautés
        </Link>
        <Link
          href="/anounces?filter=selection"
          className="text-[#f9f6f1] hover:text-primary-purple"
        >
          Notre selection
        </Link>
        <Link
          href="/anounces?filter=bestSellers"
          className="text-[#f9f6f1] hover:text-primary-purple"
        >
          Bon plans
        </Link>
        <Link href="/help" className="text-[#f9f6f1] hover:text-primary-purple">
          Aide
        </Link>
        <a href="" alt="" className="text-[#f9f6f1] hover:text-primary-purple">Aide</a>

      </nav>
    </header>
  );
}
