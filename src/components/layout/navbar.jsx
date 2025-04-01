"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { ModeToggle } from "@/src/components/theme/mode-toggle";
import { useAuth } from "@/src/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

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
                    <img src="../asset/logobookmarket.png" alt="logobookmarket" className="w-12"/>
                </a>
            </div>

            <form action="" method="get" className="flex w-6/12 justify-center">
                <div>
                    <input id="example" type="search" name="search" placeholder="Rechercher..." className=" bg-[#333333] text-[#f9f6f1] rounded-md w-96 px-6" />
                </div>
            </form>

            <div className="flex w-3/12 gap-1 right-0 justify-end">
                <a href="/login" alt="">
                    <img src="../asset/iconuser.png" alt="user" className="w-12"/>
                </a>
                <a href="" alt="">
                    <img src="../asset/iconcontact.png" alt="contact" className="w-12"/>
                </a>
                <a href="" alt="">
                    <img src="../asset/iconshop.png" alt="shop" className="w-12"/>
                </a>
            </div>
        </nav>
        <nav className="p-2 flex justify-around bg-[#333333]">

            <a href="/anounces" alt="" className="text-[#f9f6f1] hover:text-primary-purple">Tous les produits</a>
            <a href="" alt="" className="text-[#f9f6f1] hover:text-primary-purple">Idées lecture</a>
            <a href="" alt="" className="text-[#f9f6f1] hover:text-primary-purple">Notre selection</a>
            <a href="" alt="" className="text-[#f9f6f1] hover:text-primary-purple">Promos</a>
            <a href="" alt="" className="text-[#f9f6f1] hover:text-primary-purple">Meilleures ventes</a>
            <a href="" alt="" className="text-[#f9f6f1] hover:text-primary-purple">Coup de coeur</a>
            <a href="" alt="" className="text-[#f9f6f1] hover:text-primary-purple">Aide</a>

        </nav>
    </header>
  );
}
