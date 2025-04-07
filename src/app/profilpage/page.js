"use client";
import { useAuth } from "@/src/context/auth-context";
import AuthService from "@/src/services/auth-service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profil() {
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  const router = useRouter();
  const [openOrderId, setOpenOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [formData, setFormData] = useState({
    pseudo: user?.pseudo || "",
    email: user?.email || "",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    password: "", // Ajout du champ password
  });

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

  const handleOrderClick = (orderId) => {
    setIsLoading(true);
    setOpenOrderId(orderId);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleReturnClick = () => {
    setIsLoading(true);
    setOpenOrderId(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setOpenOrderId(null);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        pseudo: user.pseudo || "",
        email: user.email || "",
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        password: "", // Le mot de passe reste vide par sécurité
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedUser = await AuthService.updateProfile(formData);
      // Mettre à jour l'état global avec les nouvelles données
      updateUser(updatedUser);
      // Mettre à jour le formulaire avec les nouvelles données
      setFormData({
        pseudo: updatedUser.pseudo,
        firstname: updatedUser.firstname,
        email: updatedUser.email,
        password: updatedUser.password,
        lastname: updatedUser.lastname,
      });
      alert("Profil mis à jour avec succès!");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert(error.message || "Erreur lors de la mise à jour du profil");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const renderDashboard = () => (
    <>
      <div className="flex justify-center invisible mb-8 lg:visible">
        <h1>
          Bonjour{" "}
          <span className="text-[#9ba2ff] font-bold">{user.pseudo}</span>,
          prêt a lire aujourd'hui?
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        {user.orders && user.orders.length > 0 ? (
          isLoading ? (
            <div className="flex items-center justify-center w-full p-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9ba2ff]"></div>
            </div>
          ) : openOrderId ? (
            user.orders
              .filter((order) => order["@id"] === openOrderId)
              .map((order, index) => {
                const anounce = order.seller.anounces.find(
                  (anounce) => anounce.book["@id"] === order.book["@id"]
                );

                return (
                  <div
                    key={order["@id"]}
                    className="bg-white p-4 rounded-lg w-full max-w-2xl transition-all duration-300"
                  >
                    <h3
                      className="font-bold mb-2 cursor-pointer hover:text-[#9ba2ff] transition-colors flex items-center"
                      onClick={handleReturnClick}
                    >
                      <span>Retour aux commandes</span>
                    </h3>
                    <div className="mt-4 space-y-4">
                      <h2 className="text-xl font-bold text-[#9ba2ff]">
                        Commande #{anounce.id}
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-gray-600">
                          <span className="font-semibold">Vendeur:</span>{" "}
                          {order.seller.pseudo}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Livre:</span>{" "}
                          {order.book.title}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Prix:</span>{" "}
                          {anounce ? anounce.price : "N/A"}€
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Statut:</span>{" "}
                          {order.orderState.state}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Date:</span>{" "}
                          {new Date(order.purchaseAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            user.orders.map((order, index) => {
              const anounce = order.seller.anounces.find(
                (anounce) => anounce.book["@id"] === order.book["@id"]
              );

              return (
                <div
                  key={order["@id"]}
                  className="bg-white p-4 rounded-lg w-80 cursor-pointer transition-all duration-300"
                  onClick={() => handleOrderClick(order["@id"])}
                >
                  <h2 className="font-bold mb-2 text-[#9ba2ff] transition-colors">
                    Commande #{anounce.id}
                  </h2>
                  <div className="text-sm text-gray-600">
                    <p>Livre : {order.book.title}</p>
                    <p>Prix : {anounce ? `${anounce.price}€` : "N/A"}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Cliquez pour voir les détails
                  </p>
                </div>
              );
            })
          )
        ) : (
          <p className="text-center text-gray-600">
            Vous n'avez pas encore de commandes
          </p>
        )}
      </div>
    </>
  );

  const renderProfileEdit = () => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-[#9ba2ff] mb-6">
        Modifier mon profil
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pseudo
            </label>
            <input
              type="text"
              name="pseudo"
              value={formData.pseudo}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9ba2ff] focus:border-[#9ba2ff]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9ba2ff] focus:border-[#9ba2ff]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prénom
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9ba2ff] focus:border-[#9ba2ff]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9ba2ff] focus:border-[#9ba2ff]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9ba2ff] focus:border-[#9ba2ff]"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9ba2ff] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9ba2ff] disabled:opacity-50"
          >
            {isLoading ? "Mise à jour..." : "Mettre à jour"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
<main className="text-secondary-gray bg-[#ffe47b] text-[#333333]">
  <section className="flex flex-col sm:flex-row p-6 sm:p-10 justify-center items-center gap-6 sm:gap-10">
    <section className="flex flex-col gap-6 sm:gap-8 w-full sm:w-1/3 md:w-1/4 lg:w-1/6 justify-center items-center">
      <div className="flex flex-col gap-2 sm:gap-4 items-center justify-start">
        <Image
          src="./asset/photos/chill_guy1731936768520.png"
          alt="user image"
          className="w-1/3 sm:w-1/2 md:w-1/3"
        />
        <h2 className="font-bold text-md sm:text-xl">{user.pseudo}</h2>
        <p className="font-normal text-sm sm:text-base md:text-lg">{user.email}</p>
      </div>

      <div className="flex flex-col gap-2 sm:gap-4 items-center justify-start w-full">
        <button
          onClick={() => handleSectionChange("dashboard")}
          className={`text-sm sm:text-base md:text-lg ${
            activeSection === "dashboard"
              ? "font-bold text-[#9ba2ff]"
              : "font-normal text-gray-600 hover:text-[#9ba2ff]"
          } transition-colors w-full text-center py-3`}
        >
          Tableau de bord
        </button>
        <button
          onClick={() => handleSectionChange("editProfile")}
          className={`text-sm sm:text-base md:text-lg ${
            activeSection === "editProfile"
              ? "font-bold text-[#9ba2ff]"
              : "font-normal text-gray-600 hover:text-[#9ba2ff]"
          } transition-colors w-full text-center py-3`}
        >
          Modifier mon profil
        </button>
      </div>

      <div className="flex flex-col gap-2 sm:gap-4 items-center justify-start">
        <button
          onClick={handleLogout}
          className="text-red-600 text-sm sm:text-base md:text-lg font-semibold w-full text-center py-3"
        >
          Déconnexion
        </button>
      </div>
    </section>

    <section className="w-full sm:w-2/3 md:w-3/6 py-8 sm:py-10">
      {activeSection === "dashboard" ? renderDashboard() : renderProfileEdit()}
    </section>
  </section>
</main>


  );
}
