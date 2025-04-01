import Link from "next/link";

export default function Footer() {
  return (
<footer className="bg-[#333333] text-[#f9f6f1] p-10  flex justify-between">

<div className="flex flex-col gap-24">
    <div className="text-lg">
        <h2>BookMarket</h2>
    </div>
    <div className="flex gap-2 text-xs">
        <a href="" alt="">
            <p>Tous les produits</p>
        </a>
        <p>/</p>
        <a href="" alt="">
            <p>Idées lecture</p>
        </a>
        <p>/</p>
        <a href="" alt="">
            <p>Notre sélection</p>
        </a>
        <p>/</p>

        <a href="" alt="">
            <p>Promo</p>
        </a>
        <p>/</p>
        <a href="" alt="">
            <p>Meilleures ventes</p>
        </a>
        <p>/</p>
        <a href="" alt="">
            <p>Coup de coeur</p>
        </a>
        <p>/</p>
        <a href="" alt="">
            <p>Aide</p>
        </a>
    </div>
</div>

<div className="flex flex-col justify-end items-end gap-5">
    <div className="text-end">
        <p className="text-xs">Contact us</p>
        <p className="text-md">+1 999 888-76-54</p>
    </div>

    <div className="text-end">
        <p className="text-xs">Email</p>
        <p className="text-md">hello@bookmarket.com</p>
    </div>
</div>


</footer>
  );
}