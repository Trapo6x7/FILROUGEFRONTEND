import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-[#f9f6f1] px-6 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-10">

      {/* Bloc gauche */}
      <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-1/2">
        <h2 className="text-xl font-semibold">BookMarket</h2>

        <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs text-center">
          <Link href="/anounces"><p className="hover:underline">Tous les produits</p></Link>
          <span>/</span>
          <Link href="/anounces?filter=lecture"><p className="hover:underline">Idées lecture</p></Link>
          <span>/</span>
          <Link href="/anounces?filter=selection"><p className="hover:underline">Notre sélection</p></Link>
          <span>/</span>
          <Link href="/anounces?filter=promo"><p className="hover:underline">Promo</p></Link>
          <span>/</span>
          <Link href="/anounces?filter=bestSellers"><p className="hover:underline">Meilleures ventes</p></Link>
          <span>/</span>
          <Link href="/anounces?filter=favorites"><p className="hover:underline">Coup de cœur</p></Link>
          <span>/</span>
          <Link href="/help"><p className="hover:underline">Aide</p></Link>
        </div>
      </div>

      {/* Bloc droit */}
      <div className="flex flex-col text-center md:text-end gap-4 w-full md:w-1/2">
        <div>
          <p className="text-xs uppercase">Contact</p>
          <p className="text-base">+1 999 888-76-54</p>
        </div>

        <div>
          <p className="text-xs uppercase">Email</p>
          <p className="text-base">hello@bookmarket.com</p>
        </div>
      </div>
    </footer>
  );
}
