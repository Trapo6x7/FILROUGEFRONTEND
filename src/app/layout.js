import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import { CartProvider } from '@/src/context/CartContext';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "BookMarket - Votre bibliothèque en ligne",
  description: "Parcourez, achetez et gérez vos livres préférés",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <CartProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
