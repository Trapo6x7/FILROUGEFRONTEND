"use client";
import { useEffect, useState } from "react";
import { getAnounces } from "@/src/services/anounceService";
import Link from "next/link";
import AnouncesList from "../components/anounces/anounceList";

export default function Home() {
  const [anounces, setAnounces] = useState([]); // État pour stocker les annonces
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

 
  return (
    <main>
      <section>
        <article>caroussel</article>
      </section>

      <section className="bg-[#ffe47b] p-10 flex gap-5 justify-between flex-wrap">
       <AnouncesList/>
      </section>
      <section className="bg-[#f9f6f1] flex justify-around">
        <article className="text-[#9ba2ff] w-1/3 flex flex-col items-center justify-center p-10 gap-2">
          <img src="./asset/iconsearch.png" alt="" className="w-20" />
          <h2 className="font-bold text-md">
            Facilité d'accès et de recherche
          </h2>
          <p className="font-light text-sm text-center">
            Les applications spécialisées permettent de rechercher rapidement
            des livres en fonction de critères précis.
          </p>
        </article>
        <article className="text-[#9ba2ff] w-1/3 flex flex-col items-center justify-center p-5 gap-2">
          <img src="./asset/iconcomuno.png" alt="" className="w-20" />
          <h2 className="font-bold text-md">
            Transaction simplifiée et sécurisée
          </h2>
          <p className="font-light text-sm text-center">
            Vous avez accès à une vaste communauté d'acheteurs et de vendeurs,
            ce qui augmente les chances de trouver des livres rares ou
            spécifiques.
          </p>
        </article>
        <article className="text-[#9ba2ff] w-1/3 flex flex-col items-center justify-center p-5 gap-2">
          <img src="./asset/iconhalass.png" alt="" className="w-20" />
          <h2 className="font-bold text-md">Large communauté et choix varié</h2>
          <p className="font-light text-sm text-center">
            Les plateformes offrent des systèmes de paiement sécurisés et des
            fonctionnalités de messagerie intégrées.
          </p>
        </article>
      </section>

      <section className="bg-[#ffe47b] p-10 flex gap-5 justify-between">
        <article className="bg-[#f9f6f1] rounded-md flex flex-col justify-between p-5 w-1/3 gap-3 h-auto">
          <div className="flex justify-center">
            <img src="/" alt="" id="cover" classNameName="h-auto rounded-md" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-md font-bold">Name</h3>
            <p className="text-sm">Body</p>
          </div>

          <div className="flex justify-end items-end text-sm">
            <a
              href=""
              alt=""
              className="text-[#f9f6f1] bg-[#333333] p-2 w-1/2 text-center rounded-md"
            >
              Lire l'article
            </a>
          </div>
        </article>
      </section>

      <section className="bg-[#9ba2ff] relative flex flex-col ">
        <article className="py-16 px-28 gap-3">
          <p className="text-8xl font-bold text-[#f9f6f1] text-end justify-end items-end">
            Offrez une nouvelle vie à vos livres
          </p>
          <p className="text-3xl text-end text-[#f9f6f1]">
            Estimez vos livres avec notre application.
          </p>
          <div className="flex justify-end mt-8 gap-8  py-16">
            <img
              src="./asset/logoapp/logogooglestore.png"
              alt="googleplay"
              className="w-1/8 h-auto"
            />
            <img
              src="./asset/logoapp/logoapplestore.png"
              alt="appstore"
              className="w-1/8 h-auto"
            />
          </div>
        </article>
        <img
          src="./asset/photos/mockupappli.png"
          alt="screenshot"
          className="placement absolute h-[75%] mt-16"
        />
      </section>

      <section>
        <article className="bg-[#f9f6f1] text-[#333333] p-10 flex flex-col gap-3 text-sm">
          <h2 className="font-bold">
            Pourquoi acheter des livres d'occasion ?
          </h2>

          <p>
            Faire le choix de l'occasion permet d'acheter des livres pas chers.
            Leur prix est bien plus bas que les livres neufs et ils sont le plus
            souvent en très bon état. L'état des livres que nous vendons est
            scrupuleusement vérifié et répond à une charte de qualité précise.
            Les livres d'occasion ont un très bon impact sur l'environnement.
            Saviez-vous que plus de 142 millions de livres sont pilonnés chaque
            année en France ? Pourtant, la plupart sont encore en état d'être
            lus. Pour mettre fin à cette aberration, faisons de l'occasion une
            norme !
          </p>

          <h2 className="font-bold">
            Pourquoi acheter des livres sur BookMarket ?
          </h2>

          <p>
            En achetant sur la boutique en ligne de BookMarket, vous faites le
            choix d'une boutique 100% française qui participe à l'économie
            circulaire. En effet, tous les livres auxquels nous offrons une
            seconde vie ont été collectés en France. En achetant des livres
            d'occasion sur notre site, vous bénéficiez de la livraison
            gratuite et les commandes sont traitées et expédiées en 24h. Pour
            permettre à chacun d'acheter des livres pas chers, nous faisons
            notre maximum pour proposer les meilleurs prix.
          </p>

          <h2 className="font-bold">Qui sommes-nous ?</h2>

          <p>
            BookMarket est la plateforme pour vendre et acheter des livres
            d'occasion. Nous permettons à chacun d'offrir une seconde vie à ses
            livres. Notre mission est de revaloriser les livres d’occasion en
            proposant à chacun un service simple et transparent. Nous voulons
            proposer une alternative crédible à l'achat de biens neufs avec une
            vision claire et ambitieuse : faire de l'occasion une norme.
          </p>

          <h2 className="font-bold">Comment vendre ses livres ?</h2>

          <p>
            La Bourse aux Livres n'est pas simplement une boutique en ligne,
            nous sommes avant tout un dépôt-vente. Nous vous proposons de nous
            confier vos livres et nous les vendons à votre place. Il s'agit de
            la meilleure solution pour vendre ses livres simplement et au
            meilleur prix. En téléchargeant notre application pour smartphone,
            vous pouvez obtenir une estimation immédiate de combien vous
            rapporteront vos livres. Il vous suffit ensuite de nous les
            envoyer et nous nous occupons de tout de A à Z. Vous n'avez plus
            qu'à attendre vos gains !
          </p>
        </article>
      </section>
    </main>
  );
}
