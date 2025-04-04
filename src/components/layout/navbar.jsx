"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/context/auth-context";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Tous les produits", href: "/anounces" },
    { name: "Mon profil", href: "/profilpage" },
    { name: "Aide", href: "/help" },
  ];

  const getUserInitials = () => {
    if (!user) return "UT";
    if (user.firstName && user.lastName) return `${user.firstName[0]}${user.lastName[0]}`;
    if (user.email) return user.email.substring(0, 2).toUpperCase();
    return "UT";
  };

  return (
    <header className="w-full">
      {/* TOP NAVBAR */}
      <nav className="bg-[#ffe47b] flex justify-between items-center p-4">
        <div className="flex items-center w-3/12">
          <a href="/">
            <img src="../asset/logobookmarket.png" alt="logobookmarket" className="w-12" />
          </a>
        </div>

        <form method="get" className="hidden md:flex w-6/12 justify-center">
          <input
            type="search"
            name="search"
            placeholder="Rechercher..."
            className="bg-[#333333] text-[#f9f6f1] rounded-md w-96 px-6 py-1"
          />
        </form>

        <div className="hidden md:flex items-center w-3/12 justify-end gap-2">
          {isAuthenticated ? (
            <>
              <Link href="/profilpage">
                <img src="../asset/iconuser.png" alt="user" className="w-10" />
              </Link>
              <Link href="/card">
                <img src="../asset/iconshop.png" alt="shop" className="w-10" />
              </Link>
            </>
          ) : (
            <Link href="/login">
              <img src="../asset/iconuser.png" alt="user" className="w-10" />
            </Link>
          )}
          <Link href="/contact">
            <img src="../asset/iconcontact.png" alt="contact" className="w-10" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* DESKTOP SECOND NAV */}
      <nav className="hidden md:flex px-16 py-2 justify-around bg-[#333333]">
        <Link href="/anounces" className="text-[#f9f6f1] hover:text-primary-purple">
          Tous les produits
        </Link>
        <Link href="/anounces?filter=recent" className="text-[#f9f6f1] hover:text-primary-purple">
          Nouveautés
        </Link>
        <Link href="/anounces?filter=selection" className="text-[#f9f6f1] hover:text-primary-purple">
          Notre sélection
        </Link>
        <Link href="/anounces?filter=bestSellers" className="text-[#f9f6f1] hover:text-primary-purple">
          Bon plans
        </Link>
        <Link href="/help" className="text-[#f9f6f1] hover:text-primary-purple">
          Aide
        </Link>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#333333] text-[#f9f6f1] px-6 py-4 space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-primary-purple"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
