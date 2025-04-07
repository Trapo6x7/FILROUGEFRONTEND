"use client";
import { useEffect, useState } from "react";
import { getAnounces } from "@/src/services/anounceService";
import Link from "next/link";
import AnouncesList from "../components/anounces/anounceList";

export default function Home() {
  const [anounces, setAnounces] = useState([]); // État pour stocker les annonces
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [isDesktop, setIsDesktop] = useState(false);
  
    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 1500px)");
  
      const handleResize = () => {
        setIsDesktop(mediaQuery.matches);
      };
  
      handleResize(); // Appel initial
  
      mediaQuery.addEventListener("change", handleResize);
  
      return () => {
        mediaQuery.removeEventListener("change", handleResize);
      };
    }, []);
    
  return (
    <main>
      <section className="bg-[#ffe47b] p-6 md:p-10 flex flex-col items-center sm:justify-center md:flex-row gap-5 justify-between flex-wrap">
        <AnouncesList />
      </section>
      <section className="bg-[#f9f6f1] p-6 md:p-10 flex flex-col md:flex-row justify-around gap-6">
        <article className="text-[#9ba2ff] w-full md:w-1/3 flex flex-col items-center justify-center p-5 gap-2">
          <img src="./asset/iconsearch.png" alt="" className="w-16 md:w-20" />
          <h2 className="font-bold text-sm md:text-md text-center">
            Facilité d&apos;accès et de recherche
          </h2>
          <p className="font-light text-xs md:text-sm text-center">
            Les applications spécialisées permettent de rechercher rapidement
            des livres en fonction de critères précis.
          </p>
        </article>
        <article className="text-[#9ba2ff] w-full md:w-1/3 flex flex-col items-center justify-center p-5 gap-2">
          <img src="./asset/iconcomuno.png" alt="" className="w-16 md:w-20" />
          <h2 className="font-bold text-sm md:text-md text-center">
            Transaction simplifiée et sécurisée
          </h2>
          <p className="font-light text-xs md:text-sm text-center">
            Vous avez accès à une vaste communauté d&apos;acheteurs et de vendeurs,
            ce qui augmente les chances de trouver des livres rares ou
            spécifiques.
          </p>
        </article>
        <article className="text-[#9ba2ff] w-full md:w-1/3 flex flex-col items-center justify-center p-5 gap-2">
          <img src="./asset/iconhalass.png" alt="" className="w-16 md:w-20" />
          <h2 className="font-bold text-sm md:text-md text-center">
            Large communauté et choix varié
          </h2>
          <p className="font-light text-xs md:text-sm text-center">
            Les plateformes offrent des systèmes de paiement sécurisés et des
            fonctionnalités de messagerie intégrées.
          </p>
        </article>
      </section>
      
      <section className="bg-[#9ba2ff] relative flex flex-col p-6 md:p-10">
      <article className="py-10 md:py-16 px-6 md:px-28 gap-3 text-center md:text-end">
        <p className="text-4xl md:text-8xl font-bold text-[#f9f6f1]">
          Offrez une nouvelle vie à vos livres
        </p>
        <p className="text-lg md:text-3xl text-[#f9f6f1]">
          Estimez vos livres avec notre application.
        </p>

        <div className="flex justify-center md:justify-end mt-8 gap-4 md:gap-8 py-10 md:py-16">
          <img
            src="public/asset/logoapp/logogooglestore.png"
            alt="googleplay"
            className="w-1/3 md:w-1/6 h-auto"
          />
          <img
            src="public/asset/logoapp/logoapplestore.png"
            alt="appstore"
            className="w-1/3 md:w-1/6 h-auto"
          />
        </div>
      </article>

      {isDesktop && (
        <Image
          src="./asset/photos/mockupappli.png"
          alt="screenshot"
          className="absolute placement h-[80%]"
        />
      )}
    </section>

      <section>
        <article className="bg-[#f9f6f1] text-[#333333] p-6 md:p-10 flex flex-col gap-3 text-sm md:text-base">
          <h2 className="font-bold text-lg md:text-xl">
            Pourquoi acheter des livres d&apos;occasion ?
          </h2>

          <p>
            Faire le choix de l&apos;occasion permet d&apos;acheter des livres pas chers.
            Leur prix est bien plus bas que les livres neufs et ils sont le plus
            souvent en très bon état. L&apos;état des livres que nous vendons est
            scrupuleusement vérifié et répond à une charte de qualité précise.
            Les livres d&apos;occasion ont un très bon impact sur l&apos;environnement.
            Saviez-vous que plus de 142 millions de livres sont pilonnés chaque
            année en France ? Pourtant, la plupart sont encore en état d&apos;être
            lus. Pour mettre fin à cette aberration, faisons de l&apos;occasion une
            norme !
          </p>

          <h2 className="font-bold text-lg md:text-xl">
            Pourquoi acheter des livres sur BookMarket ?
          </h2>

          <p>
            En achetant sur la boutique en ligne de BookMarket, vous faites le
            choix d&apos;une boutique 100% française qui participe à l&apos;économie
            circulaire. En effet, tous les livres auxquels nous offrons une
            seconde vie ont été collectés en France. En achetant des livres
            d&apos;occasion sur notre site, vous bénéficiez de la livraison
            gratuite et les commandes sont traitées et expédiées en 24h. Pour
            permettre à chacun d&apos;acheter des livres pas chers, nous faisons
            notre maximum pour proposer les meilleurs prix.
          </p>

          <h2 className="font-bold text-lg md:text-xl">Qui sommes-nous ?</h2>

          <p>
            BookMarket est la plateforme pour vendre et acheter des livres
            d&apos;occasion. Nous permettons à chacun d&apos;offrir une seconde vie à ses
            livres. Notre mission est de revaloriser les livres d’occasion en
            proposant à chacun un service simple et transparent. Nous voulons
            proposer une alternative crédible à l&apos;achat de biens neufs avec une
            vision claire et ambitieuse : faire de l&apos;occasion une norme.
          </p>

          <h2 className="font-bold text-lg md:text-xl">
            Comment vendre ses livres ?
          </h2>

          <p>
            La Bourse aux Livres n&apos;est pas simplement une boutique en ligne,
            nous sommes avant tout un dépôt-vente. Nous vous proposons de nous
            confier vos livres et nous les vendons à votre place. Il s&apos;agit de
            la meilleure solution pour vendre ses livres simplement et au
            meilleur prix. En téléchargeant notre application pour smartphone,
            vous pouvez obtenir une estimation immédiate de combien vous
            rapporteront vos livres. Il vous suffit ensuite de nous les
            envoyer et nous nous occupons de tout de A à Z. Vous n&apos;avez plus
            qu&apos;à attendre vos gains !
          </p>
        </article>
      </section>
    </main>
  );
}
