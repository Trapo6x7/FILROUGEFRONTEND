"use client";
import { useAuth } from "@/src/context/auth-context";
import AuthService from "@/src/services/auth-service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profil() {
    const { user, logout, isAuthenticated } = useAuth();
    const router = useRouter();

    // Vérifier l'authentification
    useEffect(() => {
        if (!isAuthenticated) {
          router.push("/");
        }
      }, [isAuthenticated, router]);
    
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    // Ne pas afficher le contenu si non authentifié
    if (!isAuthenticated) return null;
  
  return (
    <main className="text-secondary-gray">
      <section className="flex p-10 justify-between items-center divide-x">
        <section className="flex flex-col gap-8 w-1/6">
          <div className="flex flex-col gap-1 items-center justify-start">
            <img
              src="./asset/photos/chill_guy1731936768520.png"
              alt=""
              className="w-1/3"
            />
            <h2 className="font-bold text-md">pseudo</h2>
            <p className="font-normal text-sm">mail</p>
          </div>

          <div className="flex flex-col gap-1 items-center justify-start">
            <a href="">
              <p className="font-normal text-sm">Tableau de bord</p>
            </a>
            <a href="">
              <p className="font-normal text-sm">Mes articles</p>
            </a>
            <a href="">
              <p className="font-normal text-sm">Toutes les commandes</p>
            </a>
          </div>

          <div className="flex flex-col gap-1 items-center justify-start">
            <a href="./editprofil.php">
              <p className="font-bold text-sm">Modifier le profil</p>
            </a>
            <a
              href=""
              className="text-red-600 font-bold text-sm"
              onClick={handleLogout}
            >
              Deconnexion
            </a>
          </div>
        </section>

        <section className="flex flex-col gap-8 w-5/6 p-5">
          <div className="flex justify-center">
            <h1 className="text-lg">
              Bonjour <span className="font-bold" />
              psuedo, prêt a lire aujourd'hui?
            </h1>
          </div>
          <div className="flex">
            <article className="bg-off-white rounded-md flex flex-col p-5 w-1/4 gap-3">
              <div className="flex justify-end">
                <img
                  src="../asset/coeuricon.png"
                  alt=""
                  id="like"
                  className="w-4"
                />
              </div>

              <div className="flex justify-center">
                <img
                  src="<?= $imageUrl ?>"
                  alt=""
                  id="cover"
                  className="h-72 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <h3 id="auteur" className="text-sm font-extralight">
                  Author
                </h3>
                <h2
                  id="titre"
                  className="text-lg font-extrabold text-secondary-gray"
                >
                  title
                </h2>
                <p id="price" className="text-md font-bold text-primary-purple">
                  €
                </p>
              </div>

              <div className="flex justify-center text-sm">
                <a
                  href=""
                  alt=""
                  className="text-off-white bg-secondary-gray p-2 rounded-md"
                >
                  Ajouter au panier
                </a>
              </div>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
